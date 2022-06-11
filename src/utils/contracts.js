/* eslint-disable camelcase */
import { ethers } from 'ethers';

import lpTokenMetadata from '../assets/abis/LPToken.json';
import quichesTokenMetadata from '../assets/abis/QuichesToken.json';
import sampleTokenMetadata from '../assets/abis/SampleToken.json';
import stackingMetadata from '../assets/abis/QuichswapStacking.json';
import liquidityProvidingMetadata from '../assets/abis/QuichswapLiquidityProviding.json';

const addresses = {
  SampleTokenContract: '0x38eADf442a0075650E7AaAD3531BfD07D0347F6d',
  QCHTokenContract: '0x60b5cD6bD0314E0b1Ac7b40a68A1690f30b8e561',
  STQCH_LPTokenContract: '0x300Fb6642D7073E90375A39139eB4a5B9B01A751',
  ST_StackingContract: '0x55b16CCD19A5E8117F24b7572076d6F090363a88',
  STQCH_LiquidityProvidingContract: '0xE200011Db09e2C917d2Cc4A96F781F17A1ebC485',
  STQCHLP_StackingContract: '0xCb23392679bD5B46ecF35d03797c227AD07e9A1D',
};

export const SampleTokenContract = (provider) => new ethers.Contract(addresses.SampleTokenContract, sampleTokenMetadata.abi, provider);
export const QCHTokenContract = (provider) => new ethers.Contract(addresses.QCHTokenContract, quichesTokenMetadata.abi, provider);
export const STQCH_LPTokenContract = (provider) => new ethers.Contract(addresses.STQCH_LPTokenContract, lpTokenMetadata.abi, provider);
export const ST_StackingContract = (provider) => new ethers.Contract(addresses.ST_StackingContract, stackingMetadata.abi, provider);
export const STQCH_LiquidityProvidingContract = (provider) => new ethers.Contract(addresses.STQCH_LiquidityProvidingContract, liquidityProvidingMetadata.abi, provider);
export const STQCHLP_StackingContract = (provider) => new ethers.Contract(addresses.STQCHLP_StackingContract, stackingMetadata.abi, provider);
