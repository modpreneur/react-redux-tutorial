'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export default class App extends React.Component {

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
            </div>
        );
    }
}

App.propTypes = {
    name: PropTypes.string
};

App.defaultProps = {
    name: 'world'
};