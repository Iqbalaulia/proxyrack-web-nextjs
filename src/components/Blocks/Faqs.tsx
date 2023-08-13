import { useMemo, useState } from 'react'

import { Accordion, Box, Container, Flex, Text } from 'UI'
import { FaqsEntryStoryblok, FaqsStoryblok } from 'common/types'
import { CMSRichTextField } from 'components/Shared/CMSRichTextField'
import { styled } from 'lib/style'

import { Editable } from './Editable'

type FaqsProps = {
  block: FaqsStoryblok
}

export const Faqs = ({ block, ...props }: FaqsProps): JSX.Element => {
  const [optionSelected, setOptionSelected] = useState<string | null>(null)

  const toogleAccordion = (id: string) => {
    setOptionSelected(id === optionSelected ? null : id)
  }

  const renderFaqSection = (faqEntry: FaqsEntryStoryblok[]) => {
    return (
      <FaqsWrapper>
        {faqEntry.map((faqs) => {
          return (
            <Editable key={faqs._uid} block={faqs}>
              <Box
                css={{
                  width: '100%',
                  pb: '$8',
                  pt: '$16',
                  color: '$textPrimary',

                  '&:first-child': {
                    pt: '$0',
                  },
                }}
              >
                <Accordion
                  title={
                    <Text variant="big" as="p" weight="bold">
                      {faqs.question}
                    </Text>
                  }
                  isOpen={optionSelected === faqs._uid}
                  onClick={() => toogleAccordion(faqs._uid)}
                >
                  <Flex
                    css={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',

                      pb: '$24',
                    }}
                  >
                    <CMSRichTextField
                      document={
                        Array.isArray(faqs.answer)
                          ? faqs.answer?.[0]?.document
                          : faqs.answer
                      }
                    />
                  </Flex>
                </Accordion>
              </Box>
            </Editable>
          )
        })}
      </FaqsWrapper>
    )
  }

  const faqSections = useMemo(() => {
    if (block.faqs_entry?.length) {
      const totalLength = block.faqs_entry.length
      if (totalLength > 6) {
        const sliceTarget = Math.ceil(totalLength / 2)
        const col1Elms = block.faqs_entry.slice(0, sliceTarget)
        const col2Elms = block.faqs_entry.slice(sliceTarget, totalLength)

        return [col1Elms, col2Elms]
      } else {
        return [block.faqs_entry]
      }
    } else return []
  }, [block.faqs_entry])

  return (
    <Wrapper {...props}>
      <Container>
        <InnerWrapper>
          {block.title && (
            <Text
              variant="title"
              css={{ color: '$textPrimary', mb: '24px', '@lg': { mb: '48px' } }}
            >
              {block.title}
            </Text>
          )}
          {faqSections.length === 1 && renderFaqSection(faqSections[0])}
          {faqSections.length === 2 && (
            <Row>
              <Column>{renderFaqSection(faqSections[0])}</Column>
              <Column>{renderFaqSection(faqSections[1])}</Column>
            </Row>
          )}
        </InnerWrapper>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled('section', {})

const Row = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  '@lg': {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
const Column = styled('div', {
  width: '100%',
  '@lg': {
    width: '45%',
  },
})

const InnerWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  background: '$background',
  borderRadius: '$md',

  py: '$38',

  '@md': {
    py: '$40',
  },

  '@lg': {
    py: '$40',
  },
})

const FaqsWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  ml: '$0',
  mt: '$24',

  maxWidth: 'unset',

  '@lg': {
    ml: '$40',
    mt: '$0',

    maxWidth: '608px',
  },
})
