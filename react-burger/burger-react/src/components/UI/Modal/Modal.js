import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import BackDrop from '../BackDrop/BackDrop';


class Modal extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;

    }
    componentWillUpdate() {
        console.log("uodatedddd-------");
    }

    render() {
        return (
            <Aux>
                <BackDrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY( -100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>

                    {/* this loads the Ordersummary in it as children */}
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;