import React, { FC, RefObject, useEffect, useRef, useState } from 'react';
import { Circ, gsap } from 'gsap';
import CirclePage from '../circle-pag/circle-pag';
import { IData } from '../../models/events';

import './pagination.scss';

interface ICirclePaginationProps {
  data: IData[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  gridRef: RefObject<HTMLDivElement>;
}

/**
 * Окружность навигации, с расставленной на ней пагинацией
 *
 * @param data Массив данных
 * @param activeIndex Индекс активной точки
 * @param setActiveIndex Функция для изменения активной точки
 * @param gridRef Ссылка на объект с сеткой, для вычисления высоты блока
 */
export const CirclePagination: FC<ICirclePaginationProps> = ({
  data,
  activeIndex,
  setActiveIndex,
  gridRef
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pagWidth, setPageWidth] = useState(window.innerWidth);

  const gridElementHeight = gridRef.current?.offsetHeight || 0;

  // Обработчик изменения размера окна
  const handleWindowSizeChange = (): void => {
    setPageWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => window.removeEventListener('resize', handleWindowSizeChange);
  }, []);

  const getContainerMarginTop = (pageWidth: number): number => {
    return pageWidth <= 820 ? 0 : gridElementHeight * 0.4444 - (pageWidth * (53 / 192)) / 2;
  };

  // Вычисление координат для вращения пагинации
  const rotatePag = (index: number): [number, number] => {
    const R = (pagWidth * (53 / 192)) / 2;
    const activePagSize = 56;
    const gridColumnWidth = pagWidth / 24;

    const radian =
      index * ((2 * Math.PI) / data.length) -
      Math.acos((R + activePagSize - gridColumnWidth * 3 + activePagSize / 2) / R);

    const x = R * Math.cos(radian) - activePagSize / 2;
    const y = R * Math.sin(radian) - activePagSize / 2;

    return [x + R, y + R];
  };

  // Вращение пагинации и контейнера
  const rotateCircle = (length: number, index: number): void => {
    gsap.to(containerRef.current, {
      duration: 1.5,
      rotation: -(360 / length) * index,
      ease: Circ.easeOut
    });

    gsap.to('.pag', {
      duration: 1.5,
      rotation: (360 / length) * index,
      ease: Circ.easeOut
    });
  };

  useEffect(() => {
    rotateCircle(data.length, activeIndex);
  }, [activeIndex]);

  const getPaginationText = (dataItem: IData): string => {
    return dataItem.paginationText || '';
  }

  return (
    <div
      ref={containerRef}
      className='pagination-container'
      style={{ marginTop: getContainerMarginTop(pagWidth) }}
    >
      <div className='wrapper'>
        {data.map((dataItem, index) => (
          <CirclePage
            key={index}
            index={index}
            setActiveIndex={setActiveIndex}
            activeIndex={activeIndex}
            rotatePag={rotatePag}
            paginationText={getPaginationText(dataItem)}
          />
        ))}
      </div>
    </div>
  );
};
