import React, { FC } from 'react';
import './slide.scss';
import { IInfo } from '../../models/events';

interface ISlideProps extends IInfo {}

/**
 * Слайд с фактом
 *
 * @param title Год, в котором произошло описанное событие
 * @param description Описание события
 */
export const Slide: FC<ISlideProps> = ({ year, description }) => {
  return (
    <article className={'slide'}>
      <div className='slide-title'>{year}</div>
      <div className='slide-description'>{description}</div>
    </article>
  );
};
