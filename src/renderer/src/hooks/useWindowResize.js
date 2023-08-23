import { useState } from 'react'

const useWindowResize = () => {
  const [isMini, setIsMini] = useState(false)
  const [isReport, setIsReport] = useState(false)
  const [isTask, setIsTask] = useState(true)
  const resizeWindow = (data = { width: 0, height: 0, x: 0, y: 0 }) => {
    console.log(data)
    window.electron.ipcRenderer.send('resize', data)
  }
  const miniWindow = () => {
    setIsMini(true)
    setIsReport(false)
    setIsTask(false)
    window.electron.ipcRenderer.send('miniWindow')
  }

  const miniUnhoverWindow = () => {
    if (isMini) window.electron.ipcRenderer.send('miniUnhoverWindow')
  }

  const miniHoverWindow = () => {
    if (isMini) window.electron.ipcRenderer.send('miniHoverWindow')
  }

  const newTaskWindow = () => {
    setIsMini(false)
    setIsReport(false)
    setIsTask(true)
    window.electron.ipcRenderer.send('taskWindow')
  }

  const reportWindow = () => {
    setIsMini(false)
    setIsReport(true)
    setIsTask(false)
    window.electron.ipcRenderer.send('reportWindow')
  }

  return {
    isMini,
    isReport,
    isTask,
    resizeWindow,
    miniWindow,
    miniHoverWindow,
    miniUnhoverWindow,
    newTaskWindow,
    reportWindow
  }
}

export default useWindowResize
