type StateType = {
    age: number,
    childrenCount: number,
    name: string,
}
type ActionProps = {
    type: string,
    [key: string]: any,
}

export const userReducer = (state: StateType, action: ActionProps) => {
    switch (action.type) {
        case "INCREMENT-AGE":
            state.age = action.age + 1;
            return state;
        case "INCREMENT-CHILDREN-COUNT":
            state.childrenCount = state.childrenCount + 1;
            return state;

        default:
            throw new Error(`Unknown action type "${action.type}"`);
    }
}