import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

export const ethereum = await detectEthereumProvider();

export const defaultProvider = !ethereum ? null : new ethers.providers.Web3Provider(ethereum);

export const isEthereumInjected = !!ethereum;

export const networks = {
  mumbai: {
    chainId: '0x13881',
    chainName: 'Polygon Testnet',
    nativeCurrency: { name: 'Matic', symbol: 'MATIC', decimals: 18 },
    rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    iconUrls: [],
  },
  ropsten: {
    chainId: '0x3',
    chainName: 'Ropsten',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://ropsten.infura.io/v3/7d114e1f288c42fbb534dd746703c4b7'],
    blockExplorerUrls: ['https://ropsten.etherscan.io'],
    iconUrls: [],
  },
};

export const network = networks.ropsten;

export const switchNetwork = async () => {
  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: network.chainId }],
    });
  } catch {
    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [network],
    });
  }
};
