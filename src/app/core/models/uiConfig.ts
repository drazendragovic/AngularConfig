import { TableOptions } from 'src/app/modules/layout/interfaces/tableOptions';
import { AutoCompleteConfig } from './autoCompleteConfig';
import { ShortStringConfig } from './shortStringConfig';
import { ButtonStyle, ButtonType } from './uiAction';

export interface UIConfig {
  floatingLabel: boolean;
  shortString: ShortStringConfig;
  autoComplete: AutoCompleteConfig;
  dateFormat: string;
  defaultButtonStyle: string;
  defaultActionButtonStyle: ButtonStyle;
  showButtonLabel: boolean;
  defaultTableActionButtonStyle: ButtonStyle;
  defaultTableActionButtonType: ButtonType;
  tableOptions: TableOptions;
  icons: {
    trashIcon: string;
    filterIcon: string;
    searchIcon: string;
    plusIcon: string;
    banIcon: string;
  };
}
