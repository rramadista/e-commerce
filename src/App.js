import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { auth, createUserProfileDocument } from './database/firebase.utils';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

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

class App extends Component {
    constructor() {
        super();
        this.state = {
            currentUser: null
        };
    }

    unsubsribeFromAuth = null;

    componentDidMount() {
        this.unsubsribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    this.setState({
                        currentUser: {
                            id: snapShot.id,
                            ...snapShot.data()
                        }
                    });
                    console.log(this.state);
                });
            }
            this.setState({ currentUser: userAuth });
        });
    }

    componentWillUnmount() {
        this.unsubsribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header currentUser={this.state.currentUser} />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/shop' component={ShopPage} />
                    <Route path='/shop/hats' component={HatsPage} />
                    <Route path='/shop/jackets' component={JacketsPage} />
                    <Route path='/shop/sneakers' component={SneakersPage} />
                    <Route path='/shop/womens' component={WomensPage} />
                    <Route path='/shop/mens' component={MensPage} />
                    <Route path='/signin' component={SignInAndSignUpPage} />
                </Switch>
            </div>
        );
    }
}

export default App;
