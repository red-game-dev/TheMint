import { useWeb3Modal } from '@web3modal/react';
import clsx from 'clsx';
import React from 'react';
import { useAccount } from 'wagmi';

import { WalletConnect } from './WalletConnect';
import { WalletStatus } from './WalletStatus';

const statusClassNames = {
  connected: 'text-green',
  connecting: 'text-yellow',
  disconnected: 'text-grey-mid',
  reconnecting: 'text-grey-mid',
} as const;

export function Wallet({ className }: { className?: string }) {
  const { isConnected, isConnecting, status } = useAccount();
  const { isOpen } = useWeb3Modal();

  const actualStatus: keyof typeof statusClassNames =
    !isOpen && isConnecting ? 'disconnected' : status;

  return (
    <div className={clsx('relative', className)}>
      {isConnected ? <WalletStatus /> : <WalletConnect />}
      <span
        className={clsx(
          'absolute block w-full text-center text-xs',
          statusClassNames[actualStatus],
        )}
      >
        {actualStatus}
      </span>
    </div>
  );
}
