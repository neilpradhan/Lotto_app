from flask import Flask, jsonify, request
import pandas as pd
import random
from flask_cors import CORS
from get_key import get_key
from encrypt import encrypt_data
import os

app = Flask(__name__)
CORS(app)


@app.route('/hello', methods=['GET'])
def index_hello():
    return jsonify("done")

@app.route('/generate_output_file', methods=['GET'])
def index():
    chunks = []
    chunk_size = 2
    with open("data.bin", 'rb') as data:
        binary_data = data.read()

        # Cut the binary data into chunks of 128 bytes
        #for i in range(0, len(binary_data), chunk_size):
        for i in range(0, 128000, chunk_size):
            chunk = binary_data[i:i+chunk_size]
            chunks.append(chunk)
        
        random.shuffle(chunks)
        # Convert binary chunks to hexadecimal strings
        hex_strings = [chunk.hex() for chunk in chunks]
        
        # Create a DataFrame
        df = pd.DataFrame({'Chunk': range(1, len(chunks) + 1), 'Hex Data': hex_strings})
        
        # Write DataFrame to a CSV file
        df.to_csv('output.csv', index=False)
        return jsonify("done")

@app.route('/generate_random_number', methods=['POST'])
def get_data():
    inputVal = request.get_json()
    print(inputVal)

    df = pd.read_csv('output.csv')
    if len(df.index) > 24:
        shuffled_df = df.sample(frac=1).reset_index(drop=True)
        max_value = int("ffff",16)
        randVal = []
        dropIndex = []

        for num in range(int(inputVal['numberOfSymbols'])):
            randVal.append(round((int(shuffled_df["Hex Data"][num],16)/max_value)*100)/100)
            dropIndex.append(num)

        df = df.drop(dropIndex)
        df.to_csv('output.csv', index=False)
        
        byte_data = '['+', '.join(str(f) for f in randVal)+ ']'
        
        print(byte_data)

        val = get_key()
        print(val['key_ID'])
        key_id = val['key_ID']
        key = val['key']
        
        result, iv = encrypt_data(byte_data, key)
        
        return jsonify({'result':str(result), 'key_id':key_id, 'iv':str(iv)}),200
    else:
        return jsonify('Random Number is empty'), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000', debug=True)
