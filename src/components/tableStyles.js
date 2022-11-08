export const tableStyles = {
  marginTop: 20,
  fontSize: 12,
  borderCollapse: 'collapse',
  borderSpacing: 0,
  width: '100%',
  border: 'none',

  '& > thead': {
    borderBottom: '1px solid #ddd',
  },

  '& tr > th': {
    textAlign: 'left',
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
}