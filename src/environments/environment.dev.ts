import { BackendConfig } from 'src/app/core/models/backend/backendConfig';
import { UIConfig } from 'src/app/core/models/uiConfig';

export const environment = {
  name: 'DEV',
  production: false,
  backend: {
    //url: 'http://localhost:5007/', // backend root url
    url: 'https://gate-ext-p33-sdlsn.dev.openshift.local/admin/',
    withCredentials: false, // when using forms or windows authentication
    suppressLoadMetadataOnAppInit: true,
    suppressLoadUserSpecificDataOnAppInit: true,
    suppressCoercedUndefined: true,
    useIsoWithCorrectionForTimezone: true,
    webDAVUrl: 'https://gate-ext-v38-inspekta.dev.openshift.local/webdav-api/',
  } as BackendConfig,
  Ui: {
    floatingLabel: true,
    dateFormat: 'dd.MM.yy',
    shortString: {
      maxLength: 256,
    },
    autoComplete: {
      minSearchLength: 3,
      emptyMessage: 'Nema rezultata',
    },
    defaultButtonStyle: 'primary',
    defaultActionButtonStyle: 'text',
    showButtonLabel: true,
    icons: {
      trashIcon: 'far fa-trash-alt',
      plusIcon: 'fas fa-plus',
      filterIcon: 'fas fa-filter',
      searchIcon: 'fas fa-search fa-2x',
      banIcon: 'fas fa-ban',
    },
  } as UIConfig,
};
