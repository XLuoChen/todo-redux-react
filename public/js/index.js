import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';

import todos from './reducers/reducers';

const store = createStore(todos);

class App extends React.Component {
    addItem(todoItem) {
        store.dispatch({type: "ADD", todoItem});
    }

    render() {
        return <div>
            <Todos addItem={this.addItem}/>
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

render(<App/>, document.getElementById('root'));