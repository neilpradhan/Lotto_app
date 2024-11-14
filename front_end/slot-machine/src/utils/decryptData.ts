import { fetchGetDecryptionKey } from "../api/fetchGetDecryptionKey";


export interface Iresponse {
  0: {
    result: string;
    key_id: string;
    iv: string;
  };
  1: {
    result: string;
    key_id: string;
    iv: string;
  };
  2: {
    result: string;
    key_id: string;
    iv: string;
  };
}

export async function decryptData(response: Iresponse) {
  
  // Generate key from key id
  const decryptedData = await Promise.all([
    fetchGetDecryptionKey(response[0]),
    fetchGetDecryptionKey(response[1]),
    fetchGetDecryptionKey(response[2]),
  ]);

  let decryptedVector: number[] = [];

  for (var i = 0; i<3; i++) {
    decryptedVector.push(JSON.parse(decryptedData[i]['data']))
  }

  return decryptedVector;
}
