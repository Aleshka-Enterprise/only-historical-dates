import React, { useState, FC } from 'react';

interface IArrowIconProps {
  isActive: boolean;
  direction: 'left' | 'right';
}

const ArrowIcon: FC<IArrowIconProps> = ({ isActive, direction }) => {
  const [innerWidth] = useState(window.innerWidth);

  // Определяем размеры и стили для стрелки в зависимости от ширины окна
  const isWideScreen = innerWidth > 1060;
  const width = isWideScreen ? '10' : '6';
  const height = isWideScreen ? '14' : '8';
  const pathData = isWideScreen
    ? 'M8.49988 0.750001L2.24988 7L8.49988 13.25'
    : 'M4.7489 1.04178L1.6239 4.16678L4.7489 7.29178';

  return (
    <svg
      style={{ display: 'block', transform: direction === 'right' ? 'scaleX(-1)' : 'scaleX(1)' }}
      width={width}
      height={height}
      viewBox={isWideScreen ? '0 0 10 14' : '0 0 6 8'}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d={pathData}
        stroke={isActive ? '#9ba6ba' : '#42567A'}
        strokeWidth='2'
      />
    </svg>
  );
};

export default ArrowIcon;
