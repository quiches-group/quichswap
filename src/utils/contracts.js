/* eslint-disable camelcase */
import { ethers } from 'ethers';

import lpTokenMetadata from '../assets/abis/LPToken.json';
import quichesTokenMetadata from '../assets/abis/QuichesToken.json';
import sampleTokenMetadata from '../assets/abis/SampleToken.json';
import stackingMetadata from '../assets/abis/QuichswapStacking.json';
import liquidityProvidingMetadata from '../assets/abis/QuichswapLiquidityProviding.json';

const addresses = {
  SampleTokenContract: '0xe3b559e14C94eE45B9e4EaD6a58704DDab09e381',
  QCHTokenContract: '0x55b16CCD19A5E8117F24b7572076d6F090363a88',
  STQCH_LPTokenContract: '0x59fF9AaAD4d5512572cDe60Bf11165782553eA68',
  ST_StackingContract: '0xF599AE5067F763B22b398d525596C38cCF33e009',
  QCH_StackingContract: '0x300Fb6642D7073E90375A39139eB4a5B9B01A751',
  STQCH_LiquidityProvidingContract: '0x86f52Ae564Fb5BD72Cb98e99c2f4419CE0cdBDD2',
  STQCHLP_StackingContract: '0x5b642d57F782663e0a9781aFCD010D18f2a397B0',
};

export const SampleTokenContract = (provider) => new ethers.Contract(addresses.SampleTokenContract, sampleTokenMetadata.abi, provider);
export const QCHTokenContract = (provider) => new ethers.Contract(addresses.QCHTokenContract, quichesTokenMetadata.abi, provider);
export const STQCH_LPTokenContract = (provider) => new ethers.Contract(addresses.STQCH_LPTokenContract, lpTokenMetadata.abi, provider);
export const QCH_StackingContract = (provider) => new ethers.Contract(addresses.QCH_StackingContract, stackingMetadata.abi, provider);
export const ST_StackingContract = (provider) => new ethers.Contract(addresses.ST_StackingContract, stackingMetadata.abi, provider);
export const STQCH_LiquidityProvidingContract = (provider) => new ethers.Contract(addresses.STQCH_LiquidityProvidingContract, liquidityProvidingMetadata.abi, provider);
export const STQCHLP_StackingContract = (provider) => new ethers.Contract(addresses.STQCHLP_StackingContract, stackingMetadata.abi, provider);
