import React, { useCallback } from 'react'

import { Flex, Icon, Text } from 'UI'
import { styled } from 'lib/style'

type PaginationProps = {
  currentPage: number
  totalPages: number
  changePage: (newPage: number) => void
  pageNeighbours?: number
}

export const Dots = (): JSX.Element => <StyledDots>...</StyledDots>

export const Pagination = ({
  currentPage,
  totalPages,
  changePage,
  pageNeighbours = 1,
  ...props
}: PaginationProps): JSX.Element => {
  const renderNumberButtons = useCallback(() => {
    const allPages = new Array(totalPages).fill('')

    let leftDots = currentPage - pageNeighbours - 1
    if (leftDots <= 1) leftDots = 0

    let rightDots = currentPage + pageNeighbours + 1
    if (rightDots >= totalPages) rightDots = Infinity

    return allPages.map((_, i) => {
      const page = i + 1
      const isCurrent = page === currentPage
      if (
        page === 1 ||
        page === totalPages ||
        (page > leftDots && page < rightDots)
      )
        return (
          <NumberButton
            key={page}
            aria-label={`${page}`}
            variant={isCurrent ? 'selected' : 'notSelected'}
            disabled={isCurrent}
            onClick={() => changePage(page)}
          >
            <Text variant="small">{page}</Text>
          </NumberButton>
        )
      if (page === leftDots || page === rightDots) return <Dots key={page} />

      return null
    })
  }, [changePage, currentPage, pageNeighbours, totalPages])

  return (
    <Flex {...props}>
      <StyledArrow
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <Icon icon="arrow-left" />
      </StyledArrow>
      {renderNumberButtons()}
      <StyledArrow
        disabled={currentPage === totalPages || totalPages == 0}
        onClick={() => changePage(currentPage + 1)}
      >
        <Icon icon="arrow-right" />
      </StyledArrow>
    </Flex>
  )
}

const StyledArrow = styled('button', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',

  appearance: 'none',
  border: 'none',
  borderRadius: '$xs',

  backgroundColor: 'transparent',

  cursor: 'pointer',

  color: '$textPrimary',

  p: '$1 $2',

  mx: '3px',

  '&:disabled': {
    cursor: 'not-allowed',
  },
})

const NumberButton = styled('button', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',

  appearance: 'none',
  border: 'none',
  borderRadius: '$xs',

  minWidth: '$space$28',

  cursor: 'pointer',

  color: '$textPrimary',

  p: '$2',

  mx: '3px',

  variants: {
    variant: {
      selected: {
        backgroundColor: '$muted',
      },
      notSelected: {
        backgroundColor: 'transparent',
      },
    },
  },

  '&:disabled': {
    cursor: 'not-allowed',
  },
})

const StyledDots = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',

  backgroundColor: 'transparent',

  borderRadius: '$xs',

  minWidth: '$space$28',

  mx: '3px',
})
