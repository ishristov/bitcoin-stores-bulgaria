import './App.css'
import { Filter } from './components/Filter'
import Map from './components/Map'
import localData from './data.json'

import React, { useState, useEffect } from 'react'
import useGoogleSheets from 'use-google-sheets'

const App = () => {
  const { data, loading, error } = useGoogleSheets({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID,
    sheetsOptions: [{ id: 'list' }, { id: 'types'}],
  });

  const [filteredData, setFilteredData] = useState([]);
  const [types, setTypes] = useState([2,3,4,5,6,7])

  useEffect(() => {
    console.log('data changed: ', data)
    if (data && data[0] && data[0].data) {
      setFilteredData(data[0].data)
    }
  }, [data])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Map loading failed. Try again and enter a comment below with the problem.</div>;
  }


  function handleTypeCheckbox (e) {
    if (e.target.checked) {
      setTypes([...types, parseInt(e.target.value)])
    } else {
      setTypes(types.filter(value => value != parseInt(e.target.value)))
    }
  }

  return (
    <div>
      <Filter />
      <fieldset>      
        <legend>Merchant types</legend>
        {data[1].data.map((value, key) => (
          <label key={key} style={{display: 'block'}}>
            <input type="checkbox" value={key} onChange={handleTypeCheckbox} checked={types.includes(key)}/>
            {value['bg']}
          </label>
        ))}
         
        <br />      
        <input type="submit" value="Submit now" />      
      </fieldset> 
      <Map data={filteredData} />
    </div>
  )
}

export default App;
