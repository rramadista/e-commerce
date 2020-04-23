import React from 'react';
import { connect } from 'react-redux';
// import { auth } from '../../services/firebase/firebase.utils';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { createStructuredSelector } from 'reselect';

import './header.styles.scss';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { selectCartHidden } from '../../services/redux/cart/cart.selectors';
import { selectCurrentUser } from '../../services/redux/user/user.selectors';
import { signOutStart } from '../../services/redux/user/user.actions';

const Header = ({ currentUser, hidden, signOutStart }) => (
    <div className='header'>
        <Link to='/' className='logo-container'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {currentUser ? (
                <div className='option' onClick={signOutStart}>
                    SIGN OUT
                </div>
            ) : (
                <Link className='option' to='/signin'>
                    SIGN IN
                </Link>
            )}
            <CartIcon />
        </div>
        {hidden ? null : <CartDropdown />}
    </div>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
    signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
