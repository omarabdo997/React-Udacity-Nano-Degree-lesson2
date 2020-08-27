function createStore (reducer) {
    let state 
    let listeners = []
    const getState = () => state
    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }
    return {
        getState,
        subscribe,
        dispatch
    }
}
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const REMOVE_GOAL = 'REMOVE_GOAL'
const ADD_GOAL = 'ADD_GOAL'
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
            return state.concat([action.todo])
        case REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.id)
        case TOGGLE_TODO:
            return state.map((todo) => {
                if (todo.id === action.id) todo.completed = !todo.completed
                return todo
            })
        default:
            return state                        
    }
}
function goals (state = [], action) {
    switch(action.type) {
        case ADD_GOAL:
            return state.concat([action.goal])
        case  REMOVE_GOAL:
            return state.filter((goal) => goal.id !== action.id)
        default:
            return state      
    }
}

function app (state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}
const store = createStore(app)
const unsubscribe = store.subscribe(() => {
    console.log('The new state is: ', store.getState())
})


store.dispatch(addTodoAction(0, 'learn React', false))
store.dispatch(addGoalAction(0,'learn React'))

