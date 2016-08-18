export default function todos(state = {todoItems: []}, action) {

    switch (action.type) {
        case "ADD":
            state.todoItems.push({text: action.todoItem, isDone: false, id: state.todoItems.length});
            return state;
        case "TOGGLE":
            state.todoItems[action.id].isDone = !state.todoItems[action.id].isDone;
            return state;
    }
    return state;
}