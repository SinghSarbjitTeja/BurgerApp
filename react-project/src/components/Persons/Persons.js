import React, {Component} from 'react';
import Person from './Person/Person';


class Persons extends Component {
    render() {
        return (
            this.props.persons.map((p, index) => {
                return <Person
                    changed={(event) => this.props.changed(event, index)}
                    click={() => this.props.clicked(index)}
                    position={index}
                    key={index}
                    name={p.name}
                    age={p.age} 
                    // authenticated ={this.props.isAuthenticated}
                    />
            })
        )
    }
}

export default Persons;