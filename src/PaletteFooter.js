import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/FooterStyles';


const PaletteFooter = (props) => {
    var {paletteName,emoji,classes} = props;
    
    return(
        <footer className={classes.paletteFooter}>
            {paletteName}
            <span className={classes.emoji}>{emoji}</span>
        </footer>
    )
};

export default withStyles(styles)(PaletteFooter);
