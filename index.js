import { ethers } from 'ethers';
import Uniswap from './contracts/Uniswap.json';

const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
const signer = provider.getSigner();
const uniswap = new ethers.Contract(Uniswap.address, Uniswap.abi, signer);

async function swapETHForTokens(tokenAddress, amountInETH) {
  const tx = await uniswap.swapETHForExactTokens(ethers.utils.parseEther(amountInETH.toString()), [ethers.constants.AddressZero, tokenAddress], signer.address, Date.now() + 1000 * 60 * 10, { value: ethers.utils.parseEther(amountInETH.toString()) });
  await tx.wait();
  return tx.hash;
}
