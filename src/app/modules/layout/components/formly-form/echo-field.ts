export interface EchoField {
  property: string;
  label: string;
  className?: string;
  formatInput?: (d: any) => string;
  value: any;
}
