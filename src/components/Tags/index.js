import './index.css'

const Tags = props => {
  const {details, taggedTasks} = props
  const {displayText} = details
  const onToggle = () => {
    taggedTasks(displayText)
  }
  return (
    <li className="button-item">
      <button type="button" onClick={onToggle}>
        {displayText}
      </button>
    </li>
  )
}

export default Tags
