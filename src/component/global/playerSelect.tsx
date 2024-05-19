import { Select } from 'antd';
import React from 'react';
import { usePlayerStore } from '@/store/player';

interface IProps {
  id: number | undefined;
  disable?: boolean;
  setId: (id: number) => void;
}

export default function PlayerSelect({ id, disable, setId }: IProps) {
  const { playerList } = usePlayerStore(state => state);
  const list = playerList.map(item => ({
    value: item.id,
    label: item.name,
  }));

  return (
    <Select
      value={id}
      disabled={disable}
      showSearch
      placeholder="選手名稱"
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
