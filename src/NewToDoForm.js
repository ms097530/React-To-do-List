import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import './NewToDoForm.css';

class NewToDoForm extends Component
{
    constructor(props)
    {
        // props:
        // addTask - method to add a task to ToDoList
        super(props);
        this.state = { task: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e)
    {
        e.preventDefault();
        this.props.addTask({ ...this.state, taskId: uuid(), isCompleted: false });
        this.setState({ task: '' });
    }

    handleChange(e)
    {
        this.setState({ [e.target.name]: e.target.value })
    }

    render()
    {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="task">Task</label>
                    <input className="NewToDoForm-input" type="text" name="task" id="task" onChange={this.handleChange} value={this.state.task} />
                    <button>Add Task</button>
                </form>
            </div>
        );
    }
}

export default NewToDoForm;
