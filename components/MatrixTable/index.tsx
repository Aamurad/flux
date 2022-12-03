import classnames from 'classnames'
import React, {useContext, useState} from 'react'
import {MatrixTableContext, MatrixTableContextProvider} from './context'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Input,
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
    Flex,
    IconButton,
    ButtonGroup,
    Box, useColorModeValue, useDisclosure, useEditableControls, SlideFade, Tooltip, Button, Wrap, WrapItem
} from '@chakra-ui/react'
import {CheckIcon, CloseIcon} from "@chakra-ui/icons";
import useSWR from 'swr';

type Props = {
    initialMatrix?: import('../../types').Matrix
} & import('react').HTMLAttributes<HTMLDivElement>

/**
 * Add 4 buttons:
 * - Cancel to reset the matrix to how it was before changing the values (only when in edit mode)
 * - Edit to make the fields editable (only when not in edit mode)
 * - Clear to completely clear the table
 * - Save to save the table
 * @param param0
 */
const MatrixTable: import('react').FC<Omit<Props, 'initialMatrix'>> = ({className, children, ...props}) => {
    // State ------------------------------------------------------------------- //
    const [{matrix,originalMatrix}, dispatch] = useContext(MatrixTableContext)
    let [isEdit, setEdit] = useState(false)
    // Handlers ---------------------------------------------------------------- //
    // You can save (to api) the matrix here. Remember to update originalMatrix when done.
    const save = async () => {
        console.log("test")
        dispatch({type: 'SET_ORIGINAL_MATRIX', payload: matrix})
    }

    const handleChange = (event) => {
        console.log(event.target.value)
    }
    const editTable = () => {
        setEdit(!isEdit)
        console.log(isEdit);
    }
    const clearTable = () => {
        dispatch({type: 'SET_MATRIX', metadata: {resetToEmpty: true}})
        console.log(isEdit);
    }

    // Effects ----------------------------------------------------------------- //

    // Rendering --------------------------------------------------------------- //
    return (
        <div className={classnames(['container', className])} {...props}>
            {/*            <button onClick={save}>Save</button>
            <br/>
            <br/>

            36months lite:
            <input
                value={matrix["36months"].lite || ''}
                onChange={(e) => dispatch({
                    type: 'SOME_ACTION',
                    payload: e.target.value
                })}/>*/}
            {/*<TableContainer width={"full"}>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th></Th>
                            <Th>Lite</Th>
                            <Th>Standard</Th>
                            <Th>Unlimited</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>36 Months</Td>
                            <Td>
                                <Editable defaultValue="Rasengan ⚡️" isDisabled={!isEdit}>
                                    <EditablePreview/>
                                    <Input as={EditableInput} onChange={handleChange}/>
                                </Editable>
                            </Td>
                            <Td>
                                <Editable defaultValue="Rasengan ⚡️" isDisabled={!isEdit}>
                                    <EditablePreview/>
                                    <Input as={EditableInput} onChange={handleChange}/>
                                </Editable>
                            </Td>
                            <Td>
                                <Editable defaultValue="Rasengan ⚡️" isDisabled={!isEdit}>
                                    <EditablePreview/>
                                    <Input as={EditableInput} onChange={handleChange}/>
                                </Editable>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>24 Months</Td>
                            <Td>
                                <Editable defaultValue="Rasengan ⚡️" isDisabled={!isEdit}>
                                    <EditablePreview/>
                                    <Input as={EditableInput} onChange={handleChange}/>
                                </Editable>
                            </Td>
                            <Td>
                                <Editable defaultValue="Rasengan ⚡️" isDisabled={!isEdit}>
                                    <EditablePreview/>
                                    <Input as={EditableInput} onChange={handleChange}/>
                                </Editable>
                            </Td>
                            <Td>
                                <Editable defaultValue="Rasengan ⚡️" isDisabled={!isEdit}>
                                    <EditablePreview/>
                                    <Input as={EditableInput} onChange={handleChange}/>
                                </Editable>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>12 Months</Td>
                            <Td>
                                <Editable defaultValue="Rasengan ⚡️" isDisabled={!isEdit}>
                                    <EditablePreview/>
                                    <Input as={EditableInput} onChange={handleChange}/>
                                </Editable>
                            </Td>
                            <Td>
                                <Editable defaultValue="Rasengan ⚡️" isDisabled={!isEdit}>
                                    <EditablePreview/>
                                    <Input as={EditableInput} onChange={handleChange}/>
                                </Editable>
                            </Td>
                            <Td>
                                <Editable defaultValue="Rasengan ⚡️" isDisabled={!isEdit}>
                                    <EditablePreview/>
                                    <Input as={EditableInput} onChange={handleChange}/>
                                </Editable>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>Month to Month</Td>
                            <Td>
                                <Editable defaultValue="Rasengan ⚡️" isDisabled={!isEdit}>
                                    <EditablePreview/>
                                    <Input as={EditableInput} onChange={handleChange}/>
                                </Editable>
                            </Td>
                            <Td>
                                <Editable defaultValue="Rasengan ⚡️" isDisabled={!isEdit}>
                                    <EditablePreview/>
                                    <Input as={EditableInput} onChange={handleChange}/>
                                </Editable>
                            </Td>
                            <Td>
                                <Editable defaultValue="Rasengan ⚡️" isDisabled={!isEdit}>
                                    <EditablePreview/>
                                    <Input as={EditableInput} onChange={handleChange}/>
                                </Editable>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
                <Wrap mt={4} justify={"right"}>
                    <WrapItem hidden={isEdit}>
                        <Button colorScheme='blue' onClick={() => {
                            editTable()
                        }}>Edit</Button>
                    </WrapItem>
                    <WrapItem>
                        <Button colorScheme='blue' onClick={() => {
                            save()
                        }} hidden={!isEdit}>Save</Button>
                    </WrapItem>
                    <WrapItem>
                        <Button colorScheme='blue' onClick={() => {
                            editTable()
                        }} hidden={!isEdit}>Cancel</Button>
                    </WrapItem>
                    <WrapItem>
                        <Button colorScheme='blue' onClick={() => {
                            editTable()
                        }} hidden={!isEdit}>Clear Table</Button>
                    </WrapItem>
                </Wrap>

            </TableContainer>*/}
            <TableContainer width={"full"}>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th></Th>
                        {Object.keys(matrix.mtm).map((key, index) => {
                            return <Th>{key}</Th>
                        })}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {Object.keys(matrix).map((key, index) => {
                            return <Tr>
                                <Td>{key}</Td>
                                {Object.keys(matrix[key]).map((key2, index2) => {
                                    return <Td>
                                        {/*{matrix[key][key2]}*/}
                                        <Editable defaultValue={matrix[key][key2].toString()} isDisabled={!isEdit}>
                                            <EditablePreview />
                                            <Input as={EditableInput} onChange={handleChange}/>
                                        </Editable>
                                    </Td>
                                })}
                            </Tr>
                        })}
                    </Tbody>
                </Table>
                <Wrap mt={4} justify={"right"}>
                    <WrapItem hidden={isEdit}>
                        <Button colorScheme='blue' onClick={() => {
                            editTable()
                        }}>Edit</Button>
                    </WrapItem>
                    <WrapItem>
                        <Button colorScheme='blue' onClick={() => {
                            save()
                        }} hidden={!isEdit}>Save</Button>
                    </WrapItem>
                    <WrapItem>
                        <Button colorScheme='blue' onClick={() => {
                            editTable()
                        }} hidden={!isEdit}>Cancel</Button>
                    </WrapItem>
                    <WrapItem>
                        <Button colorScheme='blue' onClick={() => {
                            clearTable()
                        }} hidden={!isEdit}>Clear Table</Button>
                    </WrapItem>
                </Wrap>
            </TableContainer>
            <style jsx>{`.container {
            }`}</style>
        </div>
    )
}

const MatrixTableWithContext: import('react').FC<Props> = ({...props}) => {
    // You can fetch the pricing here or in pages/index.ts
    // Remember that you should try to reflect the state of pricing in originalMatrix.
    // matrix will hold the latest value (edited or same as originalMatrix)
    const fetcher = (url: string) => fetch(url).then((res) => res.json())
    const { data, error } = useSWR('/api/pricing', fetcher)
    console.log(data)

    return (
        <MatrixTableContextProvider initialMatrix={data}>
            <MatrixTable {...props} />
        </MatrixTableContextProvider>
    )
}

export default MatrixTableWithContext
