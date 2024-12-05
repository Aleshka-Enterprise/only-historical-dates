import React, { FC } from 'react';
import style from './slide.module.css';
import { IInfo } from '../../models/events';

interface ISlideProps extends IInfo {
  slideHash: string;
}

/**
 * Слайды с фактом
 *
 * @param title Год, в котором произошло описанное событие
 * @param description Описание события
 * @param slideHash Хэш для класса slide
 */
export const Slide: FC<ISlideProps> = ({ year, description, slideHash }): React.ReactElement => {
  return (
    <article className={`slide_${slideHash}`}>
      <div className={style.title}>{year}</div>
      <div className={style.description}>{description}</div>
    </article>
  );
};
