import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

export const ethereum = await detectEthereumProvider();

export const defaultProvider = !ethereum ? null : new ethers.providers.Web3Provider(ethereum);

export const isEthereumInjected = !!ethereum;

export const network = {
  chainId: '0x13881',
  chainName: 'Polygon Testnet',
  nativeCurrency: { name: 'Matic', symbol: 'MATIC', decimals: 18 },
  rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
  blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
  iconUrls: [],
};

export const switchNetwork = async () => {
  await ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [network],
  });
};
