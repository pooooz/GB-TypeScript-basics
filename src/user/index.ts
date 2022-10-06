import { renderBlock } from '../helpers/renderBlock.js';

export function renderUserBlock(
  username: string,
  avatarSource: string,
  favoriteItemsAmount?: number,
) {
  const favoritesCaption = favoriteItemsAmount || 'ничего нет';
  const hasFavoriteItems = !!favoriteItemsAmount;

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src=${avatarSource} alt="Wade Warren" />
      <div class="info">
          <p class="name">${username}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `,
  );
}
