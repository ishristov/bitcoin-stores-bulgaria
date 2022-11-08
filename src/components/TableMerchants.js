import React from 'react'
import './Table.css'
import {createUseStyles} from 'react-jss'
import { linkExt, isOnline, isOffline } from '../lib/utils'
import shopOffline from '../images/shop-offline.png'
import shopOnline from '../images/shop-online2.png'

const useStyles = createUseStyles({
  storeIcon: {
    '& + &': {
      display: 'inline-block',
      marginLeft: 6
    }
  },
  storeOnline: {
    position: 'relative',
    top: 1
  },
  nowrap: {
    whiteSpace: 'nowrap',
  },
  latlngIcon: {
    position: 'relative',
    top: -1,
    left: -1,
    marginLeft: 1
  }
})

const TableMerchants = ({data, typesObj}) => {
  const classes = useStyles()

  return (
    <div>
      <h2>
        <img height="20" alt="offline" src={shopOffline} />&nbsp;
        Магазини, ресторанти и обекти с физически адрес
      </h2>
      <h3>Тези обекти могат да бъдат намерени и на картата по-горе.</h3>
      <table className={classes.table}>
        <tr>
          <th>Име на обекта</th>
          <th className="">Физически<br/>или онлайн</th>
          <th>Описание</th>
          <th>Адрес</th>
        </tr>
      <tbody>
        {data.map((m, key) => {
            const { name, description, address, website, coordinates} = m

            return (
              <tr key={key} className={key % 2 === 0 ? 'odd' : ''}>
                <td>
                  {linkExt(website, name)}
                </td>
                <td className={["", classes.nowrap].join(' ')}>
                  {isOffline(m) && <img height="20" alt="offline" src={shopOffline}
                    className={classes.storeIcon} />}
                  {isOnline(m) && <img height="20" alt="online" src={shopOnline}
                    className={[classes.storeIcon, classes.storeOnline].join(' ')} />}
                </td>
                <td>{description}</td>
                <td>
                  {coordinates ?
                    <>
                      {address}
                      <br/>
                      &#9873;&nbsp;&nbsp;
                      {linkExt(`https://www.google.com/maps/search/${address}/`, 'Google Maps')},&nbsp;
                      <span className={classes.latlngIcon}>&#8982;</span>
                      &nbsp;{linkExt(`https://www.google.com/maps?ll=${coordinates}`, 'Lat Lang')}
                    </> : '-'
                  }
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TableMerchants
