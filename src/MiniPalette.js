import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/MiniPalette';
import DeleteIcon from '@material-ui/icons/Delete';

function MinPalette(props){
    var {classes,paletteName,emoji,colors,handleClick} = props;
    var miniColorsBoxes = colors.map(c =>(
        <div className={classes.miniColor} style={{backgroundColor: c.color}} key={c.name}/>
    ));
    return(
        <div className={classes.root} onClick={handleClick}>
            <div className={classes.delete}>
                <DeleteIcon
                    className={classes.deleteIcon}
                    style={{transition:'all 0.5s ease-in-out'}}
                />
            </div>
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
