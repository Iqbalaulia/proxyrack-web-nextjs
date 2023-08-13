export const formatedPrice = (priceInCents: number): string => {
  const pricePerUnit = priceInCents / 100

  return '$' + pricePerUnit
}

export const formatedPriceCost = (
  priceInCents: number,
  units: number
): string => {
  const pricePerUnit = priceInCents / units
  const roundToTwoDecimals = (Math.ceil(pricePerUnit / 10) / 10).toFixed(2)

  return '$' + roundToTwoDecimals
}

export const formatPriceToLocale = (
  price: number,
  locale = 'en-US'
): string => {
  const priceLocale = price.toLocaleString(locale, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  })

  return priceLocale
}

export const numberToLocale = (number: number, locale = 'en-US'): string => {
  return number.toLocaleString(locale)
}
