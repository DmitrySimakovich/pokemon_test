import {InferValueTypes} from "./store";

const initialState = {
    isLoading: true,
    error: ''
}

const AppReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
    switch (action.type) {
        case "APP/SET-LOADING": return {...state, isLoading: action.payload}
        case "APP/SET-ERROR": return {...state, error: action.payload}
        default:
            return state
    }
}

// ACTION
export const AppAction = {
    setLoading: (value: boolean) => ({type: 'APP/SET-LOADING', payload: value} as const),
    setError: (value: string) => ({type: 'APP/SET-ERROR', payload: value} as const)
}
//THUNKS
export const AppThunk = {}
//TYPES


type AppStateType = typeof initialState
type ActionsType = ReturnType<InferValueTypes<typeof AppAction>>

export default AppReducer