import React from 'react'
import {createUseStyles} from 'react-jss'
import { useTranslation } from 'react-i18next'

import './Table.css'
import { linkExt } from '../lib/utils'
import shopOnline from '../images/shop-online2.png'

const useStyles = createUseStyles({

})

const TableMerchantsOnlyOnline = ({data}) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <div>
      <h2>
        <img height="20" alt="online" src={shopOnline} />&nbsp;
        {t('noAddressTitle')}
      </h2>
      <h3>{t('noAddressSub')}</h3>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>{t('name')}</th>
            <th>{t('desc')}</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ name, description, website }, key) => {
            return (
              <tr key={key} className={key % 2 === 0 ? 'odd' : ''}>
                <td>
                  {linkExt(website, name)}
                </td>
                <td>{description}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TableMerchantsOnlyOnline