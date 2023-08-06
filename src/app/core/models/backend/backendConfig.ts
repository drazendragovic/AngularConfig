export interface BackendConfig {
  url: string;
  withCredentials?: boolean;
  delete404OK?: boolean;
  timeout?: number;
  getDelay?: number;
  saveDelay?: number;
  suppressCoercedUndefined?: boolean;
  suppressLoadMetadataOnAppInit?: boolean;
  suppressLoadUserSpecificDataOnAppInit?: boolean;
  useMsDate?: boolean;
  useIsoWithCorrectionForTimezone?: boolean;
  webDAVUrl: string;
}
