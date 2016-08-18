export default function todos(state = {todoItems: [], filterName: 'ALL'}, action) {

    switch (action.type) {
        case "ADD":
            state.todoItems.push({text: action.todoItem, isDone: false, id: state.todoItems.length});
            return state;
        case "TOGGLE":
            state.todoItems[action.id].isDone = !state.todoItems[action.id].isDone;
            return state;
        case "SET_FILTER":
            state.filterName = action.filterName;
            return state;
    }
    return state;
}