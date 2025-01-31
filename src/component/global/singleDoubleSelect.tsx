import { Select } from 'antd';
import React from 'react';
import { SubEventTypeEnum } from '@/enum/Event';

interface IProps {
  className?: string;
  type: SubEventTypeEnum;
  disable?: boolean;
  setType: (type: SubEventTypeEnum) => void;
  onChange?: (type: SubEventTypeEnum) => void;
}

export default function SingleDoubleSelect({
  type, disable, setType, className, onChange,
}: IProps) {
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
      onChange={(value:SubEventTypeEnum) => {
        setType(value);
        onChange?.(value);
      }}
      size="large"
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? '').includes(input)}
      options={list}
  />
  );
}
