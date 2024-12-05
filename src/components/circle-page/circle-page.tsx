import React, { FC, useEffect, useRef } from 'react';
import { gsap, Sine } from 'gsap';

import style from './circle-pag.module.css';

interface ICirclePag {
  index: number;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  rotatePag: (index: number) => [number, number];
  paginationText: string;
  pagHash: string;
}

/**
 * Точка навигации в форме окружности
 *
 * @param index Индекс точки
 * @param activeIndex Индекс активной точки
 * @param setActiveIndex Диспатч для изменения активной точки
 * @param rotatePag Функция расчета смещения точки для выставления на окружности
 * @param paginationText Текст, располагающийся рядом с активной точкой
 * @param pagHash Хэш для класса pag
 */
const CirclePag: FC<ICirclePag> = ({
  index,
  activeIndex,
  setActiveIndex,
  rotatePag,
  paginationText,
  pagHash
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const animation = (duration: number): void => {
    gsap.to(ref.current, {
      delay: 0.1,
      fontSize: 20
    });
    gsap.to(ref.current, {
      duration,
      opacity: 1,
      ease: Sine.easeInOut
    });
  };

  const hide = (): void => {
    gsap.to(ref.current, {
      duration: 0.2,
      opacity: 0,
      ease: Sine.easeInOut
    });
  };

  useEffect(() => {
    if (activeIndex === index) {
      animation(1);
    } else {
      hide();
    }
  }, [activeIndex, index]);

  return (
    <div>
      <div
        className={`${style.pag_container} pag_${pagHash}`}
        style={{
          left: rotatePag(index)[0],
          top: rotatePag(index)[1]
        }}
      >
        <span
          className={`${style.pag} ${activeIndex === index ? style.active : ''}`}
          onClick={(): void => setActiveIndex(index)}
        >
          {index + 1}
        </span>
        <span ref={ref} className={`${style.pag_text} pag_text`}>
          {paginationText}
        </span>
      </div>
    </div>
  );
};

export default CirclePag;
