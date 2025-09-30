// Temporary type declarations for Next.js modules
declare module 'next/link' {
  import React from 'react';

  interface LinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    [key: string]: any;
  }

  const Link: React.FC<LinkProps>;
  export default Link;
}

declare module 'next/navigation' {
  export function useParams(): Record<string, string | string[]>;
  export function useRouter(): {
    push: (url: string) => void;
    replace: (url: string) => void;
    back: () => void;
    forward: () => void;
    refresh: () => void;
  };
  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
}