import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../App/store";
import {NamedApiResource} from "../../Api/pokemonApi";
import {HomeAction, HomeThunk} from './homeReducer';
import style from './homePage.module.scss';
import {Link} from 'react-router-dom';


const HomePage: FC = () => {
    const dispatch = useDispatch()
    const pokemonList = useSelector<RootStateType, Array<NamedApiResource>>(state => state.home.results)
    const currentPage = useSelector<RootStateType, number>(state => state.home.currentPage)
    const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading)

    useEffect(() => {
        dispatch(HomeThunk.getPokemonList(10, 10, true))
    }, [dispatch])

    const getPokemonListCallBack = (newPageValue: number) => {
        dispatch(HomeAction.changePage(newPageValue))
        dispatch(HomeThunk.getPokemonList(10, 10 * newPageValue))
    }
    const formatName = (value: string) => {
        let firstSymbol = value[0]
        return firstSymbol.toUpperCase().concat(value.slice(1))
    }

    return <>
        <div className={`${style.wrap}`}>
            <section className={`${style.home_header}`}> {/* main_section*/}
                <header className={`${style.header}`}>
                    <div className={`${style.link_container}`}>
                        <div className={`${style.link_wrap}`}>
                            <Link to={'/'} className={`${style.link} ${style.active}`}>Home</Link>
                            <Link to={'/generations'} className={`${style.link}`}>Generations</Link>
                            <Link to={''} className={`${style.link}`}>Ability</Link>
                        </div>
                    </div>
                </header>
            </section>


            <section className={`${style.home_content}`}>
                <div className={`${style.content_container}`}>
                    {isLoading ? '' :
                        <>
                            <h1>Loremsad oremd!</h1>
                            <div className={`${style.list_container}`}>
                                {
                                    pokemonList.map(pok => (
                                            <div className={`${style.item}`}>
                                                <a>
                                                    <img src={`https://img.pokemondb.net/artwork/${pok.name}.jpg`}
                                                         alt="Bulbasaur" className={style.small_image}/>
                                                </a>
                                                <h2>{formatName(pok.name)}</h2>
                                            </div>
                                    ))
                                }
                            </div>
                            <div className={`${style.btn_container}`}>
                                <button onClick={() => getPokemonListCallBack(currentPage+1)}>Load more</button>
                            </div>
                        </>
                    }

                    {/*<div>*/}
                    {/*    <span>*/}
                    {/*        <button disabled={currentPage === 1}*/}
                    {/*                onClick={() => dispatch(HomeAction.changePage(currentPage - 1))}>Prev</button>*/}
                    {/*    </span>*/}

                    {/*    <span>*/}
                    {/*        <button onClick={() => dispatch(HomeAction.changePage(currentPage + 1))}>Next</button>  */}
                    {/*    </span>*/}
                    {/*</div>*/}
                </div>
                <div className={`${style.home_footer}`}>
                    <footer></footer>
                </div>
            </section>

        </div>
    </>
}
export default HomePage