import { HTMLAttributes } from 'react'
import ContentLoader from 'react-content-loader'

export const CardLoader = (
  props: HTMLAttributes<HTMLDivElement>
): JSX.Element => {
  return (
    <div {...props}>
      <ContentLoader
        backgroundColor="hsla(252, 40%, 96%, 1)"
        foregroundColor="hsla(251, 41%, 92%, 1)"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        height="100%"
        width="100%"
      >
        <rect x="0" y="0" width="100" height="64" />
        <rect x="0" y="68" rx="1" ry="1" width="20" height="2" />
        <rect x="0" y="74" rx="2" ry="2" width="80" height="4" />
        <rect x="0" y="82" rx="2" ry="2" width="10" height="4" />
        <rect x="12" y="82" rx="2" ry="2" width="10" height="4" />
        <rect x="24" y="82" rx="2" ry="2" width="10" height="4" />
        <rect x="0" y="90" rx="1" ry="1" width="25" height="2" />
      </ContentLoader>
    </div>
  )
}
