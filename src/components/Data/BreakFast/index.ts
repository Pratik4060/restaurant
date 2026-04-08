export * from './menuTypes';
export * from './coreData';
export * from './beveragesData';
export * from './healthData';
export * from './quickBitesData';

import { coreItems } from './coreData';
import { beverageItems } from './beveragesData';
import { healthItems } from './healthData';
import { quickBiteItems } from './quickBitesData';

export const menuItems = [
  ...coreItems,
  ...beverageItems,
  ...healthItems,
  ...quickBiteItems,
];
