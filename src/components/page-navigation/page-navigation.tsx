import React, { FC, useState } from 'react';
import ArrowIcon from '../icons/arrow-icon';

import './pag-navigation.scss';

interface IPageNavigationProps {
  activeIndex: number;
  dataLength: number;
  setActiveIndex: (index: number) => void;
}

/**
 * Кнопки навигации
 *
 * @param dataLength Количество элементов
 * @param activeIndex Индекс активной точки
 * @param setActiveIndex Функция для изменения активной точки
 */
const PageNavigation: FC<IPageNavigationProps> = ({ dataLength, activeIndex, setActiveIndex }): React.ReactElement => {
  const isSelectedMaxIndex = activeIndex === dataLength - 1;
  const isSelectedMinIndex = activeIndex === 0;
  const [isDisabled, setIsDisabled] = useState(false);

  const onButtonClick = (condition: boolean, type: 'prev' | 'next'): void => {
    setActiveIndex(condition ? activeIndex : activeIndex + (type === 'prev' ? -1 : 1));
    if (window.innerWidth >= 821) {
      setIsDisabled(true);
      setTimeout(() => setIsDisabled(false), 800);
    }
  };

  return (
    <div>
      <span className='counter'>
        {`${(activeIndex + 1).toString().padStart(2, '0')}/${dataLength
          .toString()
          .padStart(2, '0')}`}
      </span>
      <div className='nav_buttons_container'>
        <button
          className={`btn ${isSelectedMinIndex ? 'btn__disable' : ''}`}
          onClick={(): void => onButtonClick(isSelectedMinIndex, 'prev')}
          disabled={isDisabled}
        >
          <ArrowIcon isActive={isSelectedMinIndex} direction='left' />
        </button>
        <button
          className={`btn ${isSelectedMaxIndex ? 'btn__disable' : ''}`}
          onClick={(): void => onButtonClick(isSelectedMaxIndex, 'next')}
          disabled={isDisabled}
        >
          <ArrowIcon isActive={isSelectedMaxIndex} direction='right' />
        </button>
      </div>
    </div>
  );
};

export default PageNavigation;
