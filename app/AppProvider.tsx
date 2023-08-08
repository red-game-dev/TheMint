'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { type FC, type ReactNode, useState } from 'react';

import { PreconnectProvider } from '@/components/app';
import { WalletProvider } from '@/components/wallet';
import { preconnect } from '@/config';

const providers: FC<{ children: ReactNode }>[] = [
  (props: any) => <PreconnectProvider {...props} preconnect={preconnect} />,
  (props: any) => <WalletProvider {...props} />,
  (props: any) => {
    const [queryClient] = useState(() => new QueryClient());
    return <QueryClientProvider {...props} client={queryClient} />;
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  return providers.reduceRight(
    (children, Provider) => <Provider>{children}</Provider>,
    children,
  );
}
