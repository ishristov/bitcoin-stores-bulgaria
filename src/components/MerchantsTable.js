import React from 'react'
import {createUseStyles} from 'react-jss'
import { linkExt } from '../lib/utils'
import shopOffline from '../images/shop-offline.png'
import shopOnline from '../images/shop-online2.png'

const useStyles = createUseStyles({
  table: {
    marginTop: 20,
    fontSize: 12,
    borderCollapse: 'collapse',
    borderSpacing: 0,
    width: '100%',
    border: 'none',

    '& > thead': {
      borderBottom: '1px solid #ddd',
    },

    '& > thead > tr > th': {
      backgroundColor: '#d9edf7',
      fontWeight: 700,
      verticalAlign: 'middle',
      padding: 8,
    },

    '& > tbody > tr.odd': {
      backgroundColor: '#f9f9f9',
    },

    '& > tbody > tr > td': {
      padding: 8,
      borderBottom: '1px solid #ddd',
    }
  },
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

const MerchantsTable = ({data, typesObj}) => {
  const classes = useStyles()

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Име на обекта</th>
          <th>Физически или онлайн</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {data.map(({ name, description, address, website, physical, online, coordinates}, key) => {
          const isOffline = physical === 'yes'
          const isOnline = online === 'yes'

          return (
            <tr key={key} className={key % 2 === 0 && 'odd'}>
              <td className={classes.infoWindowName}>
                {/* <img width="12" src={`images/type-${typeidx}.png`} />&nbsp; */}
                {linkExt(website, name)}
              </td>
              {/* <td><img width="18" src={`images/type-${typeidx}.png`} /> {typesObj[typeidx]}</td> */}
              <td className={["center", classes.nowrap].join(' ')}>
                {isOffline && <img height="20" alt="offline" src={shopOffline}
                  className={classes.storeIcon} />}
                {isOnline && <img height="20" alt="online" src={shopOnline}
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
  )
}

export default MerchantsTable
