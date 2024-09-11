const formatNum = new Intl.NumberFormat('ru-RU', { currency: 'RUB', style: 'currency' })
export function currency (value) {
  return formatNum.format(value)
}
