import React, { Component } from 'react';
import './ToDo.css';

class ToDo extends Component
{
    constructor(props)
    {
        // props:
        // task - displays todo text
        // taskId
        // isCompleted - boolean managed by ToDoList for styling
        // editToDo, removeTask, markComplete are functions defined on ToDoList that are used to add functionality to the ToDo while managing state on ToDoList
        super(props);
        // state values:
        // isEditing: boolean used to determine whether to display form or just display text normally
        // editText: string matching current todo text so that edit form is prepopulated when text is clicked on        
        this.state = { isEditing: false, editText: this.props.task }
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
                        : <span className={this.props.isCompleted ? 'completed' : ''} onClick={() => this.setState({ isEditing: true })}>{this.props.task}</span>
                }
                <button className="ToDo-complete-btn" onClick={() => this.props.markComplete(this.props.taskId)}>{this.props.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}</button>
                <button className="ToDo-remove-btn" onClick={this.handleRemove}>X</button>
            </div>
        );
    }
}

export default ToDo;
