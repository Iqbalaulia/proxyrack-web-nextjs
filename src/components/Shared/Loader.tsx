import { motion, Transition } from 'framer-motion'

import { styled } from 'lib/style'

const Wrapper = styled(motion.div, {
  display: 'flex',
  justifyContent: 'space-around',

  width: '$space$32',
  height: '$space$32',
})

const Dots = styled(motion.span, {
  display: 'block',

  width: '$space$8',
  height: '$space$8',

  backgroundColor: '$brand900',
  borderRadius: '$sm',
})

const WrapperVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const DotsVariants = {
  start: {
    y: '50%',
  },
  end: {
    y: '150%',
  },
}

const DotsTransition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: 'reverse',
  ease: 'easeInOut',
}

export const Loader = (): JSX.Element => {
  return (
    <Wrapper variants={WrapperVariants} initial="start" animate="end">
      <Dots variants={DotsVariants} transition={DotsTransition as Transition} />
      <Dots variants={DotsVariants} transition={DotsTransition as Transition} />
      <Dots variants={DotsVariants} transition={DotsTransition as Transition} />
    </Wrapper>
  )
}
