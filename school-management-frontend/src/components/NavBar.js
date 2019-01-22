import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Schedule from './Schedule';

export default class NavBar extends React.Component {
    render() {
        return (

            <AppBar position='relative'>
                <Toolbar variant='dense'>
                    <Typography color='inherit' align='right'
                        variant='inherit'>
                        Sort By  
                        <select className="sort-menu-bar" onChange={(e)=>this.props.onChangeSortHandler(e)}>
                            <option>Sort type</option>
                            <option value='time'>Schedule Time</option>
                            <option value='mod'>Mod</option>
                        </select>

                    
                    </Typography>
                </Toolbar>
            </AppBar>
            // <div className="menu-bar">
            //     <ul>
            //         <li>Sort</li>
            //         <li>Filter By</li>
            //     </ul>
            // </div>
        );
    }
};
