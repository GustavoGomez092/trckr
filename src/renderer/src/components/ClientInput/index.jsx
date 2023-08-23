import { useContext } from 'react'
import { MainStore } from '../../App'
export default function TextInput() {
  const store = useContext(MainStore)

  return (
    <input
      type="text"
      placeholder="Client name..."
      onChange={(e) => store.setTaskClient(e.target.value)}
      className="input input-bordered w-full max-w-xs mb-2"
    />
  )
}
