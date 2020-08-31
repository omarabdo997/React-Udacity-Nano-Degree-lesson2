import API from 'goals-todos-api'

export const ADD_GOAL = 'ADD_GOAL';
export const REMOVE_GOAL = 'REMOVE_GOAL';

function addGoal (id, name) {
    return {
        type: ADD_GOAL,
        goal: {
            id,
            name
        }
    }
}

function removeGoal(id) {
    return {
        type: REMOVE_GOAL,
        id
    }
}

export function handleAddGoal(name, cb) {
    return (dispatch) => {
        API.saveGoal(name)
            .then(goal => {
                dispatch(addGoal(goal.id,goal.name,goal.complete))
                cb();
            })
            .catch(() => alert('An error occured'))
    }
}

export function handelDeleteGoal(goal) {
    return (dispatch) => {
        dispatch(removeGoal(goal.id))
        API.deleteGoal(goal.id)
            .catch(() => {
                dispatch(addGoal(goal.id,goal.name));
                alert('An error occured')
            })
    }
}