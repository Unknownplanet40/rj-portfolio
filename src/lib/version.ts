// src/lib/version.ts
import versionConfig from "../../version.json";

export interface VersionInfo {
  name: string;
  version: string;
  channel: string;
  download_url: string;
}

export const APP_VERSION: string = versionConfig.version ?? "0.1.0";
export const APP_NAME: string = versionConfig.name ?? "rj-portfolio";
export const VERSION_INFO: VersionInfo = versionConfig as VersionInfo;
