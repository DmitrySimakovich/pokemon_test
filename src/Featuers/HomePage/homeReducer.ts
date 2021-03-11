import {InferValueTypes, RootStateType} from "../../App/store"
import {NamedApiResource, pokemonApi, ResponsePokemonListType} from "../../Api/pokemonApi";
import {Dispatch} from "redux";
import {AppAction} from "../../App/appReducer";

const initialState = {
    currentPage: 1
} as HomeStateType

const HomeReducer = (state: HomeStateType = initialState, action: ActionsType): HomeStateType => {
    switch (action.type) {
        case "HOME/SET-INIT-POKEMON-LIST": {
        return {...state, ...action.payload}
        }
        case "HOME/CHANGE-PAGE": return {...state, currentPage: action.payload}
        case "HOME/SET-POKEMON-LIST":{
            return {
                ...state,
                results: [...state.results, ...action.payload]
            }
        }
        default:
            return state
    }
}

// ACTION
export const HomeAction = {
    setInitPokemonList: (newPokemonList: ResponsePokemonListType) => ({
        type: 'HOME/SET-INIT-POKEMON-LIST',
        payload: newPokemonList
    } as const),
    changePage: (value: number) => ({type:'HOME/CHANGE-PAGE', payload: value} as const),
    setPokemonList: (value: Array<NamedApiResource>) => ({type: 'HOME/SET-POKEMON-LIST', payload: value} as const)
}
//THUNKS
export const HomeThunk = {
    getPokemonList: (limit: number, offSet: number, init?: boolean) => async (dispatch: Dispatch, getState: () => RootStateType) => {
        dispatch(AppAction.setLoading(true))
        try {
            let res = await pokemonApi.getPokemonList(limit, offSet)
            if (init) {
                dispatch(HomeAction.setInitPokemonList(res))
            } else {
                dispatch(HomeAction.setPokemonList(res.results))
            }
        }
        catch (e) {
            dispatch(AppAction.setError(e))
        }
        finally {
            dispatch(AppAction.setLoading(false))
        }
    }
}
//TYPES

type HomeStateType = ResponsePokemonListType & {
    currentPage: number
}
type ActionsType = ReturnType<InferValueTypes<typeof HomeAction>>

export default HomeReducer