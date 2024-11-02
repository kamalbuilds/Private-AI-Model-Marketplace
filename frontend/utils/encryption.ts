import { ethers } from 'ethers';

export async function encryptFile(file: File, symmetricKey: string): Promise<Uint8Array> {
  const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_SAPPHIRE_RPC_URL);
  
  // Generate random nonce
  const nonce = await provider.send('oasis_sapphire_random', [32, ""]);
  
  // Convert file to bytes
  const fileBuffer = await file.arrayBuffer();
  const fileBytes = new Uint8Array(fileBuffer);
  
  // Encrypt using Sapphire
  const encryptedData = await provider.send('oasis_sapphire_encrypt', [
    symmetricKey,
    ethers.utils.hexlify(nonce),
    ethers.utils.hexlify(fileBytes),
    ""
  ]);
  
  return ethers.utils.arrayify(encryptedData);
}

export async function decryptFile(
  encryptedData: Uint8Array,
  symmetricKey: string,
  nonce: string
): Promise<Uint8Array> {
  const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_SAPPHIRE_RPC_URL);
  
  const decryptedData = await provider.send('oasis_sapphire_decrypt', [
    symmetricKey,
    nonce,
    ethers.utils.hexlify(encryptedData),
    ""
  ]);
  
  return ethers.utils.arrayify(decryptedData);
}