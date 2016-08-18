export default function todos(state = {todoItems: []}, action) {

    switch (action.type) {
        case "ADD":
            state.todoItems.push({text: action.todoItem, isDone: false});
            return state;
    }
    return state;
}