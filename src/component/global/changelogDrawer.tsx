'use client';

import {
  Drawer, Timeline,
} from 'antd';
import React from 'react';
import changelogList from '@/../changelog';

interface IProps {
  open: boolean;
  onClose: () => void;
}

const UpdateItem = ({ version, list }: { version: string; list: string[]}) => (
  <>
    <h4 className='text-xl font-bold mb-2'>{version}</h4>
    <ul className='list-disc ml-4'>
      {
        list.map((item, index) => <li key={index}>{item}</li>)
      }
    </ul>
  </>
);

export default function ChangeLogDrawer(props: IProps) {
  const { open, onClose } = props;

  const items = changelogList.map(
    (item, index) => ({
      children: <UpdateItem key={index} version={item.version} list={item.list} />,
    }),
  );

  return (
    <Drawer title="更新日誌" onClose={onClose} open={open}>
      <Timeline
        items={items}
      />
    </Drawer>
  );
}
