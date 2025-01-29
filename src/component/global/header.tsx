'use client';

import {
  HistoryOutlined, MenuOutlined,
} from '@ant-design/icons';
import {
  Badge, Button, Drawer,
} from 'antd';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, {
  useEffect, useMemo, useState,
} from 'react';
import ChangelogDrawer from '@/component/global/changelogDrawer';

export default function Header(): JSX.Element {
  const pathname = usePathname();

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
    <header className="text-white">
      <div className="px-4 py-2 md:py-4 relative max-w-[1920px] mx-auto">
        {/* 手機版漢堡選單 */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 md:hidden z-10">
          <Button
            className="flex justify-center items-center"
            onClick={showMenuDrawer}
          >
            <MenuOutlined />
          </Button>
        </div>

        {/* 主要內容區域 */}
        <div className="flex items-center">
          {/* Logo 和選單區域 */}
          <div className="flex items-center flex-1 min-w-0">
            {/* Logo 區域 */}
            <div className="w-full md:w-auto flex justify-center md:justify-start shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/ttt51/logo.png"
                  alt="TTT51 Logo"
                  width={64}
                  height={64}
                  className="w-[48px] md:w-full h-auto mr-2"
                />
                <div className="md:hidden ml-3 text-lg font-medium">
                  Ttt51 - {menuItems.find(item => item.path === justifyActive)?.label || ''}
                </div>
              </Link>
            </div>

            {/* 電腦版選單 */}
            <nav className="hidden md:flex ml-8 flex-1 min-w-0">
              <ul className="flex flex-wrap gap-x-8 gap-y-2 justify-start">
                {menuItems.map(item => (
                  <li key={item.path} className="flex flex-col">
                    <Link
                      href={`/${item.path}`}
                      onClick={() => handleJustifyClick(item.path)}
                      className={classNames(
                        'hover:text-primary transition-colors whitespace-nowrap py-2',
                        justifyActive === item.path ? 'text-primary border-b-2 border-primary' : 'text-white',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* 更新日誌按鈕 */}
          <div className="ml-8 shrink-0">
            <Badge
              count={`v${process.env.version?.replace(/^(\d+\.\d+)\.\d+$/, '$1')}`}
              offset={[-10, -5]}
              color="var(--primary-color-light)"
            >
              <Button
                className="md:flex justify-center items-center hidden"
                onClick={showChangelogDrawer}
              >
                <HistoryOutlined />
                <span className="ml-2">更新日誌</span>
              </Button>
            </Badge>
          </div>
        </div>
      </div>

      <Drawer
        title="選單"
        placement="left"
        onClose={onCloseMenu}
        open={isShowMenuDrawer}
      >
        <div className="flex flex-col space-y-4">
          <div
            className="p-2 cursor-pointer flex items-center"
            onClick={() => {
              showChangelogDrawer();
              onCloseMenu();
            }}
          >
            <HistoryOutlined className="mr-2" /> 更新日誌
          </div>
          <div className="border-t border-gray-200 my-2"></div>
          <ul className="flex flex-col space-y-2">
            {menuItems.map(item => (
              <li key={item.path}>
                <Link
                  href={`/${item.path}`}
                  onClick={onCloseMenu}
                  className={classNames(
                    'block px-4 py-2 hover:text-primary transition-colors',
                    justifyActive === item.path ? 'text-primary' : 'text-white',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Drawer>

      <ChangelogDrawer
        open={isShowChangelogDrawer}
        onClose={onCloseChangelog}
      />
    </header>
  );
}
