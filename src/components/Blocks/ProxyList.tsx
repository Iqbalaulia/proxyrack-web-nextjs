import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { Box, Card, Container, Divider, Flex, Select, Text } from 'UI'
import {
  PROXY_LIST_ERROR,
  PROXY_LIST_OF,
  PROXY_LIST_RECORDS,
  PROXY_LIST_SHOWING,
} from 'common/constants'
import { ProxyListStoryblok } from 'common/types'
import { Loader } from 'components/Shared/Loader'
import { Pagination } from 'components/Shared/Pagination'
import { Table } from 'components/Shared/Table/Table'
import { styled } from 'lib/style'

const options = [
  { label: '20', value: '20' },
  { label: '50', value: '50' },
  { label: '100', value: '100' },
]

const theadData = [
  'ip',
  'port',
  'protocol',
  'country',
  'city',
  'speed',
  'online',
] as const

type DataType = {
  data: {
    records: {
      ip: string
      port: string
      protocol: string
      country: string
      city: string
      speed: string
      online: string
    }[]
    totalRecordCount: number
  }
}

type ProxyListType = {
  block: ProxyListStoryblok
}

export const ProxyList = ({ block, ...props }: ProxyListType): JSX.Element => {
  const [data, setData] = useState<DataType['data'] | null>(null)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [perPage, setPerPage] = useState(20)

  const fetchProxylist = useCallback(async () => {
    setLoading(true)
    setError(false)

    try {
      const offSet = (page - 1) * perPage

      const response = await fetch(
        `https://proxyfinder.proxyrack.com/proxies.json?perPage=${perPage}&offset=${offSet}`
      )

      const data: DataType['data'] = await response.json()

      setData(data)
      setTotal(data.totalRecordCount)
    } catch {
      setError(true)
    }

    setLoading(false)
  }, [page, perPage])

  useEffect(() => {
    fetchProxylist()
  }, [fetchProxylist])

  const totalPages = Math.ceil(total / perPage)

  const handlePerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPerPage(parseInt(e.currentTarget.value))
  }

  if (error) {
    return (
      <Wrapper>
        <Container variant="xlwide">
          <Card css={{ p: '$48', display: 'flex', justifyContent: 'center' }}>
            <Text variant="small" css={{ color: '$gray700' }}>
              {PROXY_LIST_ERROR}
            </Text>
          </Card>
        </Container>
      </Wrapper>
    )
  }

  if (loading && !data) {
    return (
      <Wrapper>
        <Container variant="xlwide">
          <Card css={{ p: '$48', display: 'flex', justifyContent: 'center' }}>
            <Loader />
          </Card>
        </Container>
      </Wrapper>
    )
  }

  return (
    <Wrapper
      css={{ opacity: loading ? 0.5 : 1, position: 'relative' }}
      {...props}
    >
      {loading && (
        <Box
          css={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Loader />
        </Box>
      )}
      <Container variant="xlwide">
        <Card>
          <WrapperFilter>
            {block.title && (
              <Box css={{ mb: '$16', '@md': { mb: '$0' } }}>
                <Text variant="small" weight="bold" css={{ color: '$gray700' }}>
                  {block.title}
                </Text>
              </Box>
            )}
            <Flex css={{ alignItems: 'center' }}>
              <Text variant="small" css={{ color: '$gray700', mr: '$12' }}>
                {PROXY_LIST_SHOWING}
              </Text>
              <Box>
                <Select
                  onChange={handlePerPageChange}
                  css={{ minWidth: '70px' }}
                  value={perPage}
                >
                  {options.map((option) => {
                    return (
                      <option key={option.label} value={option.value}>
                        {option.label}
                      </option>
                    )
                  })}
                </Select>
              </Box>
              <Text variant="small" css={{ color: '$gray700', ml: '$12' }}>
                {PROXY_LIST_OF} {total} {PROXY_LIST_RECORDS}
              </Text>
            </Flex>
          </WrapperFilter>
          <Divider />
          {data && (
            <WrapperTable>
              <Table thead={theadData} tbody={data?.records} />
            </WrapperTable>
          )}
          <Pagination
            changePage={setPage}
            currentPage={page}
            totalPages={totalPages}
            css={{ pb: '$32', justifyContent: 'center' }}
          />
        </Card>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled('section', {
  py: '$16',
})

const WrapperTable = styled('div', {
  p: '$16 $20 $20 $20',
  overflowX: 'auto',

  '@md': {
    p: '$16 $32 $32 $32',
  },

  '@lg': {
    p: '$16 $48 $48 $48',
    overflowX: 'unset',
  },
})

const WrapperFilter = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  p: '$20 $20 $16 $20',

  '@md': {
    flexDirection: 'row',
    justifyContent: 'space-between',

    p: '$20 $32 $16 $32',
  },

  '@lg': {
    p: '$20 $48 $16 $48',
  },
})
