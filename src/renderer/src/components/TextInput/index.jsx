import { useContext, useState, useEffect } from 'react'
import { MainStore } from '../../App'
export default function TextInput() {
  const [placeholder, setPlaceholder] = useState('')
  const store = useContext(MainStore)

  useEffect(() => {
    setPlaceholder(randomTasks())
  }, [])

  const randomTasks = () => {
    const randomTasks = [
      'Go on a cruise',
      'Go on safari',
      'Celebrate another country’s holiday',
      'Hike in a rainforest',
      'See penguins in their natural habitat',
      'Go to an aquarium',
      'Swim with jellyfish',
      'Pan for gold',
      'Attend a luau',
      'Sleep on a houseboat',
      'Sleep in a teepee or yurt',
      'Stay at a bed and breakfast',
      'Stay in a resort hotel',
      'Stay in an underwater hotel',
      'Stay the night in a treehouse home',
      'Stay in an ice hotel',
      'Travel in a train',
      'See all 7 continents',
      'Go wine tasting at a vineyard',
      'Visit a butterfly sanctuary',
      'See the monarch butterfly migration',
      'Visit a castle',
      'Visit all 50 US states',
      'Walk on a glacier',
      'World domination',
      'Swim in a hot spring',
      'See the northern lights',
      'See redwood trees',
      'See an alligator in the wild',
      'Swim with the dolphins',
      'Learn how to hula',
      'Go snorkeling',
      'Swim with sharks',
      'Ride horses on the beach',
      'Attend the Olympics',
      'Visit an elephant sanctuary',
      'Take a hot air balloon ride',
      'Live in a foreign country',
      'Go scuba diving'
    ]

    return randomTasks[Math.floor(Math.random() * randomTasks.length)]
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && store.taskTitle !== '') {
      store.startTask()
    }
  }

  return (
    <input
      type="text"
      placeholder={`${placeholder}...`}
      onChange={(e) => store.setTaskTitle(e.target.value)}
      className="input input-bordered w-full max-w-xs mb-2"
      onKeyPress={(e) => handleKeyPress(e)}
    />
  )
}
