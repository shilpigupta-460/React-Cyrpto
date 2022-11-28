import React from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { server } from "../index"
import { useState } from 'react'
import { Container, HStack, VStack, Image, Heading, Text, Button, RadioGroup, Radio } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComp from './ErrorComp'
import { Link } from 'react-router-dom'

function Coins() {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [page, setPage] = useState("1")
  const [currency, setCurrency] = useState("usd")
  const currencySymbol = currency === "usd" ? "$" : "€"
  const changePage = (page) => {
    setPage(page)
    setLoading(false)
  }
  const btns = new Array(132).fill(1)
  useEffect(() => {
    const fetchCoins = async () => {


      try {

        const { data, name } = await axios.get(`${server}coins/markets?vs_currency=${currency}&page=${page}`);

        setCoins(data)

        console.log(data[2].id);
        setLoading(false)
      }
      catch (err) {
        setError(true)
        setLoading(false)

      }
    }
    fetchCoins()
  }, [currency, page])

  if (error) return (<ErrorComp message={"Error while Fetching Coins"} />)
  return (
    <div>

      <Container maxWidth="container.xl" justifyContent={"space-evenly"}>
        <RadioGroup value={currency} onChange={setCurrency} p={'4'}>
          <HStack>
            <Radio value={"usd"}>USD</Radio>
            <Radio value={"eur"}>EUR</Radio>
          </HStack>
        </RadioGroup>
        {loading ? <Loader /> : (
          <>
            <HStack wrap={"wrap"} >
              {coins.map((coin) =>
              (
                <CoinCard
                  id={coin.id}
                  key={coin.id}
                  name={coin.name}
                  image={coin.image}
                  symbol={coin.symbol}
                  price={coin.current_price}
                  currencySymbol={currencySymbol}
                />)

              )

              }

            </HStack>
            <HStack align='stretch' overflowX={'auto'} p={"8"}>
              {btns.map((item, index) => (
                <Button key={index + 1} bgColor={'gray.800'} color={"white"} onClick={() => { changePage(index + 1) }}>{index + 1}</Button>
              ))}</HStack>
          </>)
        }
      </Container></div >
  )
}

const CoinCard = ({ id, name, symbol, image, price, currencySymbol }) => (
  <Link to={`/coin/${id}`} >
    <VStack w={"50"} p={"8"} shadow={"lg"} transition={"all 0.3s"} m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.2)"
        }
      }}>
      <Image src={image} w={"10"} h={"10"} objectFit={"contain"} target={"exchanges"} />
    </VStack>
    <Heading size={"md"} noOfLines={"1"}>
      {symbol}
    </Heading>
    {/* <Text noOfLines={"1"}> {name}</Text> */}
    <Text > {price ? `${currencySymbol}${price}` : "NA"}</Text>
  </Link>
)

export default Coins