import './App.css'
import { Filter } from './components/Filter'
import { Map } from './components/Map'

import React, { useState, useEffect } from 'react'

const App = () => {
  useEffect(() => {
    // get data
  }, [])

  return (
    <div>
      <Filter />
      <Map />
    </div>
  )
}

export default App;
