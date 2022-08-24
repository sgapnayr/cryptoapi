import './App.css';
import axios from 'axios'
import React, { useState } from 'react'

const Title = (props) => {
  return (
    <>
      <div className="header">
        <h1>Crypto <bold>{props.search ? props.search : 'App'}</bold></h1>
      </div>
    </>
  )
}

const Header = (props) => {
  return (
    <>
      <div className="coin-header">
        <div className="postion">#</div>
        <div className="image">Logo</div>
        <div className="name">Name</div>
        <div className="symbol">Symbol</div>
        <div className="price">$</div>
      </div>
    </>
  )
}

function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'

  axios.get(url).then(res => setCoins(res.data))

  const handleChange = e => setSearch(e.target.value)

  const filterCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="App">
        <Title search={search} />
        <form>
          <input placeholder='Search Here...' onChange={handleChange} value={search} />
        </form>
        <Header />
        {filterCoins.map(coin => {
          return (
            <div className="coin-container">
              <div className="coin-position">
                <p>{coins.indexOf(coin) + 1}</p>
              </div>
              <div className="coin-image">
                <img src={coin.image} />
              </div>
              <div className='coin-name'>
                {coin.name}
              </div>
              <div className="coin-symbol">
                ({coin.symbol.toUpperCase()})
              </div>
              <div className='coin-price'>
                <strong>${coin.current_price.toLocaleString()}</strong>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
