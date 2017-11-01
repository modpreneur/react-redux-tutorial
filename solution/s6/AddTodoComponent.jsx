'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import MyButton from './MyButton.jsx';


export default class AddTodoComponent extends React.Component {
    constructor(props){
        super(props);

        this.input = null;
        this.onAdd = this.onAdd.bind(this);
    }

    onAdd(){
        if(this.input.value.length){
            this.props.onAdd(this.input.value);
        }
    }

    render(){
        return (
            <div {...this.props.wrapperProps}>
                <input ref={(el) => this.input = el} type="text" placeholder={'Add new todo'} />
                <MyButton onClick={this.onAdd}>
                    {this.props.buttonText}
                </MyButton>
            </div>
        );
    }
}

AddTodoComponent.defaultProps = {
    onAdd: () => {},
    wrapperProps: {},
    buttonText: ''
};

AddTodoComponent.propTypes = {
    onAdd: PropTypes.func,
    wrapperProps: PropTypes.object,
    buttonText: PropTypes.string
};