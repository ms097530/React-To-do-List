import React, { Component } from 'react';
import NewToDoForm from './NewToDoForm';
import ToDo from './ToDo';
import './ToDoList.css';


class ToDoList extends Component
{
    constructor(props)
    {
        super(props);
        this.state = { tasks: [] };
        this.addTask = this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.editToDo = this.editToDo.bind(this);
    }

    addTask(task)
    {
        // console.log(task);
        this.setState(currState => ({ tasks: [...currState.tasks, task] }));
    }

    removeTask(removeId)
    {
        let copy = this.state.tasks.map(task => task);
        this.setState({ tasks: copy.filter(task => task.taskId !== removeId) });
    }

    editToDo(task)
    {
        let copy = this.state.tasks.map(task => task);
        let index;
        for (let i = 0; i < this.state.tasks.length; ++i)
        {
            if (this.state.tasks[i].taskId === task.taskId)
            {
                index = i;
                break;
            }
        }

        // let index = getIndex();
        copy[index] = task;
        this.setState({ tasks: copy });
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
                        taskId={todo.taskId} />
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
