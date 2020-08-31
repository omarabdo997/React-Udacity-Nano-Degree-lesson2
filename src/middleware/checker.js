import {ADD_TODO} from '../actions/todos'

const checker = (store) => (next) => (action) => {
    if (action.type === ADD_TODO && 
        action.todo.name.toLowerCase().includes('bitcoin')
    ) {
        return alert("nope that's a bad request")
    }
    return next(action)
}
export default checker;