import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

export async function GET() {
  try {
    // Connect to Sapphire network
    const provider = new ethers.providers.JsonRpcProvider(process.env.SAPPHIRE_RPC_URL);
    
    // Generate random bytes for key
    const randomBytes = await provider.send('oasis_sapphire_random', [32, ""]);
    const symmetricKey = ethers.utils.hexlify(randomBytes);

    return NextResponse.json({ symmetricKey });
  } catch (error) {
    console.error('Error generating encryption key:', error);
    return NextResponse.json(
      { error: 'Failed to generate encryption key' },
      { status: 500 }
    );
  }
}