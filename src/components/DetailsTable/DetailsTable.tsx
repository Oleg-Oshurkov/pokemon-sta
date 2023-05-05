import { Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { Fragment, ReactElement } from "react"

type DetailsTableProps = {
    title: string
    data: { parameter: string, value: any }[]
}

export const DetailsTable = ({ title, data }: DetailsTableProps): ReactElement | null => {
    const [firstDataSlice, secondDataSlice, thirdDataSlice, fourthDataSlice, fifthDataSlice] = data

    return (
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
                        <Tr>
                            <Td>{firstDataSlice?.parameter}</Td>
                            <Td>{firstDataSlice?.value}</Td>
                        </Tr>
                        <Tr>
                            <Td>{secondDataSlice?.parameter}</Td>
                            <Td>{secondDataSlice?.value}</Td>
                        </Tr>
                        <Tr>
                            <Td>{thirdDataSlice?.parameter}</Td>
                            <Td>{thirdDataSlice?.value}</Td>
                        </Tr>
                        <Tr>
                            <Td>{fourthDataSlice?.parameter}</Td>
                            <Td>{fourthDataSlice?.value}</Td>
                        </Tr>
                        <Tr>
                            <Td>{fifthDataSlice?.parameter}</Td>
                            <Td>{fifthDataSlice?.value}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Fragment>
    )
}
