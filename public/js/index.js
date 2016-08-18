import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';

import todos from './reducers/reducers';

const store = createStore(todos);

class App extends React.Component {
    addItem(todoItem) {
        store.dispatch({type: "ADD", todoItem});
    }

    toggle(id) {
        store.dispatch({type: "TOGGLE", id})
    }

    filterTodoItems(filterName) {
        store.dispatch({type: "SET_FILTER", filterName});
    }

    filter() {
        const filterName = store.getState().filterName;
        if (filterName === 'ALL') {
            return store.getState().todoItems;
        } else if (filterName === 'ACTIVE') {
            return store.getState().todoItems.filter(todoItem => !todoItem.isDone);
        } else {
            return store.getState().todoItems.filter(todoItem => todoItem.isDone);
        }
    }

    render() {
        return <div>
            <Todos addItem={this.addItem}/>
            <TodoLists todoItems={this.filter()} toggle={this.toggle}/>
            <Footer filterTodoItems={this.filterTodoItems} filterName={store.getState().filterName}/>
        </div>
    }
}

class Todos extends React.Component {
    onAdd() {
        const todoItem = this.refs.inputItem.value;
        this.refs.inputItem.value = '';
        this.props.addItem(todoItem);
    }

    render() {
        return <div>
            <input type="text" ref="inputItem"/>
            <button onClick={this.onAdd.bind(this)}>add</button>
        </div>
    }
}

class TodoLists extends React.Component {
    onToggle(id) {
        this.props.toggle(id);
    }

    render() {
        const todoItems = this.props.todoItems.map((todoItem, index) => {
            return <div key={index}>
                <input type="checkbox" checked={todoItem.isDone} onClick={this.onToggle.bind(this, todoItem.id)}/>
                <span style={{"textDecoration": todoItem.isDone ? "line-through" : ""}}>{todoItem.text}</span>
            </div>
        });
        return <div>
            {todoItems}
        </div>
    }
}

class Footer extends React.Component {
    filterTodoItems(filterName) {
        this.props.filterTodoItems(filterName);
    }

    render() {
        const menus = ['ALL', 'ACTIVE', 'COMPLETED'].map(menu => {
            return <a onClick={this.filterTodoItems.bind(this, menu)}
                      style={{"textDecoration": this.props.filterName === menu ? "underline" : ""}}>{menu}&nbsp;&nbsp;
            </a>
        });
        return <div>
            {menus}
        </div>
    }
}

function listenRender() {
    render(<App/>, document.getElementById('root'));
}

store.subscribe(listenRender);
listenRender();

