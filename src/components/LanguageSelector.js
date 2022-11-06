import React from 'react'

const LanguageSelector = ({lang, handleLangChange}) => (
  <div>
    <select onChange={handleLangChange} value={lang}>
      <option value="bg">🇧🇬 Български</option>
      <option value="en">🇺🇸 English</option>
    </select>
  </div>
)

export default LanguageSelector
