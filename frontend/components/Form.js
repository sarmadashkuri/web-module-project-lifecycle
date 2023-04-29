import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <>
      <form onSubmit={this.props.onTodoFormSubmit} id='todoForm'>
          <input type='text' value={this.props.todoInputName} onChange={this.props.onTodoNameInputChange} placeholder='type todo here'></input>
          <input type='submit'></input>
        </form>
        <button onClick={this.props.toggleDisplayCompleteds}>{this.props.displayCompleteds ? 'Hide' : 'Show'} Completed</button>
      </>
    )
  }
}
