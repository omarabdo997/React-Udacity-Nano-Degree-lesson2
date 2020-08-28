function generateId () {
    return `${Math.floor(Math.random()*1000)}-${Math.floor(Math.random()*1000)}-${Math.floor(Math.random()*1000)}`;
}
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const REMOVE_GOAL = 'REMOVE_GOAL';
const ADD_GOAL = 'ADD_GOAL';
function addTodoAction (id, name, completed) {
    return {
        type: ADD_TODO,
        todo: {
            id,
            name,
            completed
        }
    }
}
function removeTodoAction(id) {
    return {
        type: REMOVE_TODO,
        id
    }
}
function toggleTodoAction(id) {
    return {
        type: TOGGLE_TODO,
        id
    }
}
function addGoalAction (id, name) {
    return {
        type: ADD_GOAL,
        goal: {
            id,
            name
        }
    }
}
function removeGoalAction(id) {
    return {
        type: REMOVE_GOAL,
        id
    }
}

function todos (state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return state.concat([action.todo]);
        case REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.id);
        case TOGGLE_TODO:
            return state.map((todo) => {
                if (todo.id === action.id) todo.completed = !todo.completed;
                return todo;
            })
        default:
            return state ;                       
    }
}
function goals (state = [], action) {
    switch(action.type) {
        case ADD_GOAL:
            return state.concat([action.goal]);
        case  REMOVE_GOAL:
            return state.filter((goal) => goal.id !== action.id);
        default:
            return state ;    
    }
}
const checker = (store) => (next) => (action) => {
    if (action.type === ADD_TODO && 
        action.todo.name.toLowerCase().includes('bitcoin')
    ) {
        return alert("nope that's a bad request")
    }
    return next(action)
}
const logger = (store) => (next) => (action) => {
    console.group(action.type)
        console.log('the action: ', action)
        const result = next(action)
        console.log('the new state: ',store.getState())
    console.groupEnd()
    return result
}
const greatGoal = (store) => (next) => (action) => {
    if (action.type === ADD_GOAL) {
        alert("That's a GREAT GOAL !")
    } else if (action.type === ADD_TODO) {
        alert(`Don't forget to ${action.todo.name}`)
    }
    return next(action)
}

const store = Redux.createStore(Redux.combineReducers({
    todos,
    goals
}), Redux.applyMiddleware(checker, logger, greatGoal))