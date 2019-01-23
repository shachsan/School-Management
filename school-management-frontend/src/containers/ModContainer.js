import React, { Component } from 'react';

export default class ModContainer extends Component {

    getModName=(modId) => {
        return `Mod ${modId}`
    }

    render() {
        return (
            <div className="show-mod"><h1>{this.getModName(this.props.modClick)}</h1></div>
            //  <div>{this.props.modToRender}</div>
        );
    }
};
