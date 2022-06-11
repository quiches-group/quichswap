/* eslint-disable camelcase */
import { ethers } from 'ethers';

import lpTokenMetadata from '../assets/abis/LPToken.json';
import quichesTokenMetadata from '../assets/abis/QuichesToken.json';
import sampleTokenMetadata from '../assets/abis/SampleToken.json';
import stackingMetadata from '../assets/abis/QuichswapStacking.json';
import liquidityProvidingMetadata from '../assets/abis/QuichswapLiquidityProviding.json';

const addresses = {
  SampleTokenContract: '0x98843C33779650B229894Bfd053D889ca4727DAC',
  QCHTokenContract: '0xAbAa522A78fc293152546Cbf290aaa503C8789C0',
  STQCH_LPTokenContract: '0xC27dA761be5f388004351568857E1bf6855cac87',
  ST_StackingContract: '0x89cb0179154e4eCc4df9096827C47b453C4faef5',
  QCH_StackingContract: '0xC5889E57D3d73453f76c1c9C35a962B1382e0C4A',
  STQCH_LiquidityProvidingContract: '0x0FC7eF2D6392953C86011BC3399E85E600888aFc',
  STQCHLP_StackingContract: '0xB5937B561c96E284A5F4E1416A089449d7158029',
};

export const SampleTokenContract = (provider) => new ethers.Contract(addresses.SampleTokenContract, sampleTokenMetadata.abi, provider);
export const QCHTokenContract = (provider) => new ethers.Contract(addresses.QCHTokenContract, quichesTokenMetadata.abi, provider);
export const STQCH_LPTokenContract = (provider) => new ethers.Contract(addresses.STQCH_LPTokenContract, lpTokenMetadata.abi, provider);
export const QCH_StackingContract = (provider) => new ethers.Contract(addresses.QCH_StackingContract, stackingMetadata.abi, provider);
export const ST_StackingContract = (provider) => new ethers.Contract(addresses.ST_StackingContract, stackingMetadata.abi, provider);
export const STQCH_LiquidityProvidingContract = (provider) => new ethers.Contract(addresses.STQCH_LiquidityProvidingContract, liquidityProvidingMetadata.abi, provider);
export const STQCHLP_StackingContract = (provider) => new ethers.Contract(addresses.STQCHLP_StackingContract, stackingMetadata.abi, provider);
