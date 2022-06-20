/* eslint-disable camelcase */
import { ethers } from 'ethers';

import lpTokenMetadata from '../assets/abis/LPToken.json';
import quichesTokenMetadata from '../assets/abis/QuichesToken.json';
import sampleTokenMetadata from '../assets/abis/SampleToken.json';
import stackingMetadata from '../assets/abis/QuichswapStacking.json';
import liquidityProvidingMetadata from '../assets/abis/QuichswapLiquidityProviding.json';

const addresses = {
  SampleTokenContract: '0xF04FB3D1C096bC4036A53B40dFa31a3f4505f314',
  QCHTokenContract: '0xfF0797EDe0BA8bDde091546B5Bc96B24Cc8854b6',
  STQCH_LPTokenContract: '0x4Cd997033f91Ce5DD19594a8F781d0673e73add5',
  ST_StackingContract: '0xD1F018EF4349e8E77429CE6f2425230a0a537315',
  QCH_StackingContract: '0x13Cc0F3C15DCD8Ad57083F4a7d5f46b9bbE7211d',
  STQCH_LiquidityProvidingContract: '0x09744bc4cFA71EbDd57B5245F64f52bbcc919aC4',
  STQCHLP_StackingContract: '0x1BCf919f4c71279B50a86A91aCF424523d585d76',
};

export const SampleTokenContract = (provider) => new ethers.Contract(addresses.SampleTokenContract, sampleTokenMetadata.abi, provider);
export const QCHTokenContract = (provider) => new ethers.Contract(addresses.QCHTokenContract, quichesTokenMetadata.abi, provider);
export const STQCH_LPTokenContract = (provider) => new ethers.Contract(addresses.STQCH_LPTokenContract, lpTokenMetadata.abi, provider);
export const QCH_StackingContract = (provider) => new ethers.Contract(addresses.QCH_StackingContract, stackingMetadata.abi, provider);
export const ST_StackingContract = (provider) => new ethers.Contract(addresses.ST_StackingContract, stackingMetadata.abi, provider);
export const STQCH_LiquidityProvidingContract = (provider) => new ethers.Contract(addresses.STQCH_LiquidityProvidingContract, liquidityProvidingMetadata.abi, provider);
export const STQCHLP_StackingContract = (provider) => new ethers.Contract(addresses.STQCHLP_StackingContract, stackingMetadata.abi, provider);
