import { Box, Container, Flex } from 'UI'
import { TwoRichColumnLayoutStoryblok } from 'common/types'
import { CMSRichTextField } from 'components/Shared/CMSRichTextField'

type PropsTypes = {
  block: TwoRichColumnLayoutStoryblok
}

export const TwoRichColumnLayout = ({ block }: PropsTypes): JSX.Element => {
  const commonCSS: any = {}
  const richCSS: any = {
    textAlign: 'left',
    ul: {
      paddingLeft: '30px',
    },
  }
  return (
    <Container css={{}}>
      <Flex
        css={{
          justifyContent: 'space-evenly',
          backgroundColor: block.bg_color || '$gray900',
          color: block.text_color || 'white',
          padding: '24px',
          borderRadius: '$md',
          flexDirection: 'column',
          '@lg': {
            flexDirection: 'row',
            padding: '36px',
          },
        }}
      >
        <Box css={{ ...commonCSS }}>
          <CMSRichTextField
            document={block.column_left}
            css={{ ...richCSS, textAlign: block.column_left_text_alignment }}
          />
        </Box>
        <Box css={{ ...commonCSS }}>
          <CMSRichTextField
            document={block.column_right}
            css={{ ...richCSS, textAlign: block.column_right_text_alignment }}
          />
        </Box>
      </Flex>
    </Container>
  )
}
