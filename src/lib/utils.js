export function truncate (string, length = 50) {
  if (string.length <= length) {
    return string
  }

  return string.slice(0, length) + '...'
}

export function linkExt (url, label) {
  return <a href={url} target="_blank" rel="noopener noreferrer nofollow">{label}</a>
}
