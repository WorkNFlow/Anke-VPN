import { useState, useEffect } from 'react';
import { OFFICIAL_LINKS } from '../data/vpnData';

export type DetectedOS = 'macos' | 'windows' | 'ios' | 'android' | 'linux' | 'unknown';

export interface UserOSInfo {
  os: DetectedOS;
  name: string;             // 'macOS', 'Windows', 'iOS', 'Android', 'Linux'
  buttonText: string;       // 'Скачать для macOS', 'Скачать для Windows', etc.
  downloadUrl: string;      // Direct installer or official store URL
  isExternalStore: boolean; // Opens in new tab vs direct file download
  versionTag?: string;      // e.g. 'v2.83', 'App Store'
}

export function detectUserOS(): UserOSInfo {
  if (typeof window === 'undefined') {
    return {
      os: 'macos',
      name: 'macOS',
      buttonText: 'Скачать для macOS',
      downloadUrl: OFFICIAL_LINKS.appStore,
      isExternalStore: true,
      versionTag: 'Mac App Store',
    };
  }

  const ua = window.navigator.userAgent.toLowerCase();
  const platform =
    (window.navigator as unknown as { userAgentData?: { platform?: string } })
      ?.userAgentData?.platform?.toLowerCase() ||
    window.navigator.platform?.toLowerCase() ||
    '';

  // 1. iOS (iPhone, iPad, iPod, or iPadOS on Safari)
  if (
    /iphone|ipad|ipod/.test(ua) ||
    (platform === 'macintel' && window.navigator.maxTouchPoints > 1)
  ) {
    return {
      os: 'ios',
      name: 'iOS',
      buttonText: 'Скачать для iOS',
      downloadUrl: OFFICIAL_LINKS.appStore,
      isExternalStore: true,
      versionTag: 'App Store',
    };
  }

  // 2. Android
  if (/android/.test(ua)) {
    return {
      os: 'android',
      name: 'Android',
      buttonText: 'Скачать для Android',
      downloadUrl: OFFICIAL_LINKS.googlePlay,
      isExternalStore: true,
      versionTag: 'Google Play',
    };
  }

  // 3. macOS
  if (/macintosh|mac os x/.test(ua) || platform.includes('mac')) {
    return {
      os: 'macos',
      name: 'macOS',
      buttonText: 'Скачать для macOS',
      downloadUrl: OFFICIAL_LINKS.appStore,
      isExternalStore: true,
      versionTag: 'Mac App Store',
    };
  }

  // 4. Windows
  if (/windows|win32|win64/.test(ua) || platform.includes('win')) {
    return {
      os: 'windows',
      name: 'Windows',
      buttonText: 'Скачать для Windows',
      downloadUrl: OFFICIAL_LINKS.windowsMsiX64,
      isExternalStore: false,
      versionTag: '.msi x64',
    };
  }

  // 5. Linux
  if (/linux/.test(ua) || platform.includes('linux')) {
    return {
      os: 'linux',
      name: 'Linux',
      buttonText: 'Скачать для Linux',
      downloadUrl: OFFICIAL_LINKS.linuxDeb,
      isExternalStore: false,
      versionTag: '.deb',
    };
  }

  // 6. Fallback
  return {
    os: 'unknown',
    name: 'устройства',
    buttonText: 'Скачать клиент',
    downloadUrl: '#platforms',
    isExternalStore: false,
    versionTag: 'Все платформы',
  };
}

export function useUserOS(): UserOSInfo {
  const [osInfo, setOsInfo] = useState<UserOSInfo>(() => detectUserOS());

  useEffect(() => {
    setOsInfo(detectUserOS());
  }, []);

  return osInfo;
}

