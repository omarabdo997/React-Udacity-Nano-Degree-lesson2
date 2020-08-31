import API from 'goals-todos-api'

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

function addTodo (id, name, complete) {
    return {
        type: ADD_TODO,
        todo: {
            id,
            name,
            complete
        }
    }
}

function removeTodo(id) {
    return {
        type: REMOVE_TODO,
        id
    }
}

function toggleTodo(id) {
    return {
        type: TOGGLE_TODO,
        id
    }
}

export function handleAddTodo(name, cb) {
    return (dispatch) => {
        API.saveTodo(name)
            .then(todo => {
                dispatch(addTodo(todo.id,todo.name,todo.complete))
                cb();
            })
            .catch(() => alert('An error occured'))
    }
}

export function handleDeleteTodo(todo) {
    return (dispatch) => {
        dispatch(removeTodo(todo.id))
        API.deleteTodo(todo.id)
        .catch(() => {
            dispatch(addTodo(todo.id, todo.name, todo.complete));
            alert('an error occured')
        })
    }
     
}

export function handleToggleTodo (id) {
    return (dispatch) => {
        dispatch(toggleTodo(id))
        API.saveTodoToggle(id)
            .catch(() => {
                dispatch(toggleTodo(id));
                alert('A error occured try again..')
            })
    }
}