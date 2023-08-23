const useNotification = () => {
  const notify = ({ title, body }) => {
    window.electron.ipcRenderer.send('notify', { title, body })
  }

  return { notify }
}

export default useNotification
