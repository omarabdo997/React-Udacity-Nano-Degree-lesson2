function generateId () {
    return `${Math.floor(Math.random()*1000)}-${Math.floor(Math.random()*1000)}-${Math.floor(Math.random()*1000)}`;
}
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const REMOVE_GOAL = 'REMOVE_GOAL';
const ADD_GOAL = 'ADD_GOAL';
const RECIEVE_DATA = 'RECIEVE_DATA';
function recieveDataAction(todos, goals) {
    return {
        type: RECIEVE_DATA,
        todos,
        goals
    }
}
function addTodoAction (id, name, complete) {
    return {
        type: ADD_TODO,
        todo: {
            id,
            name,
            complete
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
function handelDeleteGoal(goal) {
    return (dispatch) => {
        dispatch(removeGoalAction(goal.id))
        API.deleteGoal(goal.id)
            .catch(() => {
                dispatch(addGoalAction(goal.id,goal.name));
                alert('An error occured')
            })
    }
}
function handleDeleteTodo(todo) {
    return (dispatch) => {
        dispatch(removeTodoAction(todo.id))
        API.deleteTodo(todo.id)
        .catch(() => {
            dispatch(addTodoAction(todo.id, todo.name, todo.complete));
            alert('an error occured')
        })
    }
     
}
function handleAddTodo(name, cb) {
    return (dispatch) => {
        API.saveTodo(name)
            .then(todo => {
                dispatch(addTodoAction(todo.id,todo.name,todo.complete))
                cb();
            })
            .catch(() => alert('An error occured'))
    }
}
function handleAddGoal(name, cb) {
    return (dispatch) => {
        API.saveGoal(name)
            .then(goal => {
                dispatch(addGoalAction(goal.id,goal.name,goal.complete))
                cb();
            })
            .catch(() => alert('An error occured'))
    }
}
function handleToggleTodo (id) {
    return (dispatch) => {
        dispatch(toggleTodoAction(id))
        API.saveTodoToggle(id)
            .catch(() => {
                dispatch(toggleTodoAction(id));
                alert('A error occured try again..')
            })
    }
}
function handleInitialData() {
    return (dispatch) => {
        Promise.all([
            API.fetchTodos(),
            API.fetchGoals()
        ]).then(([todos, goals]) => {
            dispatch(recieveDataAction(todos, goals))
        })
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
                if (todo.id === action.id) todo.complete = !todo.complete;
                return todo;
            })
        case RECIEVE_DATA:
            return action.todos    
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
        case RECIEVE_DATA:
            return action.goals        
        default:
            return state ;    
    }
}
function loading (state=true, action) {
    switch (action.type) {
        case RECIEVE_DATA:
            return false
        default:
            return state    
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
const thunk = (store) => (next) => (action) => {
    if(typeof action == 'function') {
        return action(store.dispatch)
    } else {
        return next(action)
    }
}
const store = Redux.createStore(Redux.combineReducers({
    todos,
    goals,
    loading
}), Redux.applyMiddleware(ReduxThunk.default, checker, logger))