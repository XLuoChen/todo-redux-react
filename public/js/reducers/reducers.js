export default function todos(state = {todoItems: []}, action) {

    switch (action.type) {
        case "ADD":
            state.todoItems.push({todoItem: action.todoItem, isDone: false});
            console.log(state.todoItems);
            return state;
    }
    return state;
}