import { FieldType } from '@ngx-formly/core';
import { LookupDataSource } from 'src/app/core';

export function initializeDataSource(field: FieldType): LookupDataSource | undefined {
  if (!field.props) return undefined;
  if (!field.props['dataSourceFactory']) return undefined;

  const dataSource = field.props['dataSourceFactory']();

  if (field.props['dataSourceCascadeFilter']) {
    const filter = field.props['dataSourceCascadeFilter'](field.form);
    field.props['lastCascadeFilter'] = filter;
    dataSource.cascadeFilter(filter);
  }

  return dataSource;
}
