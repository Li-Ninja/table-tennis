'use client';

import {
  HistoryOutlined, MenuOutlined,
} from '@ant-design/icons';
import {
  Badge, Button, Drawer,
} from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, {
  useEffect,
  useMemo, useState,
} from 'react';
import {
  TETabs,
  TETabsItem,
} from 'tw-elements-react';
import ChangelogDrawer from '@/component/global/changelogDrawer';

export default function Header(): JSX.Element {
  const pathname = usePathname(); // 獲取當前路徑

  const menuItems = useMemo(() => [
    { path: '', label: '首頁' },
    { path: 'result', label: '2023 年終賽' },
    { path: 'ranking', label: '積分表' },
    { path: 'rankingHistory', label: '積分記錄' },
    { path: 'player', label: '選手' },
    { path: 'rule', label: '賽制' },
    { path: 'about', label: '關於我們' },
  ], []);
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

  // #region changelog drawer
  const [isShowChangelogDrawer, setIsShowChangelogDrawer] = useState(false);
  const onCloseChangelog = () => {
    setIsShowChangelogDrawer(false);
  };

  const showChangelogDrawer = () => {
    setIsShowChangelogDrawer(true);
  };
  // #endregion

  // #region menu drawer
  const [isShowMenuDrawer, setIsShowMenuDrawer] = useState(false);
  const onCloseMenu = () => {
    setIsShowMenuDrawer(false);
  };

  const showMenuDrawer = () => {
    setIsShowMenuDrawer(true);
  };
  // #endregion

  return (
    <header className="mb-3 flex relative items-center">
      <div className="md:hidden absolute left-2">
        <Button
          className="flex justify-center items-center"
          onClick={showMenuDrawer}
        >
          <MenuOutlined />
        </Button>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="flex justify-center items-center md:mr-12">
          <Image
            src="/ttt51/logo.png"
            alt="TTT Logo"
            width={64}
            height={64}
            className="w-full h-auto"
            priority
            />
        </div>
        <div className="md:hidden ml-3 text-lg font-medium">
          Ttt51 - {menuItems.find(item => item.path === justifyActive)?.label || ''}
        </div>
      </div>
      <TETabs className="hidden md:flex mt-12 border-primary">
        {menuItems.map(item => (
          <Link
            key={item.path}
            href={`/${item.path}`}
            passHref
          >
            <TETabsItem
              onClick={() => handleJustifyClick(item.path)}
              active={justifyActive === item.path}
              tag="div"
            >
              {item.label}
            </TETabsItem>
          </Link>
        ))}
      </TETabs>

      <div className="absolute right-4 top-4">
        <Badge
          count={`v${process.env.version?.replace(/^(\d+\.\d+)\.\d+$/, '$1')}`}
          offset={[-10, -5]}
          color='#f3956a'
        >
          <Button className="flex justify-center items-center" onClick={showChangelogDrawer} >
            <HistoryOutlined /> 更新日誌
          </Button>
        </Badge>
      </div>

      <Drawer
        title="選單"
        placement="left"
        onClose={onCloseMenu}
        open={isShowMenuDrawer}
      >
        <div className="flex flex-col space-y-4">
          {menuItems.map(item => (
            <Link
              key={item.path}
              href={`/${item.path}`}
              onClick={() => {
                handleJustifyClick(item.path);
                onCloseMenu();
              }}
            >
              <div className={`p-2 ${justifyActive === item.path ? 'text-primary font-bold' : ''}`}>
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      </Drawer>

      <ChangelogDrawer open={isShowChangelogDrawer} onClose={onCloseChangelog} />
    </header>
  );
}
