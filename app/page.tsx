import { AssetDetails } from '@/components/asset'
import { Address } from 'wagmi';

const asset = {
  previewImageUrl: '/images/preview.png',
  assetAddress: '0xAc314DfCe6a883195F6516A34F978C8C2726AF48' as Address,
  name: 'Nigiri'
}

export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="flex text-red-900">Smol caviar frontend</h1>
      <p>A smol frontend for caviar testing</p>
      <AssetDetails asset={asset} />
    </main>
  );
}
