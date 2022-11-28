import React from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { server } from "../index"
import { useState } from 'react'
import { Container, HStack, VStack, Image, Heading, Text, Button } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComp from './ErrorComp'
function Exchange() {
    const [exchanges, setExchanges] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    useEffect(() => {
        const fetchExchange = async () => {
            try {

                const { data } = await axios.get(`${server}exchanges?page=1`);

                setExchanges(data)
                setLoading(false)
            }
            catch (err) {
                setError(true)
                setLoading(false)

            }
        }
        fetchExchange()
    }, [exchanges])
    if (error) return (<ErrorComp message={"Error while Fetching API"} />)
    return (
        <div>
            <Container maxWidth="container.xl">
                {loading ? <Loader /> : (
                    <>
                        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
                            {exchanges.map((ex) => (
                                <ExchangeCard
                                    key={ex.id}
                                    name={ex.name}
                                    image={ex.image}
                                    rank={ex.trust_rank_score}
                                    url={ex.url} />))}
                        </HStack>

                    </>)
                }
            </Container></div >
    )
}

const ExchangeCard = ({ name, rank, image, url }) => (
    <a href={url} target={"blank"}>
        <VStack w={"50"} p={"8"} shadow={"lg"} transition={"all 0.3s"} m={"4"}
            css={{
                "&:hover": {
                    transform: "scale(1.2)"
                }
            }}>
            <Image src={image} w={"10"} h={"10"} objectFit={"contain"} target={"exchanges"} />
        </VStack>
        <Heading size={"md"} noOfLines={"1"}>
            {rank}
        </Heading>
        <Text noOfLines={"1"}> {name}</Text>

    </a>
)
export default Exchange