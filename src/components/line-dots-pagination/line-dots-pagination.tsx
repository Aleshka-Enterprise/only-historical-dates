import React, { FC } from 'react';
import { IData } from '../../models/events';

import style from './line-dots-pagination.module.css';

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
    <div className={style.pag_container}>
      {data.map((_, index) => {
        return (
          <span
            key={index}
            className={`${style.pag} ${activeIndex === index ? style.active : ''}`}
            onClick={(): void => setActiveIndex(index)}
          ></span>
        );
      })}
    </div>
  );
};

export default LineDotsPagination;
