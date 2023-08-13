import {
  lightTheme,
  darkTheme,
  lightThemeForBlock,
  transparentThemeForBlock,
} from 'lib/style'

type ThemeProps = {
  theme:
    | 'light'
    | 'dark'
    | 'transparentForBlock'
    | 'lightForBlock'
    | 'darkForBlock'
}

export const Theme: React.FC<ThemeProps> = ({ theme = 'light', ...props }) => {
  const themes = {
    light: lightTheme,
    dark: darkTheme,

    lightForBlock: lightThemeForBlock,
    darkForBlock: darkTheme,
    transparentForBlock: transparentThemeForBlock,
  }
  return <div className={themes[theme]} {...props} />
}
