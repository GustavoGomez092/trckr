import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRangePicker } from 'react-date-range'
import { useState, useEffect } from 'react'
import Row from './Row'
import useDB from '../../hooks/useDB'

export default function Reports() {
  const [interval, setInterval] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  })
  const [entries, setEntries] = useState([])

  const handleSelect = (ranges) => {
    setInterval(ranges.selection)
  }

  const { db } = useDB()

  useEffect(() => {
    sortedEntries()
  }, [db, interval])

  const sortedEntries = () => {
    if (!db) return
    const entries = db.tasks

    const newEntries = entries.filter((entry) => {
      const date = new Date(entry.date)
      date.setHours(0, 0, 0, 0)
      const start = new Date(interval.startDate)
      start.setHours(0, 0, 0, 0)
      const end = new Date(interval.endDate)
      end.setHours(0, 0, 0, 0)

      return date >= start && date <= end
    })

    setEntries(newEntries)
  }

  const getDay = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const day = new Date(date).getDay()
    return days[day]
  }

  const secondsToHms = (seconds) => {
    // convert seconds to hours, minutes and seconds
    const h = Math.floor(seconds / 3600).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
    const m = Math.floor((seconds / 60) % 60).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
    const s = Math.floor(seconds % 60).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
    return `${h}:${m}:${s}`
  }

  const compoundTime = (seconds) => {
    const hours = seconds / 3600
    // round anything less than 0 to .5
    const roundHours = Math.floor(hours)
    let minutes = hours % 1
    if (minutes < 0.5) minutes = 0.5
    else if (minutes > 0.5) minutes = 1

    const finalNumber = roundHours + minutes

    return finalNumber
  }

  function getFormattedDate(date) {
    var year = date.getFullYear()

    var month = (1 + date.getMonth()).toString()
    month = month.length > 1 ? month : '0' + month

    var day = date.getDate().toString()
    day = day.length > 1 ? day : '0' + day

    return month + '/' + day + '/' + year
  }

  return (
    <div className="w-full flex flex-col gap-6 mt-6">
      <div>
        <DateRangePicker ranges={[interval]} onChange={(e) => handleSelect(e)} />
      </div>
      <div className="overflow-x-auto max-h-[300px]">
        <table className="table table-xs table-pin-rows w-full">
          <thead>
            <tr>
              <th></th>
              <td>Client</td>
              <td>Task</td>
              <td>hours</td>
              <td>Time</td>
              <td>Day</td>
              <td>Date</td>
            </tr>
          </thead>
          <tbody>
            {db &&
              entries.map((entry, index) => {
                return (
                  <Row
                    key={index}
                    client={entry.client}
                    title={entry.title}
                    hours={compoundTime(entry.duration)}
                    time={secondsToHms(entry.duration)}
                    day={getDay(entry.date)}
                    date={getFormattedDate(new Date(entry.date))}
                  />
                )
              })}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <td>Client</td>
              <td>Task</td>
              <td>hours</td>
              <td>Time</td>
              <td>Day</td>
              <td>Date</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
