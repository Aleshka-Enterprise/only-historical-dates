import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './year-item.module.css';
import { Circ, gsap } from 'gsap';

interface IYearItemsProps {
  startYear: string;
  endYear: string;
  previousStartYear?: string;
  previousEndYear?: string;
}

/**
 * Компонент для отображения годов начала и конца событий
 *
 * @param startYear - Год начала событий
 * @param endYear - Год конца событий
 * @param previousStartYear - Предыдущий год начала событий
 * @param previousEndYear - Предыдущий год конца событий
 */
const YearItems: FC<IYearItemsProps> = ({
  startYear,
  endYear,
  previousStartYear,
  previousEndYear
}) => {
  const [startYearElement, setStartYearElement] = useState<HTMLSpanElement>();
  const [endYearElement, setEndYearElement] = useState<HTMLSpanElement>();
  const startYearRef = useRef<HTMLSpanElement>(null);
  const endYearRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (startYearRef.current) {
      setStartYearElement(startYearRef.current);
    }
    if (endYearRef.current) {
      setEndYearElement(endYearRef.current);
    }
  }, []);

  const animateYearChange = (element?: HTMLSpanElement, previousYear?: string): void => {
    if (element && previousYear) {
      gsap.from(element, {
        textContent: previousYear,
        duration: 1.5,
        ease: Circ.easeOut,
        snap: { textContent: 1 }
      });
    }
  };

  useEffect(() => {
    animateYearChange(startYearElement, previousStartYear);
    animateYearChange(endYearElement, previousEndYear);
  }, [startYear, endYear]);

  return (
    <div className={styles.yearContainer}>
      <span ref={startYearRef} className={styles.year}>
        {startYear}
      </span>
      <span ref={endYearRef} className={styles.year}>
        {endYear}
      </span>
    </div>
  );
};

export default YearItems;
