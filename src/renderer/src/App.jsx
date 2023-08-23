import Header from './components/Header'
import TextInput from './components/TextInput'
import ClientInput from './components/ClientInput'
import Reports from './components/Reports'
import useWindowResize from './hooks/useWindowResize'
import useDB from './hooks/useDB'
import useNotification from './hooks/useNotification'
import { createContext, useState, useEffect, useRef } from 'react'

export const MainStore = createContext()

function App() {
  const [taskTitle, setTaskTitle] = useState()
  const [taskClient, setTaskClient] = useState()
  const [duration, setDuration] = useState(0)
  const [running, setRunning] = useState(false)
  const modalWindow = useRef()
  const [modalContent, setModalContent] = useState({
    title: 'Hello!',
    message: 'modalMessage',
    buttons: [
      {
        label: 'Close',
        action: () => {
          modalWindow.current.close()
        },
        type: 'primary'
      }
    ]
  })

  const {
    isMini,
    isTask,
    isReport,
    newTaskWindow,
    reportWindow,
    miniWindow,
    miniUnhoverWindow,
    miniHoverWindow
  } = useWindowResize()

  const { notify } = useNotification()

  const { db, set } = useDB()

  const startTask = () => {
    miniWindow()
    startTimer()
  }

  useEffect(() => {
    if (duration === 1 && running) {
      notify({
        title: 'Trckr started',
        body: 'You have started working on a new task for ' + taskClient
      })
    }
    if ((duration / 60) % 30 === 0 && running) {
      notify({
        title: 'Still working on ' + taskClient + '?',
        body:
          'You have been working on ' +
          taskClient +
          ' for ' +
          Math.floor(duration / 60) +
          ' minutes'
      })
    }
  }, [duration])

  useEffect(() => {
    let interval
    if (running) {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1)
      }, 1000)
    } else if (!running) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [running])

  const startTimer = () => {
    setRunning(true)
  }

  const stopTimer = () => {
    setRunning(false)
  }

  const resetTimer = () => {
    setDuration(0)
  }

  const toggleTimer = () => {
    setRunning(!running)
  }

  const setTask = () => {
    stopTimer()
    resetTimer()
    const newDB = db
    newDB.tasks.push({ client: taskClient, title: taskTitle, duration: duration, date: new Date() })
    set(newDB)
    newTaskWindow()
  }

  return (
    <MainStore.Provider
      value={{
        taskTitle,
        setTaskTitle,
        startTask,
        reportWindow,
        isReport,
        isTask,
        taskClient,
        setTaskClient,
        newTaskWindow,
        modalWindow,
        setModalContent
      }}
    >
      <div id="main-container" className={isMini ? 'active' : ''}>
        <Header />
        <div
          className="mx-auto px-4 pb-2 flex flex-col items-center"
          onMouseEnter={() => miniHoverWindow()}
          onMouseLeave={() => miniUnhoverWindow()}
        >
          {isMini && (
            <>
              <span className="countdown font-mono text-md mt-2">
                <span style={{ '--value': Math.floor(duration / 3600) }}></span>:
                <span style={{ '--value': Math.floor((duration / 60) % 60) }}></span>:
                <span style={{ '--value': Math.floor(duration % 60) }}></span>
              </span>
              <div className="flex flex-row gap-2 mt-3">
                <button
                  className={`btn btn-circle w-8 h-8 min-h-0 hover:bg-blue-600 hover:text-white ${
                    !running ? 'bg-blue-600 text-white' : ''
                  }`}
                  onClick={() => toggleTimer()}
                >
                  {running ? (
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pause"
                      viewBox="0 0 16 16"
                    >
                      {' '}
                      <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />{' '}
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-play"
                      viewBox="0 0 16 16"
                    >
                      {' '}
                      <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />{' '}
                    </svg>
                  )}
                </button>
                <button
                  className="btn btn-circle w-8 h-8 min-h-0 hover:bg-green-600 hover:text-white"
                  onClick={() => setTask()}
                >
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check"
                    viewBox="0 0 16 16"
                  >
                    {' '}
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />{' '}
                  </svg>
                </button>
              </div>
            </>
          )}
          {isTask && (
            <>
              <h1 className="mb-4 font-bold">CREATE A NEW TASK</h1>
              <ClientInput />
              <TextInput />
              <button className="btn btn-primary" disabled={!taskTitle} onClick={() => startTask()}>
                START TASK
              </button>
            </>
          )}
          {isReport && <Reports />}
        </div>
      </div>
      <dialog ref={modalWindow} className="modal">
        <form method="dialog" className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">{modalContent.title}</h3>
          <p className="py-4">{modalContent.message}</p>
          <div className="modal-action">
            {modalContent.buttons.map((button, index) => {
              return (
                <button
                  key={index}
                  className={`btn ${button.type === 'error' ? 'btn-error' : 'primary'}`}
                  onClick={button.action}
                >
                  {button.label}
                </button>
              )
            })}
          </div>
        </form>
      </dialog>
    </MainStore.Provider>
  )
}

export default App
