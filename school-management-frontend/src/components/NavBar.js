import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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

                    <Typography color='inherit' variant='inherit'>
                        <span className="nav-mods">All Mods</span>
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
