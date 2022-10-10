import { renderSearchFormBlock } from './search-form.js';
import { renderSearchStubBlock } from './search-results.js';
import { renderUserBlock } from './user.js';
import { renderToast } from './lib.js';
import { getLastDayOfNextMonth } from './helpers/date.js';

import { book, search } from './services/booking.js';

window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock('./img/avatar.png', 0);
  renderSearchFormBlock(new Date(), getLastDayOfNextMonth());
  renderSearchStubBlock();
  renderToast(
    { text: 'Это пример уведомления. Используйте его при необходимости', type: 'success' },
    { name: 'Понял', handler: () => { console.log('Уведомление закрыто'); } },
  );
});

const checkInDate = new Date();
const checkOutDate = new Date();
checkOutDate.setDate(checkOutDate.getDate() + 2);

console.log(checkInDate.getTime(), checkOutDate.getTime());

search(checkInDate, checkOutDate, 2800)
  .then((results) => {
    console.log('places length', results.length);

    const place = results[0];
    book(place.id, checkInDate, checkOutDate)
      .then((result) => {
        console.log('booked', result.bookedDates);

        search(checkInDate, checkOutDate)
          .then((data) => {
            console.log('places length', data.length);
          });
      });
  });
