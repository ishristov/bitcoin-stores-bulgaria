import './App.css'
import { Filter } from './components/Filter'
import Map from './components/Map'
import data from './data.json'

import React, { useState, useEffect } from 'react'

const App = () => {
  const [filteredData, setFilteredData] = useState(data);
  const [types, setTypes] = useState([2,3,4,5])
  
  useEffect(() => {
    console.log(types)
  }, [types])

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
        {data.types.bg.map((value, key) => (
          <label key={key} style={{display: 'block'}}>
            <input type="checkbox" value={key} onChange={handleTypeCheckbox} checked={types.includes(key)}/>
            {value}
          </label>
        ))}
         
        <br />      
        <input type="submit" value="Submit now" />      
      </fieldset> 

      {/* <select multiple>
        {data.types.bg.map((value, key) => (
          <option value={value} key={key}>{value}</option>
        ))}
      </select> */}
      <Map data={filteredData} />
    </div>
  )
}

export default App;
