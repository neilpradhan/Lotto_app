import requests
import base64

# def get_key():
#     # Define the URL
#     url = "https://192.36.164.181/api/v1/keys/bob_client1/enc_keys?number=1&size=256"

#     # Define the paths to the certificates and key
#     ca_cert = "rootCA_auth.crt"
#     client_cert = "alice_client1.crt"
#     client_key = "alice_client1.key"

#     # Set the headers
#     headers = {
#         "Content-Type": "application/json"
#     }

#     # Make the request with the certificates and key
#     response = requests.get(
#         url,
#         headers=headers,
#         cert=(client_cert, client_key),
#         verify=ca_cert
#     )

#     result = response.json()
#     return result['keys'][0]


def get_key():
    return {
        'key_ID': 'dummy_key_id',
        'key': base64.b64encode(b'16_byte_test_key').decode('utf-8')
    }
