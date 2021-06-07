import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import _, { set } from 'lodash'
import './App.css'

function App() {
  const [beerList, setBeerList] = useState([])

  const [current, setCurrent] = useState({})

  const [back, setBack] = useState({})

  useEffect(() => {
    let lastIndex = beerList.length - 1
    let beforeLastIndex = lastIndex != 0 ? lastIndex - 1 : 0
    setBack(beforeLastIndex)
    setCurrent(beerList[lastIndex])
  }, [beerList])

  const handleClick = () => {
    getBeers()
  }
  const handleClickBack = () => {
    let beforeLastIndex = back != 0 ? back - 1 : 0
    setCurrent(beerList[back])
    setBack(beforeLastIndex)
  }

  const getBeers = async () => {
    const URL = 'https://random-data-api.com/api/beer/random_beer'
    try {
      const { data } = await axios(URL)
      if (!_.isEmpty(data)) {
        let _beerList = [...beerList, data]
        setBeerList(_beerList)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className="App">
      {beerList.length == 0 ? (
        <header className="App-header">
          <h1>Take some beer!!!</h1>
          <button className="button-click" onClick={handleClick}>
            GET IT!
          </button>
        </header>
      ) : (
        <div className="App-header">
          {current && (
            <div className="beer-box">
              <h1>{current.brand}</h1>
              <h3>{current.name}</h3>
              <h3>
                {current.style} <span>{current.hop}</span>
              </h3>
              <h3>{current.malts}</h3>
              <p>
                {current.ibu} - alcohol {current.alcohol} - {current.blg}
              </p>
            </div>
          )}
          <div className="button-area">
            <button className="button-click" onClick={handleClickBack}>
              {`< Back`}
            </button>
            <button className="button-click" onClick={handleClick}>
              {`Next >`}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
