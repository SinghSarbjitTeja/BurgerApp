import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {}
    }
    componentDidMount() {
        console.log(this.props);
        const ingredients = {};
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
        this.setState({ ingredients: ingredients })
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    render() {
        return (
            <div >
                <CheckoutSummary
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.state.ingredients}
                />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={ ()=> (<ContactData ingredients={this.state.ingredients}/>) }
                    // component={ContactData} 
                    />
            </div>

        );
    }

}

export default Checkout;