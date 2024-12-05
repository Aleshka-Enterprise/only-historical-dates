import React, { useEffect, useRef, useState } from 'react';
import { Swiper as SwiperClass } from 'swiper/types';
import { Circ, gsap } from 'gsap';
import styles from './historical-dates.module.css';
import { CirclePagination } from '../../components/circle-pagination/circle-pagination';
import LineDotsPagination from '../../components/line-dots-pagination/line-dots-pagination';
import YearItems from '../../components/year-items/year-item';
import PagNavigation from '../../components/page-navigation/page-navigation';
import { Slide } from '../../components/slide/slide';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import uuid from 'react-uuid';
import { mockData } from '../../utils/mock-data';

interface IPrevState {
  firstYear: string
  secondYear: string
}

interface ISwiperState {
  isBeginning: boolean
  isEnd?: boolean
}

const SWIPER_BREAKPOINTS = {
  1200: { slidesPerView: 3, spaceBetween: 80 },
  820: { slidesPerView: 2, spaceBetween: 80 },
  650: { slidesPerView: 3, spaceBetween: 50 },
  512: { slidesPerView: 2, spaceBetween: 50 }
};

const pageWidth = window.innerWidth;

const slideHash = uuid();

/**
 * Представление 'Исторические даты'
 */
export const HistoricalDates = (): React.ReactElement => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [prevYears, setPrevYears] = useState<IPrevState>();
  const [swiper, setSwiper] = useState<SwiperClass>();
  const [swiperState, setSwiperState] = useState<ISwiperState>({ isBeginning: true });
  const ref = useRef<SwiperRef>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const changeInfo = (slideHash: string): void => {
    gsap
      .timeline()
      .to(`.slide_${slideHash}`, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: Circ.easeInOut
      })
      .to(`.slide_${slideHash}`, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: Circ.easeOut
      });
  };

  useEffect(() => {
    if (ref?.current?.swiper) {
      setSwiper(ref?.current?.swiper);
    }
  }, [ref, swiper]);

  useEffect(() => {
    setPrevYears({
      firstYear: mockData[activeIndex].firstYear,
      secondYear: mockData[activeIndex].secondYear
    });
    changeInfo(slideHash);
  }, [activeIndex]);

  return (
    <div className={`${styles.grid_container}`}>
      <div className={styles.container} ref={gridRef}>
      {pageWidth > 820
        ? (
          <CirclePagination
            data={mockData}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            gridRef={gridRef}
          />
          )
        : (
          <div className={styles.pagination_container}>
            <LineDotsPagination data={mockData} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
          </div>
          )}
        <div className={styles.content}>
          <h1 className={styles.title}>Исторические даты</h1>
          <YearItems
            startYear={mockData[activeIndex].firstYear}
            endYear={mockData[activeIndex].secondYear}
            previousStartYear={typeof prevYears?.firstYear === 'string' ? prevYears.firstYear : '0'}
            previousEndYear={typeof prevYears?.secondYear === 'string' ? prevYears.secondYear : '0'}
          />
        </div>
        <span className={styles.line}></span>
        <div className={styles.navigation}>
          <PagNavigation
            activeIndex={activeIndex}
            dataLength={mockData.length}
            setActiveIndex={setActiveIndex}
          />
        </div>
        <div className={styles.swiper}>
          <button
            className={`swiper-button-prev ${swiperState.isBeginning ? 'disable' : ''}`}
            onClick={(): void => {
              if (swiper) {
                swiper.slidePrev();
              }
            }}
          ></button>
          <Swiper
            ref={ref}
            slidesPerView={1.4}
            spaceBetween={25}
            onSlideChange={(): void => {
              swiper?.update();
              if (swiper) {
                setSwiperState({ isEnd: swiper?.isEnd, isBeginning: swiper?.isBeginning });
              }
            }}
            breakpoints={SWIPER_BREAKPOINTS}
          >
            <>
              {mockData[activeIndex].info.map((dataItem, index): React.ReactElement => {
                return (
                  <SwiperSlide key={index}>
                    <Slide
                      year={dataItem.year}
                      description={dataItem.description}
                      slideHash={slideHash}
                    />
                  </SwiperSlide>
                );
              })}
            </>
          </Swiper>
          <button
            className={`swiper-button-next ${swiperState.isEnd ? 'disable' : ''}`}
            onClick={(): void => {
              if (swiper) {
                swiper.slideNext();
              }
            }}
          ></button>
        </div>
      </div>
    </div>
  );
};
