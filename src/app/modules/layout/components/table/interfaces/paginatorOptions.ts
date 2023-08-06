export interface PaginatorOptions {
  defaultRows: number;
  rowsPerPageOptions: number[];
  showCurrentPageReport: boolean;
  currentPageReportTemplate: string;
}

export const DefaultPaginatorOptions: PaginatorOptions = {
  rowsPerPageOptions: [10, 20, 50],
  defaultRows: 10,
  showCurrentPageReport: true,
  currentPageReportTemplate: '{first} - {last} od {totalRecords} zapisa',
};
