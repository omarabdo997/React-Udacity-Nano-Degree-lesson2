function createStore (reducer) {
    let state;
    let listeners = [];
    const getState = () => state
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((l) => l !== listener);
        }
    }
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
    }
    return {
        getState,
        subscribe,
        dispatch
    }
}
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

function app (state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}
const store = createStore(app)
const unsubscribe = store.subscribe(() => {
    const {todos, goals} = store.getState()
    console.log(store.getState())
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