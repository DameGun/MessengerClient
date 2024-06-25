/* eslint-disable no-useless-escape */

interface CookieOptions {
  path: string;
  'max-age': number;
  secure: boolean;
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie<T extends CookieOptions>(name: string, value: string, options: T) {
  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  let optionKey: keyof typeof options;

  for (optionKey in options) {
    updatedCookie += '; ' + optionKey.toString();
    const optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent('');

  updatedCookie += '; ' + 'max-age=1';

  document.cookie = updatedCookie;
}
