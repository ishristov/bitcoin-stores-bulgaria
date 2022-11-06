import './App.css'
import LanguageSelector from './components/LanguageSelector'
import TypesFilter from './components/TypesFilter'
import Map from './components/Map'

import React, { useState, useEffect } from 'react'
import useGoogleSheets from 'use-google-sheets'

const selectedTypesByDefault = ['3','4','5','6','7','8']

const App = () => {
  const [lang, setLang] = useState('bg')
  const { data, loading, error } = useGoogleSheets({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID,
    sheetsOptions: [{ id: 'list' }, { id: 'types'}],
  });

  const [filteredData, setFilteredData] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState(selectedTypesByDefault)

  useEffect(() => {
    console.log('data changed: ', data)
    if (data && data[0] && data[0].data) {
      setFilteredData(data[0].data.filter((m) => selectedTypes.includes(m.typeidx)))
    }
  }, [data, selectedTypes])

  function handleTypesChange (e) {
    if (e.target.checked) {
      setSelectedTypes([...selectedTypes, e.target.value])
    } else {
      setSelectedTypes(selectedTypes.filter(value => value !== e.target.value))
    }
  }

  function handleLangChange (e) {
    setLang(e.target.value)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Map loading failed. Try again and enter a comment below with the problem.</div>
  }

  return (
    <div>
      <LanguageSelector lang={lang} handleLangChange={handleLangChange} />
      <TypesFilter
        selectedTypes={selectedTypes}
        allTypes={data[1].data}
        lang={lang}
        handleTypesChange={handleTypesChange}
      />
      <Map data={filteredData} />
    </div>
  )
}

export default App
