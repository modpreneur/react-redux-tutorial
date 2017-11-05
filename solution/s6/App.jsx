'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import MyButton from './MyButton.jsx';
import AddTodoComponent  from './AddTodoComponent.jsx';

export default class App extends React.Component {
    static propTypes = {
        name: PropTypes.string
    };

    static defaultProps = {
        name: 'world'
    };

    constructor(props){
        super(props);

        // initial state
        this.state = {
            counter: 0,
            todos: []
        };

        this.increment = this.increment.bind(this);
        this.addNewTodo = this.addNewTodo.bind(this);
    }

    increment(){
        this.setState({
            counter: this.state.counter + 1
        });
    }

    addNewTodo(text) {
        this.setState({
            todos: this.state.todos.concat(text)
        });
    }

    /**
     * Most important method
     * @returns {XML}
     */
    render(){
        // styles
        let styleOfName = {
            color: 'red'
        };

        // classes are added to attribute className which corresponds to element parameter className
        return (
            <div className="container text-center" style={{color: 'green'}}>
                Hello <span style={styleOfName}>{this.props.name}</span> from application
                <p>You clicked {this.state.counter} times!</p>
                <MyButton className='margin-auto' onClick={this.increment}>
                    <i className="mdi mdi-circle" /> Increment +1
                </MyButton>

                <h2>TODO LIST</h2>
                <ul>
                    {this.state.todos.map((todo, index) => {
                        return (<li key={index}>{todo}</li>);
                    })}
                </ul>
                <AddTodoComponent onAdd={this.addNewTodo} buttonText={'Add new'}/>
            </div>
        );
    }
}