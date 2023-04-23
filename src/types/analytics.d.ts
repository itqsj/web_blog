//Region
export interface RegionAnalyticsInt {
  region: string;
  users: number;
}

export interface RegionInt {
  name: string;
  ename?: string;
  value?: number;
}

export interface TooltipInt {
  seriesName: string;
  name: string;
  value: string;
}

export interface EchartsInt {
  resize: () => void;
}
