import React from 'react'
import { createUseStyles } from 'react-jss'
import { useTranslation } from 'react-i18next'

const useStyles = createUseStyles({
  fieldset: {
    marginTop: 20,
    border: '2px groove #f6f6f6',
    padding: '0.35em 0.65em',
    lineHeight: '0.25em',
  },
  legend: {
    margin: 0,
    padding: 2,
  }
})

const TypesFilter = ({selectedTypes, allTypes, lang, handleTypesChange}) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <fieldset className={classes.fieldset}>
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
