interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  newDate(): Date;
  compareInDays(start_date: Date, end_date: Date): number;
  addDays(days: number): Date;
}

export { IDateProvider };
