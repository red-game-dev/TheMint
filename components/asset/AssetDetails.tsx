'use client';
import { useMintNft } from '@/core/actions'
import Image from 'next/image';
import { Address } from 'wagmi'

interface Asset {
  asset: {
    assetAddress: Address;
    previewImageUrl: string;
    name: string;
  }
}

export function AssetDetails({ asset }: Asset) {
  const { mint } = useMintNft({
    assetAddress: asset.assetAddress,
  });

  return (
    <div>
      <h1 className="">Join our family</h1>
      <h2>We are community of chefs</h2>
      <Image src={asset.previewImageUrl} width={100} height={150} alt={asset.name} />
      <button onClick={() => mint()}>Mint</button>
    </div>
  )
}