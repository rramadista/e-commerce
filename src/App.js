import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import { Route, Switch } from 'react-router-dom';

const HatsPage = () => (
    <div>
        <h1>HATS PAGE</h1>
    </div>
);

const JacketsPage = () => (
    <div>
        <h1>JACKETS PAGE</h1>
    </div>
);

const SneakersPage = () => (
    <div>
        <h1>SNEAKERS PAGE</h1>
    </div>
);

const WomensPage = () => (
    <div>
        <h1>WOMENS PAGE</h1>
    </div>
);

const MensPage = () => (
    <div>
        <h1>MENS PAGE</h1>
    </div>
);

function App() {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/shop/hats' component={HatsPage} />
                <Route path='/shop/jackets' component={JacketsPage} />
                <Route path='/shop/sneakers' component={SneakersPage} />
                <Route path='/shop/womens' component={WomensPage} />
                <Route path='/shop/mens' component={MensPage} />
            </Switch>
        </div>
    );
}

export default App;
