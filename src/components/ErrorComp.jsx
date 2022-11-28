import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

function ErrorComp({ message }) {
    return (
        <Alert status={'error'} p={"3"} position={"fixed"} w={"100vw"} j margin={"2"} >
            <AlertIcon />{message}
        </Alert >
    )
}

export default ErrorComp