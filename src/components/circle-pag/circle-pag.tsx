import React, { FC, useEffect, useRef } from 'react';
import { gsap, Sine } from 'gsap';

import './circle-pag.scss';

interface ICirclePagProps {
  index: number;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  rotatePag: (index: number) => [number, number];
  paginationText: string;
}

/**
 * Точка навигации в форме окружности
 *
 * @param index Индекс точки
 * @param activeIndex Индекс активной точки
 * @param setActiveIndex Функция для изменения активной точки
 * @param rotatePag Функция расчета смещения точки для выставления на окружности
 * @param paginationText Текст, располагающийся рядом с активной точкой
 */
const CirclePag: FC<ICirclePagProps> = ({
  index,
  activeIndex,
  setActiveIndex,
  rotatePag,
  paginationText
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Анимация активной точки
  const animateActivePoint = (duration: number): void => {
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

  const hidePoint = (): void => {
    gsap.to(ref.current, {
      duration: 0.2,
      opacity: 0,
      ease: Sine.easeInOut
    });
  };

  useEffect(() => {
    if (activeIndex === index) {
      animateActivePoint(1);
    } else {
      hidePoint();
    }
  }, [activeIndex, index]);

  return (
    <div
      className={'circle-pag-container pag'}
      style={{
        left: rotatePag(index)[0],
        top: rotatePag(index)[1]
      }}
    >
      <span
        className={`circle-pag ${activeIndex === index ? 'active' : ''}`}
        onClick={(): void => setActiveIndex(index)}
      >
        {index + 1}
      </span>
      <span ref={ref} className='pag_text'>
        {paginationText}
      </span>
    </div>
  );
};

export default CirclePag;
