import React from 'react'
import {createUseStyles} from 'react-jss'
import { linkExt } from '../lib/utils'
import shopOffline from '../images/shop-offline.png'
import shopOnline from '../images/shop-online.png'

const useStyles = createUseStyles({
  table: {
    fontSize: 12,
  },
  storeIcon: {
    // display: 'inline-block',
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

const MerchantsTable = ({data, typesObj}) => {
  const classes = useStyles()

  return (
    <>
      <table className={classes.table} border="1">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {data.map(({ name, description, address, website, physical, online, coordinates}, key) => {
            const isOffline = physical === 'yes'
            const isOnline = online === 'yes'

            return (
              <tr key={key}>
                <td className={classes.infoWindowName}>
                  {/* <img width="12" src={`images/type-${typeidx}.png`} />&nbsp; */}
                  {linkExt(website, name)}
                </td>
                {/* <td><img width="18" src={`images/type-${typeidx}.png`} /> {typesObj[typeidx]}</td> */}
                <td className={classes.nowrap}>
                  {isOffline && <img width="18" alt="offline" src={shopOffline}
                    className={classes.storeIcon} />}
                  {isOnline && <img width="18" alt="online" src={shopOnline}
                    className={[classes.storeIcon, classes.storeOnline].join(' ')} />}
                </td>
                <td>{description}</td>
                <td>
                  {address}
                  <br/>
                  &#9873;&nbsp; {linkExt(`https://www.google.com/maps/search/${address}/`, 'Google Maps')},&nbsp;
                  <span className={classes.latlngIcon}>&#8982;</span> {linkExt(`https://www.google.com/maps?ll=${coordinates}`, 'Lat Lang')}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default MerchantsTable
