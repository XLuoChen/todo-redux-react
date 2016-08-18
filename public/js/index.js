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

    filter(filterName) {
        store.dispatch({type: 'SET_FILTER', filterName})
    }

    filterTodos() {
        if (store.getState().filterName === "ALL") {
            return store.getState().todos;
        }
        else if (store.getState().filterName === "ACTIVE") {
            return store.getState().todos.filter(todo => !todo.isDone);
        } else {
            return store.getState().todos.filter(todo => todo.isDone);
        }
    }


    render() {
        return <div>
            <TodoList todos={this.filterTodos()} onToggle={this.toggle.bind(this)}/>
            <AddTodo onAdd={this.add}/>
            <Footer onFilter={this.filter} filterName={store.getState().filterName}/>
        </div>
    }
}

class Footer extends React.Component {
    onFilter(type) {
        this.props.onFilter(type);
    }

    render() {
        const links = ['ALL', 'ACTIVE', 'COMPLETED'].map(filterName => {
            return <a style={{"textDecoration": this.props.filterName === filterName ? "underline" : ""}}
                      onClick={this.onFilter.bind(this, filterName)}>{filterName}&nbsp;&nbsp;</a>

        });
        return <div>
            {links}
        </div>
    }
}


class TodoList extends React.Component {
    render() {
        return <div>
            {this.props.todos.map((todo, index) => {
                return <div><input type="checkbox" checked={todo.isDone} onClick={this.props.onToggle.bind(this, index)}/><span style={{
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

