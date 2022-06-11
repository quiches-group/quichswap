import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

export const ethereum = await detectEthereumProvider();

export const defaultProvider = !ethereum ? null : new ethers.providers.Web3Provider(ethereum);

export const isEthereumInjected = !!ethereum;
