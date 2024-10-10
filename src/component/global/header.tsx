'use client';

import { HistoryOutlined } from '@ant-design/icons';
import {
  Badge, Button,
} from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, {
  useEffect, useState,
} from 'react';
import {
  TETabs,
  TETabsItem,
} from 'tw-elements-react';
import ChangelogDrawer from '@/component/global/changelogDrawer';

export default function Header(): JSX.Element {
  const pathname = usePathname(); // 獲取當前路徑
  const [justifyActive, setJustifyActive] = useState(usePathname().replaceAll('/', ''));
  const handleJustifyClick = (value: string) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  useEffect(() => {
    setJustifyActive(pathname.replaceAll('/', ''));
  }, [pathname]);

  // #region drawer
  const [isShowDrawer, setIsShowDrawer] = useState(false);
  const onClose = () => {
    setIsShowDrawer(false);
  };

  const showDrawer = () => {
    setIsShowDrawer(true);
  };
  // #endregion

  return (
    <header className="mb-3 flex relative">
      <div className="flex justify-center items-center mr-12">
        <Image
          src="/ttt51.png"
          alt="TTT Logo"
          width="64"
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
            首頁
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
            第一屆會內賽
          </TETabsItem>
        </Link>
        <Link
          href="/ranking"
          passHref
        >
          <TETabsItem
            onClick={() => handleJustifyClick('ranking')}
            active={justifyActive === 'ranking'}
            tag="div"
          >
            積分表
          </TETabsItem>
        </Link>
        <Link
          href="/rankingHistory"
          passHref
        >
          <TETabsItem
            onClick={() => handleJustifyClick('rankingHistory')}
            active={justifyActive === 'rankingHistory'}
            tag="div"
          >
            積分賽記錄
          </TETabsItem>
        </Link>
        <Link
          href="/player"
          passHref
        >
          <TETabsItem
            onClick={() => handleJustifyClick('player')}
            active={justifyActive === 'player'}
            tag="div"
          >
            選手
          </TETabsItem>
        </Link>
      </TETabs>

      <div className="absolute right-4 top-4">
        <Badge
          count={`v${process.env.version?.replace(/-.*$/, '')}`}
          offset={[-10, -5]}
          color='#f3956a'
        >
          <Button className="flex justify-center items-center" onClick={showDrawer} >
            <HistoryOutlined /> 更新日誌
          </Button>
        </Badge>
      </div>
      <ChangelogDrawer open={isShowDrawer} onClose={onClose} />
    </header>
  );
}
