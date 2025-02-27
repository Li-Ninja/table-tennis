'use client';

import {
  StyleProvider, createCache, extractStyle,
} from '@ant-design/cssinjs';
import type Entity from '@ant-design/cssinjs/es/Cache';
import {
  ConfigProvider, theme,
} from 'antd';
import { useServerInsertedHTML } from 'next/navigation';
import React from 'react';
import { colors } from '@/config/theme';

export default function AntdRegistry({ children }: React.PropsWithChildren) {
  const isServerInserted = React.useRef<boolean>(false);
  const cache = React.useMemo<Entity>(() => createCache(), []);
  const { darkAlgorithm } = theme;

  const customTheme = {
    algorithm: darkAlgorithm,
    token: {
      colorPrimary: colors.primary.DEFAULT,
      colorSecondary: colors.secondary.DEFAULT,
    },
  };

  useServerInsertedHTML(() => {
    if (isServerInserted.current) {
      return;
    }

    isServerInserted.current = true;
    return (
      <style
        id="antd"
        dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
      />
    );
  });
  return (
    <StyleProvider cache={cache}>
      <ConfigProvider
        theme={customTheme}>
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
}
