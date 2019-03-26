import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuiler/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div >
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;

//NOTES: SECTION 12 : Lecture 213/214

// 1) 
//These two components are replaced with Route component now (above)
{/* <BurgerBuilder />
<Checkout /> */}


// 2)
// order of components does matter in Route So see below options:
// 1.  exact will prevent to load both components as both have "/" as prefix (exact will make sure its eaxctly same)
// 2.  Move the Checkout component above the BurgerBuilder so it does not load both the components
// 3.  Switch is just another extra precaution , it would work without it aswell since we used "exact" and switched the order of compoenents but 
//     I am using it anyway for the sake of learning. (Switch lets you match the path and comaponents can stay in any order) 

// 3)
// For implimenting Routing in you app follow theese three steps:
// 1. Put BrowserRouter in index.js ---called enabling the Routing
// 2. put Route in App and add components to Route  --- above example
// 3. use exact or switch for better performance

// Need to know if working with Routing only:
// if componet is used in Routing it can access history,location and match from inspect in browser by printing(console.log(this.props))
// only BurgerBuilder and Checkout components can have access to match,location and history through console.log(this.props) as they are direct children of Routing
// children components (or indirect compontns inside these two components cant access match, location and history --part of routing )
// so we manullay pass these to them (just wrap the child component with import {withRouter})

//So we can use these properties like this 
// in BurgerBuilder this.props.history.push('/checkout'); will push /checkout in url to go to page with Checkout Component
