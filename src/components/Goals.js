import React from 'react'
import {connect} from 'react-redux'
import List from './List'
import {
    handleAddGoal,
    handelDeleteGoal,
} from '../actions/goals'


class Goals extends React.Component {
    handleClick = (e) => {
        this.props.dispatch(handleAddGoal(
            this.input.value, 
            () => this.input.value = ''
        ))
    }
    remove = (goal) => {
        this.props.dispatch(handelDeleteGoal(goal))
    }
    render() {
        return (
            <div>
                <h1>GOALS</h1>
                <input
                    type='text'
                    placeholder='Add Goal'
                    ref={(input) => this.input=input}
                />
                <button
                    onClick={this.handleClick}
                >Add Goal
                </button>
                <List items={this.props.goals} remove={this.remove}/>
            </div>
        )
    }
}
export default connect((state) => ({
    goals: state.goals
}))(Goals)
