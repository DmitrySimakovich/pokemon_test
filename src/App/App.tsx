import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import HomePage from "../Featuers/HomePage/homePage";
import {AnimatePresence} from "framer-motion";


function App() {
    return (
        <div>
            <div>
                <NavLink to={'/home'}>
                    Home
                </NavLink>
                <NavLink to={'/pokemon'}>
                    Pokemon
                </NavLink>
                <NavLink to={'/abilities'}>
                    Abilities
                </NavLink>
            </div>

            <Route render={ ({location}) =>(
                <AnimatePresence exitBeforeEnter initial={false}>
                    <Switch location={location} key={location.pathname}>
                        <Route exact path="/home" component={HomePage} />
                        {/*<Route exact path="/image/:id" component={PokemonInfo} />*/}
                    </Switch>
                </AnimatePresence>
            )} />
        </div>
    );
}

export default App;