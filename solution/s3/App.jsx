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
                <MyButton className='margin-auto' onClick={() => alert(`You clicked! ${this.props.name}`)}>
                    <i className="mdi mdi-circle" /> Click me!
                </MyButton>
            </div>
        );
    }
}