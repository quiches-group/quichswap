import { ethers } from 'ethers';

export const fromWei = ethers.utils.formatEther;
export const toWei = ethers.utils.parseEther;
