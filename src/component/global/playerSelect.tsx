import { Select } from 'antd';
import React from 'react';
import { usePlayerStore } from '@/store/player';

interface IProps {
  id: number | undefined;
  disable?: boolean;
  setId: (id: number) => void;
  className?: string;
  placeholder?: string;
  excludeIdList?: number[];
}

export default function PlayerSelect({ id, disable, setId, className, excludeIdList = [], placeholder = '選手名稱' }: IProps) {
  const { playerList } = usePlayerStore(state => state);
  const list = playerList
    .filter(item => !excludeIdList.includes(item.id))
    .map(item => ({
      value: item.id,
      label: item.name,
    }));

  return (
    <Select
      className={className}
      value={id}
      disabled={disable}
      showSearch
      placeholder={placeholder}
      onChange={(i: number) => setId(i)}
      size="large"
      allowClear
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? '').includes(input)}
      filterSort={(optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
      }
      options={list}
    />
  );
}
