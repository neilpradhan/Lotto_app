from flask import Flask, jsonify, request
import random
from flask_cors import CORS
from get_key_using_keyid import get_key_using_keyid
import os
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import base64 

app = Flask(__name__)
CORS(app)

@app.route('/generate_key_with_keyid', methods=['POST'])
def get_data():
    inputVal = request.get_json()

    key_dict = get_key_using_keyid(inputVal['key_id'])    
    key = base64.b64decode(key_dict['key'])

    iv = base64.b64decode(inputVal['iv'])
    ecn_text = inputVal['result']

    decipher = AES.new(key, AES.MODE_CBC, iv)
    decrypted_data = unpad(decipher.decrypt(base64.b64decode(ecn_text)), AES.block_size)
    decrypted_data = decrypted_data.decode('utf-8')

    return jsonify({'data': decrypted_data}),200
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5002', debug=True)
