export const copyStringToClipboard = (string: string): void => {
  const el = document.createElement('input')
  el.value = string
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}
