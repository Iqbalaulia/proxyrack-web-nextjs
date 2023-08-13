const iconsMap = {
  'arrow-left': require('./icons/arrow-left.svg'),
  'arrow-right': require('./icons/arrow-right.svg'),
  'arrow-down': require('./icons/arrow-down.svg'),
  'check-color': require('./icons/check-color.svg'),
  'check-contrast': require('./icons/check-contrast.svg'),
  'chevron-down': require('./icons/chevron-down.svg'),
  'chevron-up': require('./icons/chevron-up.svg'),
  drag: require('./icons/drag.svg'),
  close: require('./icons/close.svg'),
  menu: require('./icons/menu.svg'),
  search: require('./icons/search.svg'),
  down: require('./icons/down.svg'),
}

export type IconOptions = keyof typeof iconsMap

export type IconProps = React.HTMLProps<HTMLOrSVGImageElement> & {
  icon: IconOptions
}

export const Icon: React.FC<IconProps> = ({ icon, ...props }) => {
  const IconComponent =
    Object.keys(iconsMap).indexOf(icon) !== -1
      ? iconsMap[icon].ReactComponent || iconsMap[icon].default || null
      : null

  if (!IconComponent) return null

  return <IconComponent {...props} />
}
