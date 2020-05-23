import React from 'react';
import { withStyles } from '@material-ui/core/styles';

var styles = {
    root:{
        backgroungColor: 'white',
        border: '1px solid black',
        borderRadius: '5px',
        padding: '0.5rem',
        position: 'relative',
        overflow: 'hidden',
        '&:hover':{
            cursor: 'pointer'
        }
    },
    colors:{
        backgroungColor: 'grey!important'
    },
    title:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0',
        color: 'black',
        paddingTop: '0.5rem',
        position: 'relative'
    },
    emoji:{
        marginLeft: '0.5rem',
        fontSize: '0.8rem'
    }
}

function MinPalette(props){
    var {classes,paletteName,emoji} = props;

    return(
        <div className={classes.root}>
            <div className={classes.colors}>                
            <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
            </div>
        </div>
    )
}
export default withStyles(styles)(MinPalette);