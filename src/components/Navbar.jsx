import { Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (

        <HStack p={"4"} bgColor={'gray.800'}>
            <Button variant={"unstyled"} color={"whiteAlpha.700"}>
                <Link to="/" > Home</Link></Button>
            <Button variant={"unstyled"} color={"whiteAlpha.700"}>

                <Link to="/coins" >Coins</Link></Button>
            <Button variant={"unstyled"} color={"whiteAlpha.700"}>

                <Link to="/exchanges" >Exchanges</Link></Button>

        </HStack>

    )
}

export default Navbar