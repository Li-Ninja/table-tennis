import { Select } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useEventStore } from '@/store/event';

interface IProps {
  className?: string;
  id: number | undefined;
  disable?: boolean;
  setId: (id: number) => void;
}

export default function EventSelect({ id, disable, setId, className }: IProps) {
  const { eventList } = useEventStore(state => state);
  const list = eventList
    // TODO 篩選日期這個應該拔到，但後端要篩選掉非過期的賽事
    .filter(item => item.isSingleMatch && dayjs(item.date) > dayjs('2024-01-01'))
    .map(item => ({
      value: item.id,
      label: item.name,
      date: item.date,
    }));

  return (
    <Select
      className={className}
      value={id}
      disabled={disable}
      showSearch
      placeholder="賽事名稱"
      onChange={(i: number) => setId(i)}
      size="large"
      allowClear
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? '').includes(input)}
      filterSort={(optionA, optionB) => optionB.value - optionA.value}
      options={list}
  />
  );
}
