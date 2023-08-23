import { useEffect, useState } from 'react'

const useDB = () => {
  const [db, setDb] = useState(null)

  useEffect(() => {
    window.electron.ipcRenderer.send('dbGet')
    window.electron.ipcRenderer.on('dbData', (event, arg) => {
      setDb(arg)
    })
  }, [])

  const get = () => {
    return db
  }
  const set = (data) => {
    window.electron.ipcRenderer.send('dbSet', data)
  }

  return { db, get, set }
}

export default useDB
