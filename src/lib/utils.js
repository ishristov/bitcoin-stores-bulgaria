export function truncate (string, length = 50) {
  if (string.length <= length) {
    return string
  }

  return string.slice(0, length) + '...'
}

export function linkExt (url, label) {
  return <a href={url} target="_blank" rel="noopener noreferrer nofollow">{label}</a>
}

export function isOffline (m) {
  return m.physical === 'yes'
}

export function isOnline (m) {
  return m.online === 'yes'
}

export function isOnlineOnly (m) {
  return !m.coordinates
}

export function sortBy( a, b, property ) {
  if ( a[property] < b[property] ){
    return -1;
  }
  if ( a[property] > b[property] ){
    return 1;
  }
  return 0;
}
