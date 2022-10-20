import { renderBlock } from '../helpers/renderBlock.js';
import { BookingItem } from '../services/interfaces';
import { BookingItemLocalStorage, SortValues } from './interfaces';

// Bad implementation but I have to hurry

export function renderSearchStubBlock() {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `,
  );
}

export function renderEmptyOrErrorSearchBlock(reasonMessage: string) {
  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `,
  );
}

const toggleFavoriteItem = (
  target: HTMLLIElement,
  id: number | string,
  name: string,
  image: string,
) => {
  const attempt = localStorage.getItem('favoriteItems');
  const favoriteItems: Array<BookingItemLocalStorage> | null = attempt ? JSON.parse(attempt) : null;

  if (!target.classList.contains('active')) {
    target.classList.toggle('active');

    if (favoriteItems) {
      const sameId = favoriteItems.find((elem) => elem.id === id);

      if (!sameId) {
        const newValue = [...favoriteItems, {
          id, name, image,
        }];
        localStorage.setItem('favoriteItems', JSON.stringify(newValue));
      }
    } else {
      localStorage.setItem('favoriteItems', JSON.stringify([{
        id, name, image,
      }]));
    }
  } else {
    target.classList.toggle('active');

    if (favoriteItems) {
      const newValue = favoriteItems.filter((elem) => id !== elem.id);
      localStorage.setItem('favoriteItems', JSON.stringify(newValue));
    }
  }
};

const createBookingItem = ({
  id, name, description, price, image, remoteness,
}: BookingItem) => {
  const elem = document.createElement('li');

  const attempt = localStorage.getItem('favoriteItems');
  const favoriteItems: Array<BookingItemLocalStorage> | null = attempt ? JSON.parse(attempt) : null;
  const sameId = favoriteItems?.find((item) => item.id === id);

  elem.innerHTML = `
    <div class="result-container" data-id=${id}>
      <div class="result-img-container">
        <div class="favorites ${sameId ? 'active' : ''}"></div>
        <img class="result-img" src=${image} alt="">
      </div>
      <div class="result-info">
        <div class="result-info--header">
          <p>${name}</p>
          <p class="price">${price}&#8381;</p>
        </div>
        <div class="result-info--map"><i class="map-icon"></i> ${remoteness} км от вас</div>
        <div class="result-info--descr">${description}</div>
        <div class="result-info--footer">
          <div>
            <button>Забронировать</button>
          </div>
        </div>
      </div>
    </div>
  `;
  elem.classList.add('result');

  elem.addEventListener('click', (event) => {
    const target = (event.target as HTMLLIElement);
    if (target.classList.contains('favorites')) {
      toggleFavoriteItem(target, id, name, image);
    }
  });

  return elem;
};

function renderSortedList <ListItem extends BookingItem>(
  target: HTMLElement,
  data: Array<ListItem>,
  sortBy?: SortValues,
) {
  const result: Array<string> = [];
  data.sort((a, b) => {
    if (sortBy) {
      switch (sortBy) {
      case 'cheap':
        return a.price - b.price;
      case 'expensive':
        return b.price - a.price;
      case 'near':
        return a.remoteness - b.remoteness;
      default:
        return 1;
      }
    }
    return 1;
  }).forEach((elem) => {
    const l = createBookingItem(elem);
    result.push(l.outerHTML);
  });
  target.innerHTML = result.join('');
}

export const renderSearchResultsBlock = (results: Array<BookingItem>) => {
  renderBlock(
    'search-results-block',
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select class="sort-select">
                <option value="cheap">Сначала дешёвые</option>
                <option value="expensive" selected>Сначала дорогие</option>
                <option value="near">Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list"></ul>
    `,
  );

  const resultsList = document.querySelector('.results-list') as HTMLUListElement;

  (document.querySelector('.sort-select') as HTMLSelectElement)
    .addEventListener('change', (event) => {
      renderSortedList(
        resultsList,
        results,
        (event.target as HTMLSelectElement).value as SortValues,
      );
    });

  renderSortedList(resultsList, results, 'expensive');
};
