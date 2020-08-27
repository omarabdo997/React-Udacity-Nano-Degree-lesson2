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

function app (state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}
const store = Redux.createStore(Redux.combineReducers({
    todos,
    goals
}), Redux.applyMiddleware(checker, logger, greatGoal))
const unsubscribe = store.subscribe(() => {
    const {todos, goals} = store.getState()
    document.getElementById('todos').innerHTML= ''
    document.getElementById('goals').innerHTML = ''
    todos.forEach((todo) => addTodoDOM(todo))
    goals.forEach((goal) => addGoalDOM(goal))
})



function addTodo () {
    const input = document.getElementById('todo')
    const name = input.value
    input.value = ''
    store.dispatch(addTodoAction(generateId(), name, false))
}

function addGoal () {
    const input = document.getElementById('goal')
    const name = input.value
    input.value = ''
    store.dispatch(addGoalAction(generateId(), name))
}
const todoButton = document.getElementById('todoButton')
const goalButton = document.getElementById('goalButton')
todoButton.addEventListener('click', addTodo)
goalButton.addEventListener('click', addGoal)

function lineThrough (id) {
    store.dispatch(toggleTodoAction(id))
}
function addRemoveButton (onClick) {
    button = document.createElement('button');
    button.innerHTML = 'X';
    button.addEventListener('click', onClick)
    return button;

}
function addTodoDOM (todo) {
    const li = document.createElement('li');
    const inner = document.createTextNode(todo.name)
    if (todo.completed) {
        const strike = document.createElement('strike')
        strike.appendChild(inner)
        li.appendChild(strike)
    } else {
        li.appendChild(inner)
    }
    const button = addRemoveButton(() => store.dispatch(removeTodoAction(todo.id)));
    li.appendChild(button)
    li.addEventListener('click', () => lineThrough(todo.id))
    document.getElementById('todos').appendChild(li);
}
function addGoalDOM (goal) {
    const li = document.createElement('li');
    li.innerHTML = `${goal.name}`;
    const button = addRemoveButton(() => store.dispatch(removeGoalAction(goal.id)));
    li.appendChild(button)
    document.getElementById('goals').appendChild(li);
}