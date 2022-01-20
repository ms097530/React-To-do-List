import React, { Component } from 'react';
import NewToDoForm from './NewToDoForm';
import ToDo from './ToDo';
import './ToDoList.css';


class ToDoList extends Component
{
    constructor(props)
    {
        super(props);
        this.state = { tasks: localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [] };
        this.addTask = this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.editToDo = this.editToDo.bind(this);
        this.markComplete = this.markComplete.bind(this);
    }

    addTask(task)
    {
        this.setState(currState => ({ tasks: [...currState.tasks, task] }), () => { localStorage.setItem('tasks', JSON.stringify(this.state.tasks)); });

    }

    removeTask(removeId)
    {
        let copy = this.state.tasks.map(task => task);
        this.setState({ tasks: copy.filter(task => task.taskId !== removeId) }, () => { localStorage.setItem('tasks', JSON.stringify(this.state.tasks)); });

    }

    editToDo(task)
    {
        const editedTodos = this.state.tasks.map(todo =>
        {
            if (todo.taskId === task.taskId)
                return { ...todo, task: task.task };
            return todo;
        })
        this.setState({ tasks: editedTodos }, () => { localStorage.setItem('tasks', JSON.stringify(this.state.tasks)); });
    }

    markComplete(completeId)
    {
        const updatedTodos = this.state.tasks.map(task =>
        {
            if (task.taskId === completeId)
                return { ...task, isCompleted: !task.isCompleted };
            return task;
        })

        this.setState({ tasks: updatedTodos }, () => { localStorage.setItem('tasks', JSON.stringify(this.state.tasks)); });
    }

    render()
    {
        let todos = this.state.tasks.map(todo =>
        {
            return (
                <li>
                    <ToDo
                        task={todo.task}
                        key={todo.taskId}
                        editToDo={this.editToDo}
                        removeTask={this.removeTask}
                        taskId={todo.taskId}
                        markComplete={this.markComplete}
                        isCompleted={todo.isCompleted} />
                </li>);
        })
        return (
            <div>
                <NewToDoForm addTask={this.addTask} />
                <ul className="ToDoList-list">
                    {todos}
                </ul>
            </div>
        );
    }
}

export default ToDoList;
