import React, { FC, RefObject, useEffect, useRef, useState } from 'react';
import style from './pagination.module.css';
import { Circ, gsap } from 'gsap';
import CirclePage from '../circle-page/circle-page';
import uuid from 'react-uuid';
import { IData } from '../../models/events';

interface ICirclePagination {
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
export const CirclePagination: FC<ICirclePagination> = ({
  data,
  activeIndex,
  setActiveIndex,
  gridRef
}): React.ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const [pagHash] = useState(uuid().slice(-6));

  const gridElementHeight = gridRef.current?.offsetHeight || 0;

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

  const rotatePag = (index: number): [number, number] => {
    const R = (pageWidth * (53 / 192)) / 2;
    const activePagSize = 56;
    const gridColumnWidth = pageWidth / 24;

    const radian =
      index * ((2 * Math.PI) / data.length) -
      Math.acos((R + activePagSize - gridColumnWidth * 3 + activePagSize / 2) / R);

    const x = R * Math.cos(radian) - activePagSize / 2;
    const y = R * Math.sin(radian) - activePagSize / 2;

    return [x + R, y + R];
  };

  const rotateCircle = (length: number, index: number, pagHash: string): void => {
    gsap.to(containerRef.current, {
      duration: 1.5,
      rotation: -(360 / length) * index,
      ease: Circ.easeOut
    });

    gsap.to(`.pag_${pagHash}`, {
      duration: 1.5,
      rotation: (360 / length) * index,
      ease: Circ.easeOut
    });
  };

  useEffect(() => {
    rotateCircle(data.length, activeIndex, pagHash);
  }, [activeIndex]);

  const getPaginationText = (dataItem: IData): string =>
    dataItem.paginationText ? dataItem.paginationText : '';

  return (
    <div
      ref={containerRef}
      className={style.container}
      style={{ marginTop: getContainerMarginTop(pageWidth) }}
    >
      <div className={style.wrapper}>
        {data.map((dataItem, index) => {
          return (
            <CirclePage
              key={index}
              index={index}
              setActiveIndex={setActiveIndex}
              activeIndex={activeIndex}
              rotatePag={rotatePag}
              paginationText={getPaginationText(dataItem)}
              pagHash={pagHash}
            />
          );
        })}
      </div>
    </div>
  );
};
