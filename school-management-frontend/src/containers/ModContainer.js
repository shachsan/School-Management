import React, { Component } from 'react';
import ModCard from '../components/ModCard';

export default class ModContainer extends Component {

    getModName=(modId) => {
        return `Mod ${modId}`
    }

    render() {
        return (
            <div className="show-mod">
                {this.props.allMods.map(mod=><ModCard key={mod.id} mod={mod}/>)}
            </div>
            // <div className="show-mod"><h1>{this.getModName(this.props.modClick)}</h1></div>
        );
    }
};
