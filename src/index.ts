import { renderSearchFormBlock } from './search-form.js';
import { renderSearchStubBlock } from './search-results.js';
import { renderUserBlock } from './user.js';
import { renderToast } from './lib.js';
import { getLastDayOfNextMonth } from './helpers/date.js';

window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock('./img/avatar.png', 0);
  renderSearchFormBlock(new Date(), getLastDayOfNextMonth());
  renderSearchStubBlock();
  renderToast(
    { text: 'Это пример уведомления. Используйте его при необходимости', type: 'success' },
    { name: 'Понял', handler: () => { console.log('Уведомление закрыто'); } },
  );
});
