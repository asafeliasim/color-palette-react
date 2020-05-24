import React from 'react';
import { withStyles } from '@material-ui/core/styles';

var styles = {
    root:{
        backgroundColor: 'white',
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
        height: "150px",
        width: "100%",
        borderRadius: "5px",
        overflow: "hidden"
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
    },
    miniColor: {
        height: "25%",
        width: "20%",
        display: "inline-block",
        margin: "0 auto",
        position: "relative",
        marginBottom: "-3.5px"
    }
}

function MinPalette(props){
    var {classes,paletteName,emoji,colors,handleClick} = props;
    var miniColorsBoxes = colors.map(c =>(
        <div className={classes.miniColor} style={{backgroundColor: c.color}} key={c.paletteName}/>
    ));
    return(
        <div className={classes.root} onClick={handleClick}>
            <div className={classes.colors}>
                {miniColorsBoxes}
            </div>              
            <h5 className={classes.title}>{paletteName}
                <span className={classes.emoji}>{emoji}</span>
            </h5>
        </div>
    )
}
export default withStyles(styles)(MinPalette);