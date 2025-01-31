import { Select } from 'antd';
import React from 'react';
import { SubEventTypeEnum } from '@/enum/Event';

interface IProps {
  className?: string;
  type: SubEventTypeEnum;
  disable?: boolean;
  setType: (type: SubEventTypeEnum) => void;
}

export default function SingleDoubleSelect({ type, disable, setType, className }: IProps) {
  const list = [
    {
      value: SubEventTypeEnum.Single,
      label: '單打',
    },
    {
      value: SubEventTypeEnum.Double,
      label: '雙打',
    },
  ];

  return (
    <Select
      className={className}
      value={type}
      disabled={disable}
      showSearch
      placeholder="單雙打"
      onChange={(i: SubEventTypeEnum) => setType(i)}
      size="large"
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? '').includes(input)}
      options={list}
  />
  );
}
