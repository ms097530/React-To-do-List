import React, { Component } from 'react';
import './ToDo.css';

class ToDo extends Component
{
    constructor(props)
    {
        super(props);
        this.state = { isEditing: false, editText: this.props.task, isCompleted: false }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleSubmit(e)
    {
        e.preventDefault();
        this.props.editToDo({ task: this.state.editText, taskId: this.props.taskId })
        this.setState({ isEditing: false })
    }

    handleChange(e)
    {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleRemove(e)
    {
        this.props.removeTask(this.props.taskId);
    }

    render()
    {
        return (
            <div className="ToDo">
                {
                    this.state.isEditing ?
                        <form className="ToDo-edit-form" onSubmit={this.handleSubmit}>
                            <input className="ToDo-edit-input" type="text" name="editText" value={this.state.editText} onChange={this.handleChange} />

                        </form>
                        : <span className={this.state.isCompleted ? 'completed' : ''} onClick={() => this.setState({ isEditing: true })}>{this.props.task}</span>
                }
                {/* <button className="ToDo-edit-btn" onClick={() => this.setState({ isEditing: true })}>Edit</button>
                {
                    this.state.isEditing && (
                        <form className="ToDo-edit-form" onSubmit={this.handleSubmit}>
                            <label htmlFor="task">Task</label>
                            <input className="ToDo-edit-input" type="text" name="editText" value={this.state.editText} onChange={this.handleChange} />
                            <button>Submit</button>
                        </form>)
                } */}
                <button className="ToDo-complete-btn" onClick={() => this.setState({ isCompleted: true })}>Mark as completed</button>
                <button className="ToDo-remove-btn" onClick={this.handleRemove}>X</button>
            </div>
        );
    }
}

export default ToDo;
