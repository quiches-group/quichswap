/* eslint-disable camelcase */
import { ethers } from 'ethers';

import lpTokenMetadata from '../assets/abis/LPToken.json';
import quichesTokenMetadata from '../assets/abis/QuichesToken.json';
import sampleTokenMetadata from '../assets/abis/SampleToken.json';
import stackingMetadata from '../assets/abis/QuichswapStacking.json';
import liquidityProvidingMetadata from '../assets/abis/QuichswapLiquidityProviding.json';

const addresses = {
  SampleTokenContract: '0x81D9a788e1BD1424E3a0D5A93C42624129D90738',
  QCHTokenContract: '0xF3042Bc258CC1243eE5F5D25cD9e2AE377f1D49a',
  STQCH_LPTokenContract: '0xed1d3AdEA5eb6807976F850F4cb9DD38C8b30814',
  ST_StackingContract: '0xD9675c89cA350b2BFCc6920464f567a839794f5c',
  QCH_StackingContract: '0xFDdaba1736f4A3c09A1D35Dd76AD080f58525E53',
  STQCH_LiquidityProvidingContract: '0x31622E30216FB02C96FC9698898725ea4e138306',
  STQCHLP_StackingContract: '0xeB6DE7027f6A76fF6cbDe89ab335b60c80739bc2',
};

export const SampleTokenContract = (provider) => new ethers.Contract(addresses.SampleTokenContract, sampleTokenMetadata.abi, provider);
export const QCHTokenContract = (provider) => new ethers.Contract(addresses.QCHTokenContract, quichesTokenMetadata.abi, provider);
export const STQCH_LPTokenContract = (provider) => new ethers.Contract(addresses.STQCH_LPTokenContract, lpTokenMetadata.abi, provider);
export const QCH_StackingContract = (provider) => new ethers.Contract(addresses.QCH_StackingContract, stackingMetadata.abi, provider);
export const ST_StackingContract = (provider) => new ethers.Contract(addresses.ST_StackingContract, stackingMetadata.abi, provider);
export const STQCH_LiquidityProvidingContract = (provider) => new ethers.Contract(addresses.STQCH_LiquidityProvidingContract, liquidityProvidingMetadata.abi, provider);
export const STQCHLP_StackingContract = (provider) => new ethers.Contract(addresses.STQCHLP_StackingContract, stackingMetadata.abi, provider);
