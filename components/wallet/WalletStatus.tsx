import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi';

const fancyButton =
  'dark:text-primary bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center';

const menu = clsx(
  'z-[1] flex flex-col rounded border-2',
  'border-secondary bg-primary drop-shadow-xl backdrop-blur',
  'dark:border-secondary dark:bg-primary dark:text-primary',
);

export function WalletStatus() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();

  const { chains, switchNetwork } = useSwitchNetwork({
    onSuccess: (chain) => {
      alert("Switched to " + chain.name)
    },
  });
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className={fancyButton}>
          {chain?.name}
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className={menu}>
            {chains.map((c) => (
              <DropdownMenu.Item
                className="cursor-pointer p-4"
                key={c.id}
                onClick={() => switchNetwork?.(c.id)}
              >
                {c.name}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger className={fancyButton}>
          {address?.slice(0, 8)}
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className={menu}>
            <DropdownMenu.Item
              className="cursor-pointer p-4"
              onClick={() => disconnect()}
            >
              Disconnect
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
}
