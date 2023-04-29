import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'
// import Todo from './Todo'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoInputName: '',
    displayCompleteds: true,
  }
  
  onTodoNameInputChange = evt => {
    const { value } = evt.target
    this.setState({ ...this.state, todoInputName: value })
  }

  resetForm = () => {
    this.setState({ ...this.state, todoInputName: '' })
  }

  setAxiosResponseError = err => {
    this.setState({ ...this.state, error: err.response.data.message })
  }

  postNewTodo = () => {
    axios.post(URL, { name: this.state.todoInputName})
    .then(res => {
      this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
      this.resetForm()
    })
    .catch(err => {
      this.setAxiosResponseError(err)
    })
  }

  fetchAllTodos = () => {
  axios.get(URL)
    .then(res => {
      this.setState({ ...this.state, todos: res.data.data })
    })
    .catch(err => {
      this.setAxiosResponseError(err)
    })
}

onTodoFormSubmit = evt => {
  evt.preventDefault();
  this.postNewTodo()
}

toggleCompleted = id => () => {
  axios.patch(`${URL}/${id}`)
    .then(res => {
      this.setState({ ...this.state, todos: this.state.todos.map(td => {
        if (td.id !== id) return td
        return res.data.data
      })})
    })
    .catch(err => {
      this.setAxiosResponseError(err)
    })
}

toggleDisplayCompleteds = () => {
  this.setState({ ...this.state, displayCompleteds: !this.state.displayCompleteds})
}

  componentDidMount() {
    this.fetchAllTodos()
  }

  render() {
    return (
      <div>
        <div id='error'>{this.state.error}</div>
        <TodoList 
          todos={this.state.todos}
          displayCompleteds={this.state.displayCompleteds}
          toggleCompleted={this.toggleCompleted}
        />
        <Form 
          onTodoFormSubmit={this.onTodoFormSubmit}
          todoInputName={this.state.todoInputName}
          onTodoNameInputChange={this.state.onTodoNameInputChange}
          toggleDisplayCompleteds={this.toggleDisplayCompleteds}
          displayCompleteds={this.state.displayCompleteds}
        />
      </div>
    )
  }
}
