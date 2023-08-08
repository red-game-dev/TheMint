import clsx from 'clsx';

import { Wallet } from '@/components/wallet';

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  return (
    <nav
      className={clsx(
        'sticky top-0 z-[1] flex items-center gap-8 p-4 md:py-6',
        'border-b border-grey-dark',
        className,
      )}
    >
      <Wallet />
    </nav>
  );
}
