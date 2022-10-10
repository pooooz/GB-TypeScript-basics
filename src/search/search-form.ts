import { renderBlock } from '../helpers/renderBlock.js';
import { getFormattedDate } from '../helpers/date.js';
import { renderSearchResultsBlock } from './search-results.js';
import { parseSearchForm } from './parseSearchForm.js';
import { getResults } from './getResults.js';
import { search } from '../services/booking.js';
import { renderToast } from '../toast';
import { BookingItem } from '../services/interfaces';

const FROM_CLASS_NAME = 'search-form';
export function renderSearchFormBlock(dateFrom: Date, dateTo: Date) {
  const formattedDateFrom = getFormattedDate(dateFrom);
  const minFormattedDateFrom = getFormattedDate(new Date(dateFrom.setDate(dateFrom.getDate() + 1)));
  const formattedDateTo = getFormattedDate(dateTo);
  renderBlock(
    'search-form-block',
    `
    <form class=${FROM_CLASS_NAME}>
      <fieldset class="search-fieldset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value=${formattedDateFrom} min=${formattedDateFrom} max=${formattedDateTo} name="arrival" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value=${minFormattedDateFrom} min=${minFormattedDateFrom} max=${formattedDateTo} name="departure" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="number" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `,
  );

  (document.querySelector('.search-form') as HTMLFormElement).onsubmit = async (event) => {
    event.preventDefault();
    try {
      const { arrival, departure, maxPrice } = getResults(parseSearchForm());

      const results = await search(arrival, departure, maxPrice > 0 ? maxPrice : null);

      renderSearchResultsBlock(results as Array<BookingItem>);
    } catch (error) {
      if (error instanceof Error) {
        renderToast({ text: error.message, type: 'error' });
      }
    }
  };
}
