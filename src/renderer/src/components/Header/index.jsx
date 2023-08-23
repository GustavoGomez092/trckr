import './styles.css'
import { useContext } from 'react'
import { MainStore } from '../../App'

export default function Header() {
  const store = useContext(MainStore)
  return (
    <div className="titlebar flex justify-between">
      <div className="dragger">
        <svg width="20px" height="20px" viewBox="0 0 25 25" className="cursor-pointer">
          <path
            className="transition-colors duration-200 ease-in-out"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.5 8C10.3284 8 11 7.32843 11 6.5C11 5.67157 10.3284 5 9.5 5C8.67157 5 8 5.67157 8 6.5C8 7.32843 8.67157 8 9.5 8ZM9.5 14C10.3284 14 11 13.3284 11 12.5C11 11.6716 10.3284 11 9.5 11C8.67157 11 8 11.6716 8 12.5C8 13.3284 8.67157 14 9.5 14ZM11 18.5C11 19.3284 10.3284 20 9.5 20C8.67157 20 8 19.3284 8 18.5C8 17.6716 8.67157 17 9.5 17C10.3284 17 11 17.6716 11 18.5ZM15.5 8C16.3284 8 17 7.32843 17 6.5C17 5.67157 16.3284 5 15.5 5C14.6716 5 14 5.67157 14 6.5C14 7.32843 14.6716 8 15.5 8ZM17 12.5C17 13.3284 16.3284 14 15.5 14C14.6716 14 14 13.3284 14 12.5C14 11.6716 14.6716 11 15.5 11C16.3284 11 17 11.6716 17 12.5ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z"
          />
        </svg>
      </div>
      <div className="report h-5 w-5">
        {store.isTask && (
          <svg viewBox="0 0 256 256" onClick={() => store.reportWindow()}>
            <g>
              <g>
                <path
                  d="M74.4,10h107.3c8.9,0,16.5,3.2,22.8,9.4c6.3,6.3,9.4,13.9,9.4,22.8V246L128,181.6L42.2,246V42.2c0-8.9,3.2-16.5,9.4-22.8
        C57.9,13.2,65.5,10,74.4,10L74.4,10z M181.6,31.5H74.4c-3,0-5.5,1-7.6,3.1s-3.1,4.6-3.1,7.6v160.9l64.3-48.3l64.4,48.3V42.2
        c0-3-1-5.5-3.1-7.6C187.1,32.5,184.6,31.5,181.6,31.5L181.6,31.5z"
                />
              </g>
            </g>
          </svg>
        )}
        {store.isReport && (
          <svg
            fill="currentColor"
            className="bi bi-check"
            viewBox="0 0 16 16"
            onClick={() => store.newTaskWindow()}
          >
            {' '}
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />{' '}
          </svg>
        )}
      </div>
    </div>
  )
}
