import i18next from 'i18next';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import authRoles from '../auth/authRoles';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'divespots',
    title: 'Dive Spots',
    type: 'item',
    url: '/divespots',
  },
  {
    id: 'sealives',
    title: 'Sealife',
    type: 'item',
    url: '/sealives',
  },
  {
    id: 'reviews',
    title: 'Reviews',
    type: 'item',
    url: '/reviews',
  }
];

export default navigationConfig;
