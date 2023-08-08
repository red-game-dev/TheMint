'use client';
import { type ReactNode } from 'react';
import ReactDOM from 'react-dom';


export function PreconnectProvider({
  children,
  preconnect = [],
}: {
  children: ReactNode;
  preconnect?: any[];
}) {
  // @ts-expect-error this method is supported on ReactDOM in NextJS
  if (typeof ReactDOM.preconnect !== 'function') return children;

  preconnect.forEach((url) =>
    // @ts-expect-error this method is supported on ReactDOM in NextJS
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
    ReactDOM.preconnect(url, { crossOrigin: 'anonymous' }),
  );
  return children;
}
