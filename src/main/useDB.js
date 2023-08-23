import storage from 'electron-storage'
const filePath = 'tasks/tskrDB'

const useDB = () => {
  const dbExists = async () => {
    return new Promise((resolve, reject) => {
      try {
        storage.isPathExists(`${filePath}.json`).then((exists) => {
          resolve(exists)
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  const get = async () => {
    return new Promise((resolve, reject) => {
      try {
        storage
          .get(filePath)
          .then((data) => {
            resolve(data)
          })
          .catch((err) => {
            console.error(err)
          })
      } catch (error) {
        reject(error)
      }
    })
  }

  const set = async (data) => {
    return new Promise((resolve, reject) => {
      try {
        storage
          .set(filePath, data)
          .then(async () => {
            const data = await get()
            resolve(data)
          })
          .catch((err) => {
            console.error(err)
          })
      } catch (error) {
        reject(error)
      }
    })
  }

  const create = async () => {
    return new Promise((resolve, reject) => {
      try {
        storage
          .set(filePath, {
            dbVersion: 1,
            author: 'Gustavo Gomez',
            tasks: []
          })
          .then(async () => {
            resolve()
          })
          .catch((err) => {
            console.error(err)
          })
      } catch (error) {
        reject(error)
      }
    })
  }

  const db = async () => {
    const exists = await dbExists()
    if (!exists) {
      console.log('Database does not exist')
      create()
    } else {
      console.log('Database exists')
    }
  }

  db()

  // Clear database use for dev only
  // storage.remove(`${filePath}.json`).then((err) => {
  //   console.log('Database cleared')
  //   db()
  //   if (err) {
  //     console.log(err)
  //   }
  // })

  return {
    get,
    set
  }
}

export default useDB
