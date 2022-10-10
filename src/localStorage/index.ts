import { UserInfo } from './interfaces';

export const getUserData = (): UserInfo => {
  const parseString = localStorage.getItem('user');
  if (parseString) return JSON.parse(parseString) as UserInfo;

  return { username: 'Basic User', iconPath: './img/avatar.png' };
};

export const getFavoritesAmount = () => {
  const parseString = localStorage.getItem('favoriteItems');
  if (parseString) return JSON.parse(parseString).length;

  return 0;
};
