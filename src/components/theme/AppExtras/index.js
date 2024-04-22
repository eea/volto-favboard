import {
  FavoritesToolbarButton,
  BasketButton,
  AddToFavBoardButton,
} from './FavoritesToolbarButton';

const config = (config) => {
  config.settings.appExtras = [
    ...(config.settings.appExtras || []),
    {
      match: '',
      component: FavoritesToolbarButton,
    },
    {
      match: '',
      component: BasketButton,
    },
    {
      match: '',
      component: AddToFavBoardButton,
    },
  ];

  return config;
};

export default config;
