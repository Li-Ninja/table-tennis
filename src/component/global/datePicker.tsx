'use client';

import {
  format, isValid, parse,
} from 'date-fns';
import FocusTrap from 'focus-trap-react';
import React, {
  ChangeEventHandler, useEffect, useRef, useState,
} from 'react';
import {
  DayPicker, SelectSingleEventHandler,
} from 'react-day-picker';
import { usePopper } from 'react-popper';
import 'react-day-picker/dist/style.css';
import '@/css/dayPicker.css';
import { TEInput } from 'tw-elements-react';

interface IProps {
  text?: string;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  className: string;
}

export default function DatePicker(props: IProps) {
  const { text = 'Date', date, setDate, className: componentClassName } = props;
  const [selected, setSelected] = useState<Date>();
  const [inputValue, setInputValue] = useState<string>(date);
  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const popperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );

  const popper = usePopper(popperRef.current, popperElement, {
    placement: 'bottom-start',
  });

  useEffect(() => {
    setInputValue(date);

    if (date) {
      const parsedDate = parse(date, 'y-MM-dd', new Date());

      if (isValid(parsedDate)) {
        setSelected(parsedDate);
      }
    }
  }, [date]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (popperRef.current
        && popperElement
        && !popperRef.current.contains(event.target as Node)
        && !popperElement.contains(event.target as Node)) {
        setIsPopperOpen(false);
      }
    };

    if (isPopperOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isPopperOpen, popperElement]);

  const closePopper = () => {
    setIsPopperOpen(false);
    buttonRef?.current?.focus();
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    const newValue = e.currentTarget.value;

    setInputValue(newValue);
    const parsedDate = parse(newValue, 'y-MM-dd', new Date());

    if (isValid(parsedDate)) {
      setSelected(parsedDate);
      setDate(format(parsedDate, 'y-MM-dd'));
    } else {
      setSelected(undefined);
      setDate('');
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPopperOpen(true);
  };

  const handleDaySelect: SelectSingleEventHandler = value => {
    setSelected(value);

    if (value) {
      setInputValue(format(value, 'y-MM-dd'));
      closePopper();
    } else {
      setInputValue('');
    }
  };

  return (
    <div className={componentClassName}>
      <div ref={popperRef}>
        <TEInput
          type="text"
          label={text}
          value={inputValue}
          className="text-black"
          onChange={handleInputChange}
          onClick={handleButtonClick}
        />
      </div>
      {isPopperOpen && (
        <FocusTrap
          active
          focusTrapOptions={{
            initialFocus: false,
            allowOutsideClick: true,
            clickOutsideDeactivates: true,
            fallbackFocus: buttonRef.current || undefined,
          }}
        >
          <div
            tabIndex={-1}
            style={popper.styles.popper}
            className="dialog-sheet bg-gray-900 rounded-lg"
            {...popper.attributes.popper}
            ref={setPopperElement}
            role="dialog"
            aria-label="DayPicker calendar"
          >
            <DayPicker
              initialFocus={isPopperOpen}
              mode="single"
              defaultMonth={selected}
              selected={selected}
              onSelect={handleDaySelect}
            />
          </div>
        </FocusTrap>
      )}
    </div>
  );
}
