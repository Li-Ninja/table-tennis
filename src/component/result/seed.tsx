import { ISeedProps } from 'react-brackets';
import styled from 'styled-components';
import { colors } from '@/config/theme';

const borderColor = colors.primary.DEFAULT;

export const V2 = styled.div`color: blue`;

// Seed copy from react-brackets
export const Seed = styled.div<Omit<ISeedProps, 'id' | 'teams'>>(
  props => `
  padding: 1em 1.5em;
  min-width: 225px;
  width:100%;
  position: relative;
  display: flex;
  align-items: center;
  flex: 0 1 auto;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
  @media (min-width: ${(props.mobileBreakpoint || 0) + 1}px) {
    &::after {
        content: "";
        position: absolute;
        height: 50%;
        width: 1.5em;
      [dir="rtl"] & {
        left: 0px;
      }
      [dir="ltr"] & {
        right: 0px;
      }
    }

    &:nth-child(even)::before{
      content:'';
      border-top: 1px solid ${borderColor};
      position:absolute;
      top: -0.5px;
      width:1.5em;
      [dir="rtl"] & {
        left:-1.5em;
        }
      [dir="ltr"] & {
        right:-1.5em;
      }
    }

    &:nth-child(even)::after {
      border-bottom: 1px solid ${borderColor};
      top: -0.5px;
     [dir="rtl"] & {
        border-left: 1px solid ${borderColor};
        }
      [dir="ltr"] & {
        border-right: 1px solid ${borderColor};
      }
    }
    &:nth-child(odd):not(:last-child)::after {
      border-top: 1px solid ${borderColor};
      top: calc(50% - 0.5px);
      [dir="rtl"] & {
        border-left: 1px solid ${borderColor};
        }
      [dir="ltr"] & {
        border-right: 1px solid ${borderColor};
      }
    }
}
`,
);
