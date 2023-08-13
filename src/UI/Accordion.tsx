import { motion } from 'framer-motion'

import { styled } from 'lib/style'

import { Flex } from './Box'
import { Icon } from './Icon/Icon'

type AccordionProps = {
  title: string | React.ReactNode
  isOpen: boolean
  onClick: () => void
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  isOpen,
  onClick,
  children,
}) => {
  return (
    <>
      <AccordionTop onClick={() => onClick()}>
        {title}
        <ItemHolder isOpen={isOpen}>
          <Flex css={{ color: '$textPrimary', alignItems: 'center' }}>
            <Icon icon="chevron-down" />
          </Flex>
        </ItemHolder>
      </AccordionTop>
      <Content
        initial={{ height: 0 }}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ ease: 'easeOut', stiffness: 300, damping: 30 }}
      >
        {children}
      </Content>
    </>
  )
}

const AccordionTop = styled(Flex, {
  alignItems: 'center',
  justifyContent: 'space-between',

  width: '100%',
  pb: '$24',
  outline: 'none',

  cursor: 'pointer',
})

const ItemHolder = styled(Flex, {
  alignItems: 'center',
  justifyContent: 'center',

  transition: 'transform $motion',
  transform: 'rotate(0deg)',

  variants: {
    isOpen: {
      true: {
        transform: 'rotate(180deg)',
      },
    },
  },
})

const Content = styled(motion.section, {
  borderBottom: '1px solid $gray200',

  overflow: 'hidden',
})
