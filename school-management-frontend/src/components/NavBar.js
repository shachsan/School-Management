import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = {
    
    appbar: {
        textAlign:'right',
  },

};

const NavBar=(props)=>{
    
        const { classes } = props;
        return (

            <AppBar position='relative'>
                <Toolbar variant='dense'>
                    <Typography className={classes.appbar} color='inherit'
                        variant='inherit'>
                        Sort By  
                        <select className="sort-menu-bar" onChange={(e)=>props.onChangeSortHandler(e)}>
                            <option>Sort type</option>
                            <option value='time'>Schedule Time</option>
                            <option value='mod'>Mod</option>
                        </select>
                    </Typography>

                    <Typography color='inherit' variant='inherit'>
                        <span onClick={()=>props. className="nav-mods">All Mods</span>
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

export default  withStyles(styles)(NavBar);