/* eslint-disable camelcase */
import { ethers } from 'ethers';

import lpTokenMetadata from '../assets/abis/LPToken.json';
import quichesTokenMetadata from '../assets/abis/QuichesToken.json';
import sampleTokenMetadata from '../assets/abis/SampleToken.json';
import stackingMetadata from '../assets/abis/QuichswapStacking.json';
import liquidityProvidingMetadata from '../assets/abis/QuichswapLiquidityProviding.json';

const addresses = {
  SampleTokenContract: '0x4aBb3a9f2A4eCf3360e4931d8F3805BC3eDF5070',
  QCHTokenContract: '0x09744bc4cFA71EbDd57B5245F64f52bbcc919aC4',
  STQCH_LPTokenContract: '0xBB490ae885CD2E5f07BC8e9881C41a16288696AC',
  ST_StackingContract: '0x97e40D62060c0Ad64460A67B4ecDB30280AD2949',
  QCH_StackingContract: '0x1BCf919f4c71279B50a86A91aCF424523d585d76',
  STQCH_LiquidityProvidingContract: '0xa936e567B4023C81EB416063436Eb85A1e1a1925',
  STQCHLP_StackingContract: '0xcF3ce0Ea19ce721a8D87146613C4A266C5Bd1634',
};

export const SampleTokenContract = (provider) => new ethers.Contract(addresses.SampleTokenContract, sampleTokenMetadata.abi, provider);
export const QCHTokenContract = (provider) => new ethers.Contract(addresses.QCHTokenContract, quichesTokenMetadata.abi, provider);
export const STQCH_LPTokenContract = (provider) => new ethers.Contract(addresses.STQCH_LPTokenContract, lpTokenMetadata.abi, provider);
export const QCH_StackingContract = (provider) => new ethers.Contract(addresses.QCH_StackingContract, stackingMetadata.abi, provider);
export const ST_StackingContract = (provider) => new ethers.Contract(addresses.ST_StackingContract, stackingMetadata.abi, provider);
export const STQCH_LiquidityProvidingContract = (provider) => new ethers.Contract(addresses.STQCH_LiquidityProvidingContract, liquidityProvidingMetadata.abi, provider);
export const STQCHLP_StackingContract = (provider) => new ethers.Contract(addresses.STQCHLP_StackingContract, stackingMetadata.abi, provider);
