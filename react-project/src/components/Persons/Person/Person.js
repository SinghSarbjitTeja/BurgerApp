import React, { Component } from 'react';
import classes from './Person.css';
import PropTypes from 'prop-types';
import {AuthContext} from '../../../containers/App';


class Person extends Component {
    constructor(props) {
        super(props);
        this.inputElement = React.createRef();
    };
    
    componentDidMount(){
        if (this.props.position === 0){
        this.inputElement.current.focus();
        }
    }
    render() {
        return (
            <div className={classes.Person}>
            <AuthContext.Consumer>
            {auth => auth ? <p>I am authenicated </p> : null }
           </AuthContext.Consumer>
                <p onClick={this.props.click}> I am {this.props.name} and I am {this.props.age} Years old!</p>
                <p>{this.props.children}</p>
                <input
                    ref={this.inputElement}
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name}
                /> 
             
            </div>
        );
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
}

export default Person;