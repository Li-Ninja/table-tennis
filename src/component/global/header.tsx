'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  TETabs,
  TETabsItem,
} from 'tw-elements-react';

export default function Header(): JSX.Element {
  const [justifyActive, setJustifyActive] = useState('home');

  const handleJustifyClick = (value: string) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (
    <header className="mb-3">
      <TETabs justify className="ml-8">
        <div className="flex justify-center items-center mr-12">
          <Image
            src="/wtt_logo.png"
            alt="WTT Logo"
            width={180}
            height={37}
            priority
          />
        </div>
        <Link
          className="flex-grow"
          href="/"
          passHref
        >
          <TETabsItem
            onClick={() => handleJustifyClick('home')}
            active={justifyActive === 'home'}
            tag="div"
          >
            Home
          </TETabsItem>
        </Link>
        <Link
          className="flex-grow"
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
