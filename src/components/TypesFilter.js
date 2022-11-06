import React from 'react'

const TypesFilter = ({selectedTypes, allTypes, lang, handleTypesChange}) => (
  <fieldset>      
    <legend>Merchant types</legend>
    {allTypes.map((type) => (
      <label key={type.idx} style={{display: 'block'}}>
        <input
          type="checkbox"
          value={type.idx}
          onChange={handleTypesChange}
          checked={selectedTypes.includes(type.idx)}
        />
        {type[lang]}
      </label>
    ))}   
  </fieldset>
)

export default TypesFilter
