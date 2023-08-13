import React, {
  createContext,
  HTMLAttributes,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import { CSS, styled } from 'lib/style'

import { Stack } from './Stack'

type Variant = 'default' | 'rounded'
type ActivePosition = {
  left: number
  width: number
  top: number
  height: number
}

const TabsContext = createContext<null | {
  variant: Variant
  setActivePosition: (pos: ActivePosition) => void
  direction: 'horizontal' | 'vertical'
}>(null)

type TabsProps = {
  variant?: Variant
  css?: CSS
  direction?: 'horizontal' | 'vertical'
}
export const Tabs: React.FC<TabsProps> = ({
  variant = 'default',
  children,
  direction = 'horizontal',
  css,
}) => {
  const [activePosition, setActivePosition] = useState<null | ActivePosition>(
    null
  )

  return (
    <TabsContext.Provider
      value={{
        variant,
        setActivePosition,
        direction,
      }}
    >
      <StyledTabs
        variant={variant}
        spacing={variant === 'default' ? '24' : '4'}
        direction={direction}
        css={css as any}
      >
        {children}
        {activePosition !== null && (
          <ActiveElement
            variant={variant}
            style={{
              left: `${activePosition.left}px`,
              top: direction === 'vertical' ? `${activePosition.top}px` : '',
              width: `${activePosition.width}px`,
              height:
                direction === 'vertical' ? `${activePosition.height}px` : '',
            }}
          />
        )}
      </StyledTabs>
    </TabsContext.Provider>
  )
}

type TabProps = HTMLAttributes<HTMLButtonElement> & {
  css?: CSS
  isActive: boolean
}

export const Tab: React.FC<TabProps> = ({ isActive, ...props }) => {
  const [lockUpdate, setLockUpdate] = useState(true)
  const ref = useRef<HTMLButtonElement | null>(null)
  const tabContext = useContext(TabsContext)
  const { variant, setActivePosition } = tabContext || {}

  function makeInView() {
    !lockUpdate &&
      isActive &&
      ref?.current?.scrollIntoView?.({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      })
  }

  function updatePosition() {
    if (isActive && ref.current) {
      setActivePosition?.({
        left: ref.current.offsetLeft,
        top: ref.current.offsetTop,
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      })
    }
  }

  useEffect(() => {
    updatePosition()
    makeInView()
  }, [isActive])

  useEffect(() => {
    updatePosition()
  }, [props.children])

  useEffect(() => {
    const timer = setTimeout(() => setLockUpdate(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (!tabContext) {
    throw new Error('tab component needs to be inside tabs component')
  }

  return (
    <StyledTab
      type="button"
      ref={ref}
      variant={variant}
      isActive={isActive}
      {...props}
    />
  )
}

const StyledTabs = styled(Stack, {
  alignItems: 'center',
  position: 'relative',
  width: '100%',

  overflow: 'auto',

  variants: {
    variant: {
      default: {
        boxShadow: 'inset 0 -2px 0 0 $colors$muted',
      },
      rounded: {
        zIndex: '1',

        p: '$4',

        border: '1px solid $muted',
        borderRadius: '$md',

        backgroundColor: '$mutedSoft',
      },
    },
    isActive: {
      true: {},
    },
  },

  defaultVariants: {
    variant: 'default',
  },
})

const ActiveElement = styled('div', {
  position: 'absolute',
  bottom: 0,

  transition: 'left $motion, width $motion,top $motion, height $motion',

  variants: {
    variant: {
      default: {
        backgroundColor: '$primary',

        height: '2px',
      },
      rounded: {
        backgroundColor: '$primary',

        zIndex: '-1',

        top: '$4',
        bottom: '$4',

        borderRadius: '$sm',
      },
    },
  },
})

export const StyledTab = styled('button', {
  appearance: 'none',
  border: 'none',
  backgroundColor: 'transparent',

  cursor: 'pointer',

  outline: 'none',
  whiteSpace: 'nowrap',

  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',

  position: 'relative',

  variants: {
    variant: {
      default: {
        color: '$textSecondary',

        pb: '$12',

        '&:active': {
          color: '$primary',
        },

        '@hover': {
          '&:hover': {
            color: '$primary',
          },
        },

        '&:focus-visible': {
          color: '$primary',
        },
      },
      rounded: {
        width: '100%',

        color: '$textPrimary',

        p: '$4 $24',

        '@hover': {
          '&:hover': {
            color: '$textPrimary',
          },
        },

        '&:focus-visible': {
          boxShadow: '0px 0px 0px 3px $colors$muted',

          borderRadius: '$sm',
        },
      },
    },
    isActive: {
      true: {},
    },
  },

  compoundVariants: [
    {
      variant: 'default',
      isActive: true,
      css: {
        color: '$primary',
        transition: 'color $appearance',
      },
    },
    {
      variant: 'rounded',
      isActive: true,
      css: {
        color: '$textTertiary',
        transition: 'color $appearance',
        borderRadius: '$sm',

        '@hover': {
          '&:hover': {
            color: '$textTertiary',
          },
        },
      },
    },
  ],

  defaultVariants: {
    variant: 'default',
  },
})
