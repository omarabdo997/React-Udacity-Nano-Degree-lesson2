import {
    ADD_TODO,
    REMOVE_TODO,
    TOGGLE_TODO
} from '../actions/todos'
import {RECIEVE_DATA} from '../actions/shared'

export default function todos (state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return state.concat([action.todo]);
        case REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.id);
        case TOGGLE_TODO:
            return state.map((todo) => {
                if (todo.id === action.id) todo.complete = !todo.complete;
                return todo;
            })
        case RECIEVE_DATA:
            return action.todos    
        default:
            return state ;                       
    }
}