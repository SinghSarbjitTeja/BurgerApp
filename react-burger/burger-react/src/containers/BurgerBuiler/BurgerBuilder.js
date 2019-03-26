import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummay/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuiler extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,  //asuumed to be total instially
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount() {
        axios.get('https://react-my-burger-be46c.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({ ingredients: res.data })
            })
            .catch(error => {
                this.setState({ error: true });
            });
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true

        })
    }
    PurchaseCancelHandler = () => {
        this.setState({
            purchasing: false

        })
    }
    updatePurchasableState = (ingredients) => {
        // const ingredients = { ...this.state.ingredients }; beacuse now its been passed from outside
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).
            reduce((sum, el) => {
                return sum + el;

            }, 0);
        console.log(sum);
        this.setState({ purchasable: sum > 0 });   //returns true or false
    }
    addIngredientHandler = (type) => {
        const updatedIngredients = { ...this.state.ingredients };

        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1;
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchasableState(updatedIngredients);
    }
    deleteIngredientHandler = (type) => {
        const updatedIngredients = { ...this.state.ingredients };

        const oldcount = this.state.ingredients[type];
        if (oldcount <= 0) {
            return;
        }
        const newCount = oldcount - 1;
        updatedIngredients[type] = newCount;
        const oldPrice = this.state.totalPrice;
        const priceDeletion = INGREDIENT_PRICES[type];
        const newPrice = oldPrice - priceDeletion;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchasableState(updatedIngredients);
    }

    purchaseContinueHandler = () => {
        // //alert("you contunye bruh") 
        // this.setState({ loading: true });
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'max',
        //         address: {
        //             street: 'test address',
        //             zipCode: '3345',
        //             country: 'Australia'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // //.json added is just aused for firebase dont need it otherwise
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({ loading: false, purchasing: false });

        //     })
        //     .catch(error => {
        //         this.setState({ loading: false })
        //     })
        console.log("the order sent to modal---" + JSON.stringify(this.state.ingredients));
        
        //sending data in queryStrings(in url) to /checkout url
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });

    }

    render() {
        const disabledIngredients = { ...this.state.ingredients };
        for (let key in disabledIngredients) {
            disabledIngredients[key] = disabledIngredients[key] <= 0;
            //this is returning {salad : true, chese: false};
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>ingrediends cant be loaded!</p> : <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientDeleted={this.deleteIngredientHandler}
                        disabledIngredients={disabledIngredients}
                        totalPrice={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        purchasing={this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary
                totalPrice={this.state.totalPrice}
                ingredients={this.state.ingredients}
                purchaseCanceled={this.PurchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.PurchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuiler, axios);