'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import MyButton from './MyButton.jsx';

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
            counter: 0
        };
    }

    increment(){
        this.setState({
            counter: this.state.counter + 1
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
                <MyButton className='margin-auto' onClick={() => this.increment()}>
                    <i className="mdi mdi-circle" /> Increment +1
                </MyButton>
            </div>
        );
    }
}