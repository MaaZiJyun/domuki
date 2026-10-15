declare module "lunar-javascript" {
  class Lunar {
    getYearInGanZhiExact(): string;
    getMonthInGanZhiExact(): string;
    getDayInGanZhiExact(): string;
    getTimeInGanZhi(): string;
  }

  export class Solar {
    static fromDate(date: Date): Solar;
    getLunar(): Lunar;
  }
}
