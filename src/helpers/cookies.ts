/* eslint-disable no-useless-escape */
export function getCookie(name: string) {
  const matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string, maxAge: number) {
  const options = {
    path: '/',
    secure: true,
    'max-age': maxAge
  };

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  let optionKey: keyof typeof options;

  for (optionKey in options) {
    updatedCookie += "; " + optionKey;
    const optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, "", -1)
}