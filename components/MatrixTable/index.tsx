import classnames from 'classnames'
import React, {useContext, useEffect, useState} from 'react'
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
    const [{matrix}, dispatch] = useContext(MatrixTableContext)
    const [originalMatrix, setOriginalMatrix] = useState(matrix)
    let [isEdit, setEdit] = useState(false)
    // Handlers ---------------------------------------------------------------- //
    // You can save (to api) the matrix here. Remember to update originalMatrix when done.
    const save = async () => {
        await fetch('/api/save-pricing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(matrix)
        })
    }

    const handleChange = (event, term: string, pkg: string) => {
        matrix[term][pkg] = event.target.value
        if (pkg === 'lite') {
            matrix[term]['standard'] = event.target.value * 2
            matrix[term]['unlimited'] = event.target.value * 3
        }
        console.log(matrix)
        dispatch({type: 'SET_MATRIX', payload: matrix})
    }
    const editTable = () => {
        setEdit(!isEdit)
    }
    const clearTable = () => {
    }
    const cancelEdit = () => {
        setEdit(!isEdit)
        console.log(matrix);
        console.log(originalMatrix);
        dispatch({type: 'SET_MATRIX', payload: originalMatrix})
    }
    // Effects ----------------------------------------------------------------- //
        useEffect(() => {console.log(matrix)}, [matrix])
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
                                return <Th key={key + index}>{key}</Th>
                            })}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {Object.keys(matrix).map((term, index) => {
                            return <Tr key={"tr" + term}>
                                <Td key={"td" + term}>{term}</Td>
                                {Object.keys(matrix[term]).map((pkg, index2) => {
                                    return <Td key={"td" + pkg + index}>
                                        <input type="number"
                                               placeholder={matrix[term][pkg]}
                                               defaultValue={matrix[term][pkg]}
                                               disabled={!isEdit}
                                               onChange={(e) => {
                                                   handleChange(e, term, pkg)
                                               }}/>
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
                            cancelEdit()
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
    const {data, error} = useSWR('/api/pricing', fetcher)

    return (
        <MatrixTableContextProvider initialMatrix={data}>
            <MatrixTable {...props} />
        </MatrixTableContextProvider>
    )
}

export default MatrixTableWithContext
