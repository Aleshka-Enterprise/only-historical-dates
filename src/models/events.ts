export interface IInfo {
  year: string;
  description: string;
};

export interface IData {
    firstYear: string;
    secondYear: string;
    info: IInfo[];
    paginationText?: string;
};
