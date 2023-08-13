import { InputHTMLAttributes } from 'react'

import { CSS, styled } from 'lib/style'

import { Box } from './Box'
import { Icon } from './Icon/Icon'

type InputRangeProps = InputHTMLAttributes<HTMLInputElement> & {
  containerStyle?: Omit<CSS, 'position'>
} & Omit<React.ComponentProps<typeof StyledInput>, 'max' | 'min' | 'value'> & {
    min: number
    max: number
    value: number
  }

export const InputRange = ({
  value,
  containerStyle,
  onChange,
  max,
  min,
  ...props
}: InputRangeProps): JSX.Element => {
  const range = max - min
  const percentage = ((value - min) * 100) / range

  return (
    <Wrapper css={{ ...containerStyle, position: 'relative' }}>
      <BackgroundTrack>
        <Track
          style={{
            width: `${percentage}%`,
          }}
        />
      </BackgroundTrack>
      <StyledDrag
        style={{
          left: `calc(${percentage}%)`,
          transform: `translateY(-50%) translateX(calc(-${percentage}% + ${
            percentage === 100 ? 1 : 0
          }px))`,
        }}
      >
        <Icon icon="drag" />
      </StyledDrag>
      <StyledInput
        type="range"
        value={value}
        max={max}
        min={min}
        onChange={onChange}
        {...props}
      />
    </Wrapper>
  )
}

const Wrapper = styled(Box, {
  position: 'relative',

  height: '$space$8',
  width: '100%',
})

const BackgroundTrack = styled(Box, {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',

  width: '100%',
  height: '100%',

  backgroundColor: '$muted',
  borderRadius: '$xs',

  outline: 'none',

  '&:focus-visible': {
    boxShadow: '0px 0px 0px 3px $colors$mutedSoft',
  },
})

const Track = styled(Box, {
  backgroundColor: '$primary',

  height: '100%',

  borderRadius: '$xs',
})

const StyledDrag = styled(Box, {
  position: 'absolute',
  top: '50%',

  userSelect: 'none',
  touchAction: 'none',
  pointerEvents: 'none',

  width: '$space$24',
  height: '$space$24',

  color: '$tertiary',

  backgroundColor: '$textTertiary',

  borderRadius: '$pill',

  boxShadow: '$soft',
})

const StyledInput = styled('input', {
  width: '100%',
  height: '$space$28',

  margin: '$0',

  position: 'absolute',
  zIndex: '$1',
  top: '50%',
  transform: 'translateY(-50%)',

  opacity: '0',
})
