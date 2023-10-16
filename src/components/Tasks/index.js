import './index.css'

const Tasks = props => {
  const {details} = props
  const {searchInput, option} = details
  return (
    <li>
      <p>{searchInput}</p>
      <div>
        <p>{option}</p>
      </div>
    </li>
  )
}

export default Tasks
