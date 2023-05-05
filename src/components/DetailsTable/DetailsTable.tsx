import React from 'react'
import { Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { Fragment, ReactElement } from "react"
import { pokemon } from '../../helpers/mocks'
import { getRandomKey } from '../../helpers'

type DetailsTableProps = {
    title: string
    data: { parameter: string, value: any }[]
}

export const DetailsTable: React.FC<DetailsTableProps> = ({ title, data }): ReactElement | null => (
    <Fragment>
        <Heading size="xs" textAlign="center" mt="8px">
            {title}
        </Heading>
        <TableContainer>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Parameter</Th>
                        <Th>Value</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data?.map(({ parameter, value }) => (
                        <Tr key={getRandomKey()}>
                            <Td>{parameter}</Td>
                            <Td>{value}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    </Fragment>
)
