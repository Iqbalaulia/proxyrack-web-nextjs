import { Fragment } from 'react'

export const textByLine = (
  string: string,
  renderLine: (line: string, index: number, totalLength: number) => JSX.Element
): JSX.Element[] => {
  const split = string.split('\n')
  return split.map((line, i) => (
    <Fragment key={i}>{renderLine(line, i, split.length)}</Fragment>
  ))
}

export function isNumeric(str: string | unknown): boolean {
  if (typeof str === 'number') return true
  if (typeof str !== 'string') return false
  return (
    !isNaN(str as unknown as number) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ) // ...and ensure strings of whitespace fail
}

export const slugify = (text?: string): string => {
  if (!text || typeof text !== 'string') return ''

  return text
    .replace(/\s|_|\(|\)/g, '-')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^\w-]+/g, '')
    .trim()
    .toLowerCase()
}
