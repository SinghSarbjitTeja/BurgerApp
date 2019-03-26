import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends React.Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }
    render(){
        return(
            <div className={classes.ContactData}>
                <h4>Enter your data</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeHolder="Your Name"></input>
                    <input className={classes.Input} type="text" name="email" placeHolder="Your Mail"></input>
                    <input className={classes.Input} type="text" name="street" placeHolder="Street"></input>
                    <input className={classes.Input} type="text" name="postal" placeHolder="Postal Code"></input>
                    <Button  btnType="Success" clicked={this.orderHandler}>Order Here</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;