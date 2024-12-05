import mockData from './mock-data.json';

interface IEventsData {
  year: string;
  description: string;
  type: string;
}

export const getEventsList = (): Promise<IEventsData[]> => {
  return new Promise((resolve) => {
    resolve(mockData);
  });
};
