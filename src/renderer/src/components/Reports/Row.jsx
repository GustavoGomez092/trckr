import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import useDB from '../../hooks/useDB'
import { MainStore } from '../../App'

export default function Row({ client, title, hours, time, day, date }) {
  const [copied, setCopied] = useState(false)
  const { db, set } = useDB()
  const store = useContext(MainStore)

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  const deleteEntry = () => {
    const modal = store.modalWindow.current
    store.setModalContent({
      title: 'Delete entry',
      message: 'Are you sure you want to delete this entry?',
      buttons: [
        {
          label: 'Cancel',
          action: () => {},
          type: 'secondary'
        },
        {
          label: 'Delete',
          action: () => {
            const newEntries = db.tasks.filter((entry) => entry.title !== title)
            set({ tasks: newEntries })
          },
          type: 'error'
        }
      ]
    })
    modal.showModal()
  }

  return (
    <tr>
      <td>
        <svg
          x="0px"
          y="0px"
          className="w-5 h-5 fill-slate-600 hover:fill-red-500 cursor-pointer transition-all transform scale-100 hover:scale-105"
          viewBox="0 0 24 24"
          onClick={() => deleteEntry()}
        >
          <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path>
        </svg>
      </td>
      <td>{client}</td>
      <td className="flex items-center gap-x-2">
        <div
          className="indicator cursor-pointer max-w-[200px]"
          onClick={() => {
            copyToClipboard(title)
          }}
        >
          <span
            className={`indicator-item badge badge-gray-200 text-[10px] -top-3 ${
              copied ? 'opacity-100' : 'opacity-0'
            }`}
          >
            copied
          </span>
          {title}
        </div>
      </td>
      <td>{hours}</td>
      <td>{time}</td>
      <td>{day}</td>
      <td>{date}</td>
    </tr>
  )
}

Row.propTypes = {
  client: PropTypes.string,
  title: PropTypes.string,
  hours: PropTypes.number,
  time: PropTypes.string,
  day: PropTypes.string,
  date: PropTypes.string
}
