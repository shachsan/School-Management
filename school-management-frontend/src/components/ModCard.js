import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Schedule from './Schedule';

const styles = {
    
    card: {
        maxWidth: 200,
        maxHeight:400,
        display:'inline-block',
        margin:'15px'
  },
  media: {
    height: 140,
  },
};

const ModCard=(props)=> {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.mod.image}
          
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align='center'>
            {props.mod.name}
          </Typography>
          <Typography component="p" align='center'>
            {props.mod.nick_name}<br/>
            {/* {props.mod.about} */}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Students
        </Button>
        <Button onClick={(e)=>props.modClickHandler(e, props.mod)} size="small" color="primary">
          Schedule
          
        </Button>
      </CardActions>
    </Card>
  );
}

ModCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModCard);