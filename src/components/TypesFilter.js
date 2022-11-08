import React from 'react'
import { createUseStyles } from 'react-jss'
import { useTranslation } from 'react-i18next'

const useStyles = createUseStyles({
  main: {
    marginTop: 20,
    borderColor: '#f6f6f6',
  },
})

const TypesFilter = ({selectedTypes, allTypes, lang, handleTypesChange}) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <fieldset className={classes.main}>      
      <legend>{t('merchantTypes')}</legend>
      {allTypes.map((type) => (
        <label key={type.idx} style={{display: 'block'}}>
          <input
            type="checkbox"
            value={type.idx}
            onChange={handleTypesChange}
            checked={selectedTypes.includes(type.idx)}
          />&nbsp;
          {type[lang]}
        </label>
      ))}   
    </fieldset>
  )
}

export default TypesFilter
