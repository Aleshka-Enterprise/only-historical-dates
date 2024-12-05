import React from 'react';
import { HistoricalDates } from './views/historical-dates/historical-dates';

import 'swiper/css';
import 'swiper/css/navigation';
import './app.css';

const App = (): React.ReactElement => {
  return (
    <>
      <HistoricalDates />
    </>
  );
};

export default App;
