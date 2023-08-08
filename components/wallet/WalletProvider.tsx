import { Web3Modal } from '@web3modal/react';
import { type ReactNode, useCallback, useEffect, useState } from 'react';
import { type Hex } from 'viem';
import { WagmiConfig } from 'wagmi';
import { type MockConnector } from 'wagmi/connectors/mock';

import {
  client,
  config as prodConfig,
  preferredWallets,
  projectId,
} from './config';
import { createConfigFor } from './config.test';

type SetupAccount = (pkey: Hex, options?: MockConnector['options']) => void;

declare global {
  interface Window {
    _setupAccount: SetupAccount;
  }
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState(prodConfig);

  const _setupAccount = useCallback<SetupAccount>((pkey, options) => {
    setConfig(createConfigFor(pkey, options));
  }, []);

  useEffect(() => {
    window._setupAccount = _setupAccount;
    
    if (config === prodConfig) void config.autoConnect();
  }, [_setupAccount, config]);

  return (
    <>
      <WagmiConfig config={config}>{children}</WagmiConfig>
      <Web3Modal
        projectId={projectId}
        explorerRecommendedWalletIds={preferredWallets}
        ethereumClient={client}
      />
    </>
  );
}
