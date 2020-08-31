import React from 'react'
import {connect} from 'react-redux'
import List from './List'
import {
    handleAddTodo,
    handleDeleteTodo,
    handleToggleTodo
} from '../actions/todos'


class Todos extends React.Component {
    handleClick = (e) => {
        this.props.dispatch(handleAddTodo(
            this.input.value,
            () => this.input.value = ''
        ))
    }
    remove = (todo) => {
        this.props.dispatch(handleDeleteTodo(todo));
    }
    toggle = (id) => {
        this.props.dispatch(handleToggleTodo(id))
    }
    render () {
        return (
            <div>
                <h1>TODOS</h1>
                <input 
                    type='text'
                    placeholder='Add Todo'
                    ref={(input) => {this.input = input}} 
                />
                <input
                    type='button' 
                    value='Add Todo'
                    onClick={this.handleClick}
                />
                <List items = {this.props.todos} remove={this.remove} toggle={this.toggle}/>
            </div>
        )
    }
}
export default connect((state) => ({
    todos: state.todos
}))(Todos)