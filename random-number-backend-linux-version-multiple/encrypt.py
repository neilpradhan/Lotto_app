from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from Crypto.Random import get_random_bytes
import base64

def encrypt_data(data, key):
    # Create a new AES cipher object in CBC mode with a random initialization vector (IV)
    print(base64.b64decode(key))
    cipher = AES.new(base64.b64decode(key), AES.MODE_CBC)
 
    # Pad the data to be a multiple of 16 bytes
    padded_data = pad(data.encode(), AES.block_size)
 
    # Encrypt the padded data
    ciphertext = cipher.encrypt(padded_data)
 
    # The IV is needed for decryption, so it's usually transmitted along with the ciphertext
    iv = base64.b64encode(cipher.iv).decode('utf-8')
    print(ciphertext)
    return base64.b64encode(ciphertext).decode('utf-8'), iv
 


 
