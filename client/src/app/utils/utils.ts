export function getCookie(key: string) {
  const cookie = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
  return cookie ? cookie.pop() : '';
}

export function currencyFormat(amount: number) {
  return `$` + (amount / 100).toFixed(2);
}
