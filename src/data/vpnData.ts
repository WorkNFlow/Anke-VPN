export interface OfficialServer {
  id: string;
  country: string;
  city: string;
  flagUrl: string;
  tag?: {
    name: string;
    note: string;
  };
}

export interface OfficialTerm {
  months: number;
  label: string;
  priceDisplay: string;
  perMonthDisplay: string;
  discountPercent: number;
}

export interface MantleBenchmarkRow {
  id: string;
  metric: string;
  subtitle: string;
  iphone: {
    label: string;
    mantlePercent: number;
    vlessPercent: number;
  };
  android: {
    label: string;
    mantlePercent: number;
    vlessPercent: number;
  };
}

// 8 Verified Official Production Servers from anke.dev/vnp/ru/servers
export const OFFICIAL_SERVERS: OfficialServer[] = [
  {
    id: 'de-nue',
    country: 'Германия',
    city: 'Нюрнберг',
    flagUrl: '/countries/de.png',
  },
  {
    id: 'fi-hel',
    country: 'Финляндия',
    city: 'Хельсинки',
    flagUrl: '/countries/fi.png',
  },
  {
    id: 'pl-waw',
    country: 'Польша',
    city: 'Варшава',
    flagUrl: '/countries/pl.png',
  },
  {
    id: 'nl-ams',
    country: 'Нидерланды',
    city: 'Амстердам',
    flagUrl: '/countries/nl.png',
  },
  {
    id: 'ie-dub',
    country: 'Ирландия',
    city: 'Дублин',
    flagUrl: '/countries/ireland.png',
  },
  {
    id: 'al-tia',
    country: 'Албания',
    city: 'Тирана',
    flagUrl: '/countries/albania.png',
    tag: {
      name: 'YouTube',
      note: 'без рекламы',
    },
  },
  {
    id: 'us-chi',
    country: 'США',
    city: 'Чикаго',
    flagUrl: '/countries/us.png',
  },
  {
    id: 'hk-hkg',
    country: 'Гонконг',
    city: 'Гонконг',
    flagUrl: '/countries/hk.png',
  },
];

export const MANTLE_BENCHMARKS: MantleBenchmarkRow[] = [
  {
    id: 'energy',
    metric: 'Энергия',
    subtitle: '4 часа обычного использования',
    iphone: {
      label: 'в 6,4 раза меньше',
      mantlePercent: 15.6,
      vlessPercent: 100,
    },
    android: {
      label: 'в 3,8 раза меньше',
      mantlePercent: 26.3,
      vlessPercent: 100,
    },
  },
  {
    id: 'cpu-idle',
    metric: 'Процессор в простое',
    subtitle: 'VPN включён, трафика нет',
    iphone: {
      label: 'в 15,8 раза меньше',
      mantlePercent: 6.5,
      vlessPercent: 100,
    },
    android: {
      label: 'в 6,9 раза меньше',
      mantlePercent: 14.5,
      vlessPercent: 100,
    },
  },
  {
    id: 'cpu-1gb',
    metric: 'Процессор на 1 ГБ',
    subtitle: 'трафика',
    iphone: {
      label: 'в 4,1 раза меньше',
      mantlePercent: 24.4,
      vlessPercent: 100,
    },
    android: {
      label: 'в 2,9 раза меньше',
      mantlePercent: 34.5,
      vlessPercent: 100,
    },
  },
  {
    id: 'memory',
    metric: 'Память туннеля VPN',
    subtitle: 'оперативная память',
    iphone: {
      label: '5 МБ против ≈50',
      mantlePercent: 10,
      vlessPercent: 100,
    },
    android: {
      label: '21 МБ против 103',
      mantlePercent: 20.4,
      vlessPercent: 100,
    },
  },
  {
    id: 'page-load',
    metric: 'Время открытия сайтов',
    subtitle: 'медиана по 40 сайтам',
    iphone: {
      label: 'в 2,2 раза быстрее',
      mantlePercent: 45.4,
      vlessPercent: 100,
    },
    android: {
      label: 'в 2,1 раза быстрее',
      mantlePercent: 47.6,
      vlessPercent: 100,
    },
  },
];

// CIS / RU Pricing: Exactly 1 option (199 ₽ / month)
export const CIS_PRICING_TERMS: OfficialTerm[] = [
  {
    months: 1,
    label: '1 месяц',
    priceDisplay: '199 ₽',
    perMonthDisplay: '199 ₽',
    discountPercent: 0,
  },
];

// International Pricing: 4 options ($3.49, $9.99, $18.99, $36.99)
export const GLOBAL_PRICING_TERMS: OfficialTerm[] = [
  {
    months: 1,
    label: '1 месяц',
    priceDisplay: '$3.49',
    perMonthDisplay: '$3.49',
    discountPercent: 0,
  },
  {
    months: 3,
    label: '3 месяца',
    priceDisplay: '$9.99',
    perMonthDisplay: '$3.33',
    discountPercent: 3,
  },
  {
    months: 6,
    label: '6 месяцев',
    priceDisplay: '$18.99',
    perMonthDisplay: '$3.16',
    discountPercent: 5,
  },
  {
    months: 12,
    label: '12 месяцев',
    priceDisplay: '$36.99',
    perMonthDisplay: '$3.08',
    discountPercent: 10,
  },
];

export const OFFICIAL_LINKS = {
  appLogin: 'https://anke.dev/vpn/app',
  appStore: 'https://apps.apple.com/app/id6801846586',
  googlePlay: 'https://play.google.com/store/apps/details?id=net.ankevp.app',
  microsoftStore: 'https://apps.microsoft.com/detail/9mt3n3d67rm4',
  windowsMsiX64: 'https://anke.dev/downloads/ankeconnect_v2.83_setup.msi',
  windowsMsiArm64: 'https://anke.dev/downloads/ankeconnect_v2.83_setup_arm64.msi',
  linuxAppImage: 'https://anke.dev/downloads/AnkeConnect.AppImage',
  linuxDeb: 'https://anke.dev/downloads/ankeconnect_v2.83.deb',
  linuxRpm: 'https://anke.dev/downloads/ankeconnect_v2.83.rpm',
  telegramSupport: 'https://t.me/anke_support',
  emailSupport: 'mailto:support@anke.dev',
  pricingPage: 'https://anke.dev/vnp/ru/pricing',
  privacyPage: 'https://anke.dev/vnp/ru/privacy',
  termsPage: 'https://anke.dev/vnp/ru/terms',
  refundPage: 'https://anke.dev/vnp/ru/refund',
  ankeLabs: 'https://ankelabs.com/',
};
