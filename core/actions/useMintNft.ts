import abiContract from '@/core/abi/Nigiri'
import { useCallback } from 'react';
import { Address, usePrepareContractWrite, useContractWrite } from 'wagmi'

interface useMinNftProps {
  assetAddress?: Address;
}

export function useMintNft({ assetAddress }: useMinNftProps) {
// const signer = useEthersSigner();
  
  const { config, error, isError } = usePrepareContractWrite({
    address: assetAddress,
    abi: abiContract,
    functionName: 'mint',
    args: [],
    enabled: Boolean(assetAddress)
  })
  const { data, write } = useContractWrite(config)

  console.log('data', data, Boolean(assetAddress));

  if (isError) {
    throw error;
  }

  return {
    mint: useCallback(() => write?.(), [write]),
  }
}