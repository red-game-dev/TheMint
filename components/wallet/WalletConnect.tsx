import { useWeb3Modal } from '@web3modal/react';
import { useConnect } from 'wagmi';
import { MockConnector } from 'wagmi/connectors/mock';

const fancyButton =
  'dark:text-primary bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center';

export function WalletConnect() {
  const { close, open } = useWeb3Modal();
  const { connect: wagmiConnect, connectors } = useConnect();

  const isTest = connectors[0] instanceof MockConnector;
  const connect = isTest
    ? () => wagmiConnect({ connector: connectors[0] })
    : open;

  return (
    <button
      className={fancyButton}
      onClick={() => connect()}
      onKeyUp={({ key }) => {
        if (key !== 'Escape') return;
        close();
      }}
      type="button"
    >
      Connect
    </button>
  );
}
