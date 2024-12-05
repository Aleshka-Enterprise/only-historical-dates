import React, { useState, FC } from 'react';

interface IArrowIconProps {
  isActive: boolean;
  direction: 'left' | 'right';
}

const ArrowIcon: FC<IArrowIconProps> = ({ isActive, direction }): React.ReactElement => {
  const [innerWidth] = useState(window.innerWidth);

  return (
    <>
      {innerWidth > 1060
        ? (
            <svg
              style={{ display: 'block', transform: direction === 'right' ? 'scaleX(-1)' : 'scaleX(1)' }}
              width='10'
              height='14'
              viewBox='0 0 10 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8.49988 0.750001L2.24988 7L8.49988 13.25'
                stroke={`${isActive ? '#9ba6ba' : '#42567A'}`}
                strokeWidth='2'
              />
            </svg>
          )
        : (
        <svg
          style={{ display: 'block', transform: direction === 'right' ? 'scaleX(-1)' : 'scaleX(1)' }}
          width='6'
          height='8'
          viewBox='0 0 6 8'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M4.7489 1.04178L1.6239 4.16678L4.7489 7.29178'
            stroke={`${isActive ? '#9ba6ba' : '#42567A'}`}
            strokeWidth='2'
          />
        </svg>
          )}
    </>
  );
};

export default ArrowIcon;
