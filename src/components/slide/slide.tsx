import React, { FC } from 'react';
import './slide.scss';
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
      <div className='slide-title'>{year}</div>
      <div className='slide-description'>{description}</div>
    </article>
  );
};
