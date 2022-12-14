import { renderSearchFormBlock } from './search/search-form.js';
import { renderSearchStubBlock } from './search/search-results.js';
import { renderUserBlock } from './user/index.js';
import { getLastDayOfNextMonth } from './helpers/date.js';
import { getFavoritesAmount, getUserData } from './localStorage';

window.addEventListener('DOMContentLoaded', () => {
  const { username, iconPath } = getUserData();
  const favoriteItemsAmount = getFavoritesAmount();
  renderUserBlock(username, iconPath, favoriteItemsAmount);

  renderSearchFormBlock(new Date(), getLastDayOfNextMonth());

  renderSearchStubBlock();
});
