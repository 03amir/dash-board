import React from 'react';
import { HStack, Button, Box, Text, Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { pageChange } from '../utils/tableSlice';
import {
    ChevronLeftIcon,
    ArrowLeftIcon,
    ChevronRightIcon,
    ArrowRightIcon
} from '@chakra-ui/icons';

function PaginationButtons({ currentPage, totalPages }) {


    
    const selectedRows = useSelector((state) => state.table.selectedRows);
    const data = useSelector((state) => state.table.data);

    const dispatch = useDispatch();

    const handlePageChange = (index) => {
        dispatch(pageChange(index));
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <Button
                    key={i}
                    disabled={i === currentPage}
                    onClick={() => handlePageChange(i)}
                    colorScheme={i === currentPage ? 'red' : 'gray'}
                >
                    {i}
                </Button>
            );
        }

        return buttons;
    };

    return (
        <Box style={{ margin: '40px' }}>
            <Flex alignItems="center" justifyContent="space-between" mb={4}>

                <Text>{` ${selectedRows.length} of ${data.length} row(s) selected`}</Text>

                <HStack spacing={4}>

                    <Text>{`Pages ${currentPage} of ${totalPages}`}</Text>

                    <Button
                        as="div" 
                        onClick={() => handlePageChange(1)}
                        isDisabled={currentPage === 1}
                        className="first-page" 
                    >
                        <ArrowLeftIcon />
                    </Button>
                    <Button
                        as="div" 
                        onClick={() => handlePageChange(currentPage - 1)}
                        isDisabled={currentPage === 1}
                        className="previous-page"  
                    >
                        <ChevronLeftIcon />
                    </Button>
                    {renderPaginationButtons()}
                    <Button
                        as="div" 
                        onClick={() => handlePageChange(currentPage + 1)}
                        isDisabled={currentPage === totalPages}
                        className="next-page" 
                    >
                        <ChevronRightIcon />
                    </Button>
                    <Button
                        as="div" 
                        onClick={() => handlePageChange(totalPages)}
                        isDisabled={currentPage === totalPages}
                        className="last-page" 
                    >
                        <ArrowRightIcon />
                    </Button>
                </HStack>
            </Flex>
        </Box>
    );
}

export default PaginationButtons;
