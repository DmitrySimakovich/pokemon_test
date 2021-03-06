import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../App/store";
import {NamedApiResource} from "../../Api/pokemonApi";
import {HomeAction, HomeThunk} from './homeReducer';

const HomePage: FC = () => {
    const dispatch = useDispatch()
    const pokemonList = useSelector<RootStateType, Array<NamedApiResource>>(state => state.home.results)
    const currentPage = useSelector<RootStateType, number>( state => state.home.currentPage)
    const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading)

    useEffect(() => {
        debugger
        dispatch(HomeThunk.getPokemonList(10, 10*currentPage))
    }, [dispatch, currentPage])

    return <>
        {
            isLoading ? '' :
                <div>
                    {
                        pokemonList.map(pok => (
                            <div>
                                {pok.name}
                            </div>
                        ))
                    }
                    <div>
                        <span><button disabled={currentPage===1} onClick={() => dispatch(HomeAction.changePage(currentPage-1))}>Prev</button></span>
                        <span><button onClick={() => dispatch(HomeAction.changePage(currentPage+1))}>Next</button></span>
                    </div>
                </div>


        }
    </>
}
export default HomePage