import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { configureChains, createConfig } from 'wagmi';
import { type Chain, localhost, goerli } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { isProduction } from '@/config';
import { goerliFork } from './config.test';

if (!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID)
  throw new Error(
    'Required NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID missing in env',
  );

export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

/** Supported chains of the application. */
export const chains: Chain[] = [goerli];
const providers = [
  w3mProvider({ projectId }),
];

if (!isProduction) {
  chains.push(goerliFork);
  providers.push(
    jsonRpcProvider({
      rpc: (_) => ({ http: goerliFork.rpcUrls.public.http[0] }),
    }),
  );
}

const { publicClient, webSocketPublicClient } = configureChains(
  chains,
  providers,
);

export const config = createConfig({
  autoConnect: false,
  connectors: w3mConnectors({ chains, projectId }),
  publicClient,
  webSocketPublicClient,
});

export const client = new EthereumClient(config, chains);

// Fetch wallet ids from https://walletconnect.com/explorer
export const preferredWallets = [];
