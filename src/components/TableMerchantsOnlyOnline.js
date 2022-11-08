import React from 'react'
import './Table.css'
import {createUseStyles} from 'react-jss'
import { linkExt } from '../lib/utils'
import shopOnline from '../images/shop-online2.png'

const useStyles = createUseStyles({

})

const TableMerchantsOnlyOnline = ({data, typesObj}) => {
  const classes = useStyles()

  return (
    <div>
      <h2>
        <img height="20" alt="online" src={shopOnline} />&nbsp;
        Oнлайн магазини и обекти без физически адрес
      </h2>
      <h3>Заради липсата на адрес, тези обекти не могат да бъдат показани на картата.</h3>
      <table className={classes.table}>
        <tr>
          <th>Име</th>
          <th>Описание</th>
        </tr>
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
