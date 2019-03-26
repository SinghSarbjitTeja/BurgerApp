import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';


export const AuthContext = React.createContext(false);

//you can export object (which includes function)
// export const AuthContext = React.createContext({
// isAuth: false,
// togleAuth: () => {}
// })

// <AuthContext.Provider vlaue={{isAuth: this.state.isAuth, toggleAuth:this.toggleAuth }></AuthContext.Provider>

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [
        { name: "yolo", age: 30 },
        { name: "sarb", age: 31 },
        { name: "yolwinder", age: 30 }
      ],
      showPersons: false,
      toggleClicked: 0,
      authenticated: false
    }
  }

  nameChangedHandler = (event, index) => {

    const newPerson = {
      ...this.state.persons[index]
    }

    newPerson.name = event.target.value;
    const persons = [...this.state.persons];
    persons[index] = newPerson;

    this.setState({
      persons: persons

    })
  }

  showToggle = () => {
    let didChange = this.state.showPersons;
    this.setState((prevState, props) => {
      return {
        showPersons: !didChange,
        toggleClicked: prevState.toggleClicked + 1
      }
    });
  }

  deleteMe = (index) => {
    debugger;
    // const personsTemp = this.state.persons.slice(); this copies too
    const personsTemp = [...this.state.persons];
    personsTemp.splice(index, 1);
    this.setState({
      persons: personsTemp
    })

  }

  loginHandler = () => {
    this.setState({
      authenticated: true

    })

  }
  render() {
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deleteMe}
          changed={this.nameChangedHandler}
          // isAuthenticated ={this.state.authenticated}
        />
      );
    }


    return (
      <div className={classes.App}>
        <Cockpit
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          Clicked={this.showToggle}
          login={this.loginHandler}
        />
       <AuthContext.Provider value={this.state.authenticated}>{persons}</AuthContext.Provider> 
      </div>

    );
  }
}

export default App;
