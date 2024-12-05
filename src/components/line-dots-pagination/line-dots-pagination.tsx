import React, { FC } from 'react';
import { IData } from '../../models/events';

import './line-dots-pagination.scss';

interface ILineDotsPaginationProps {
  data: IData[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

/**
 * Навигация в виде точек
 *
 * @param data - Массив элементов
 * @param activeIndex - Индекс активной точки
 * @param setActiveIndex - Функция для изменения индекса активной точки
 */
const LineDotsPagination: FC<ILineDotsPaginationProps> = ({
  data,
  activeIndex,
  setActiveIndex
}): React.ReactElement => {
  return (
    <div className='pag_container'>
      {data.map((_, index) => {
        return (
          <span
            key={index}
            className={`pag ${activeIndex === index ? 'active' : ''}`}
            onClick={(): void => setActiveIndex(index)}
          ></span>
        );
      })}
    </div>
  );
};

export default LineDotsPagination;
