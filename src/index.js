import { FavBoardView, FavBoardListingView } from './components';

import { basket, boards } from './reducers';
// import installAppExtras from './components/theme/AppExtras';

const applyConfig = (config) => {
  // Routes
  config.addonRoutes = [
    ...config.addonRoutes,
    {
      path: '/boards/boardview',
      component: FavBoardView,
    },
    {
      path: '/boards',
      component: FavBoardListingView,
    },
  ];

  config.settings.nonContentRoutes = [
    ...config.settings.nonContentRoutes,
    '/boards/boardview',
    '/boards',
  ];

  // Persistent reducers
  config.settings.persistentReducers = ['basket'];

  // addonReducers
  config.addonReducers = {
    ...(config.addonReducers || {}),
    basket,
    boards,
  };

  return config;
};

export default applyConfig;
