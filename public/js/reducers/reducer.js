export default function reducer(state = {todos: [],filterName:"ALL"}, action){
    switch (action.type){
        case 'ADD':
            state.todos.push({text: action.text, isDone: false});
            return state;
        case 'TOGGLE' :
            state.todos[action.index].isDone = !state.todos[action.index].isDone
            return state;
        case 'SET_FILTER':
            state.filterName = action.filterName;
            return state;
    }
    return state;
}