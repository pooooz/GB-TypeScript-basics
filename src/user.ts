import { renderBlock } from './lib.js';

export function renderUserBlock(avatarSource: string, favoriteItemsAmount?: number) {
  const favoritesCaption = favoriteItemsAmount || 'ничего нет';
  const hasFavoriteItems = !!favoriteItemsAmount;

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src=${avatarSource} alt="Wade Warren" />
      <div class="info">
          <p class="name">Wade Warren</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `,
  );
}
