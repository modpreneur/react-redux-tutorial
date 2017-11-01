'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export default class MyButton extends React.PureComponent {
    render(){
        return (
            <button className={this.props.className} onClick={this.props.onClick}>
                {this.props.children}
            </button>
        );
    }
}

MyButton.defaultProps = {
    onClick: () => {}
};

MyButton.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string
};