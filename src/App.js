import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import Tags from './components/Tags'
import Tasks from './components/Tasks'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    list: [],
    searchInput: '',
    option: tagsList[0].displayText,
    optionId: tagsList[0].optionId,
    isActive: false,
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onSelect = event => {
    this.setState({option: event.target.value, optionId: event.target.value})
  }

  addItem = event => {
    event.preventDefault()
    const {option, searchInput, optionId} = this.state
    const newItem = {
      id: uuidv4(),
      searchInput,
      option,
      optionId: optionId.toUpperCase(),
    }
    this.setState(prev => ({
      list: [...prev.list, newItem],
      searchInput: '',
      option: tagsList[0].displayText,
      optionId: tagsList[0].optionId,
    }))
  }

  taggedTasks = displayText => {
    const {list} = this.state
    list.map(each => {
      if (each.option === displayText) {
        this.setState(prev => ({isActive: !prev.isActive}))
      }
      return each
    })
  }

  render() {
    const {list, searchInput, option, optionId, isActive} = this.state
    const filteredList = list.filter(each => each.option === option)
    console.log(list)
    return (
      <div className="bg-container">
        <div className="left-container">
          <h1 className="main-heading">Create a task!</h1>
          <form onSubmit={this.addItem}>
            <label htmlFor="task" className="label">
              Task
            </label>
            <input
              type="text"
              placeholder="Enter the task here"
              className="input"
              value={searchInput}
              onChange={this.onSearch}
              id="task"
            />
            <label htmlFor="tag" className="label">
              Tags
            </label>
            <select
              className="select"
              onChange={this.onSelect}
              value={option}
              id="tag"
            >
              {tagsList.map(each => (
                <option>{each.displayText}</option>
              ))}
            </select>
            <button type="submit" className="button">
              Add Task
            </button>
          </form>
        </div>
        <div className="right-container">
          <h1>Tags</h1>
          <ul className="tags-list">
            {tagsList.map(each => (
              <Tags
                details={each}
                key={each.optionId}
                taggedTasks={this.taggedTasks}
              />
            ))}
          </ul>
          <h1>Tasks</h1>
          <ul>
            {isActive &&
              filteredList.map(each => <Tasks details={each} key={each.id} />)}
            {!isActive &&
              list.map(each => <Tasks details={each} key={each.id} />)}
          </ul>
          {list.length === 0 && <p>No Tasks Added Yet</p>}
        </div>
      </div>
    )
  }
}

export default App
