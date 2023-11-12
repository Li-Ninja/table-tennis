'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import {
  TETabs,
  TETabsItem,
} from 'tw-elements-react';

export default function Header(): JSX.Element {
  const [justifyActive, setJustifyActive] = useState(usePathname().replaceAll('/', ''));
  const handleJustifyClick = (value: string) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (
    <header className="mb-3 flex">
      <div className="flex justify-center items-center mr-12">
        <Image
          src="/ttt_51_logo.png"
          alt="TTT Logo"
          width="70"
          height="10"
          className="w-full h-auto"
          priority
          />
      </div>
      <TETabs className="flex mt-12">
        <Link
          href="/"
          passHref
        >
          <TETabsItem
            onClick={() => handleJustifyClick('')}
            active={justifyActive === ''}
            tag="div"
          >
            Home
          </TETabsItem>
        </Link>
        <Link
          href="/result"
          passHref
        >
          <TETabsItem
            onClick={() => handleJustifyClick('result')}
            active={justifyActive === 'result'}
            tag="div"
          >
            Result
          </TETabsItem>
        </Link>
      </TETabs>
    </header>
  );
}
