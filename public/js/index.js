import React from 'react';
import {render} from 'react-dom';
import {createStore} from "redux";
import reducer from './reducers/reducer';

const store = createStore(reducer);


class App extends React.Component {
    add(text) {
        store.dispatch({type: 'ADD', text});
    }

    toggle(index) {
        store.dispatch({type: 'TOGGLE', index});
    }

    render() {
        return <div>
            <TodoList todos={store.getState().todos} onToggle={this.toggle.bind(this)}/>
            <AddTodo onAdd={this.add}/>
        </div>
    }
}

class TodoList extends React.Component {
    render() {
        return <div>
            {this.props.todos.map((todo, index) => {
                return <div><input type="checkbox" onClick={this.props.onToggle.bind(this, index)}/><span style={{
                    "display": "inline",
                    "textDecoration": todo.isDone ? "line-through" : ""
                }}>{todo.text}</span></div>
            })}
        </div>
    }
}

class AddTodo extends React.Component {
    add() {
        const text = this.refs.myInput.value;
        this.props.onAdd(text);
        this.refs.myInput.value = '';
    }

    render() {
        return <div>
            <input type="text" ref="myInput"/>
            <button onClick={this.add.bind(this)}>添加</button>
        </div>
    }
}


function renderFunction() {
    "use strict";
    render(<App/>, document.getElementById('root'))
}

store.subscribe(renderFunction)

renderFunction();

