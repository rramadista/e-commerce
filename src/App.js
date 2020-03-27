import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth, createUserProfileDocument } from './database/firebase.utils';
import { setCurrentUser } from './services/user/user.actions';
import './App.css';
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
    unsubscribeFromAuth = null;

    componentDidMount() {
        const { setCurrentUser } = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    });
                });
            }
            setCurrentUser(userAuth);
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/shop' component={ShopPage} />
                    <Route path='/shop/hats' component={HatsPage} />
                    <Route path='/shop/jackets' component={JacketsPage} />
                    <Route path='/shop/sneakers' component={SneakersPage} />
                    <Route path='/shop/womens' component={WomensPage} />
                    <Route path='/shop/mens' component={MensPage} />
                    <Route
                        exact
                        path='/signin'
                        render={() =>
                            this.props.currentUser ? (
                                <Redirect to='/' />
                            ) : (
                                <SignInAndSignUpPage />
                            )
                        }
                    />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
