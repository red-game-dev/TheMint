import { createWalletClient, type Hex, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { configureChains, createConfig as createWagmiConfig } from 'wagmi';
import { type Chain, localhost, goerli } from 'wagmi/chains';
import { MockConnector } from 'wagmi/connectors/mock';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

export const goerliFork: Chain = {
  ...goerli,
  id: localhost.id,
  rpcUrls: localhost.rpcUrls,
};

const [rpcUrl] = goerliFork.rpcUrls.public.http;

const chains = [goerliFork];
const providers = [jsonRpcProvider({ rpc: (_) => ({ http: rpcUrl }) })];

const { publicClient, webSocketPublicClient } = configureChains(
  chains,
  providers,
);

export function createConfigFor(pkey: Hex, options?: MockConnector['options']) {
  const walletClient = createWalletClient({
    account: privateKeyToAccount(pkey),
    chain: goerliFork,
    transport: http(rpcUrl),
  });

  const connectors = [
    new MockConnector({
      chains: chains,
      options: { ...options, walletClient },
    }),
  ];

  return createWagmiConfig({
    autoConnect: false,
    connectors,
    publicClient,
    webSocketPublicClient,
  });
}
