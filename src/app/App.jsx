'use strict';

import React from 'react';

export default class App extends React.Component {

    /**
     * Most important method
     * @returns {XML}
     */
    render(){
        // classes are added to attribute className which corresponds to element parameter className
        return (
            <div className="container text-center">
                Hello world from application
            </div>
        );
    }
}