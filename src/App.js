import './App.css'
import LanguageSelector from './components/LanguageSelector'
import TypesFilter from './components/TypesFilter'
import MerchantsTable from './components/MerchantsTable'
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

  const [filteredMerchants, setFilteredMerchants] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState(selectedTypesByDefault)
  const [typesObj, setTypesObj] = useState({})

  useEffect(() => {
    console.log('data changed: ', data)
    if (data && data[0] && data[0].data) {
      setFilteredMerchants(data[0].data.filter((m) => selectedTypes.includes(m.typeidx)))
    }
  }, [data, selectedTypes])

  useEffect(() => {
    if (data && data[1] && data[1].data) {
      setTypesObj(data[1].data.reduce((acc, type) => {
        acc[type.idx] = type[lang]
        return acc
      }, {}))
    }
  }, [data, lang])

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
      <Map lang={lang} data={filteredMerchants} allTypes={data[1].data} />
      <TypesFilter
        selectedTypes={selectedTypes}
        allTypes={data[1].data}
        lang={lang}
        handleTypesChange={handleTypesChange}
      />
      <MerchantsTable
        data={filteredMerchants}
        allTypes={data[1].data}
        typesObj={typesObj}
        lang={lang}
        />
    </div>
  )
}

export default App
