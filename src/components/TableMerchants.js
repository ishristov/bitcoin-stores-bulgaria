import React from 'react'
import {createUseStyles} from 'react-jss'
import { useTranslation } from 'react-i18next'

import { tableStyles } from './tableStyles'
import { linkExt, isOnline, isOffline } from '../lib/utils'
import shopOffline from '../images/shop-offline.png'
import shopOnline from '../images/shop-online2.png'

const useStyles = createUseStyles({
  container: {
    marginTop: '2rem',
  },
  storeIcon: {
    height: 22,

    '& + &': {
      display: 'inline-block',
      marginLeft: 6,
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
  },
  table: tableStyles
})

const TableMerchants = ({data}) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <div className={classes.container}>
      <h3>
        <img className={classes.storeIcon} alt="offline" src={shopOffline} />&nbsp;
        {t('withAddressTitle')}
      </h3>
      <h4>{t('withAddressSub')}</h4>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>{t('name')}</th>
            <th className="">{t('onoff')}</th>
            <th>{t('desc')}</th>
            <th>{t('address')}</th>
          </tr>
        </thead>
      <tbody>
        {data.map((m, key) => {
            const { name, description, address, website, coordinates} = m

            return (
              <tr key={key} className={key % 2 === 0 ? 'odd' : ''}>
                <td>
                  {linkExt(website, name)}
                </td>
                <td className={["center", classes.nowrap].join(' ')}>
                  {isOffline(m) && <img alt="offline" src={shopOffline}
                    className={classes.storeIcon} />}
                  {isOnline(m) && <img alt="online" src={shopOnline}
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
