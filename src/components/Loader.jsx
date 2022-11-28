import { Box, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'

function Loader() {
    return (
        <VStack h={"100vh"} justifyContent={"center"}>
            <Box transform={"scale(2.5)"}>
                <Spinner size={"xl"} />
            </Box>
        </VStack>
    )
}

export default Loader