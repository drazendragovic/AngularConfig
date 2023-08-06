import { Column } from './column';
import { ColumnConfiguration } from './columnConfiguration';

export class FieldColumnConfiguration<T> extends ColumnConfiguration<T> {
  constructor(config: Column<T>) {
    super(config);
  }

  format(format: (data: any) => string): this {
    this.config.format = format;
    return this;
  }
}
