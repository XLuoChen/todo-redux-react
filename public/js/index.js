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

    render() {
        return <div>
            <Todos addItem={this.addItem}/>
            <TodoLists todoItems={store.getState().todoItems} toggle={this.toggle}/>
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
                <input type="checkbox" onClick={this.onToggle.bind(this, todoItem.id)}/>
                {todoItem.text}
            </div>
        });
        return <div>
            {todoItems}
        </div>
    }
}

function listenRender() {
    render(<App/>, document.getElementById('root'));
}

store.subscribe(listenRender);
listenRender();

