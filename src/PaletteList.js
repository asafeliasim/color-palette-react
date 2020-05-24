import React, { Component } from 'react';
import MinPalette from './MiniPalette';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

var styles = {
    root: {
        backgroundColor: "blue",
        height: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center'        
    },
    container:{
        width: '50%',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    nav:{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color: "white"
    },
    palettes:{
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3,30%)",
        gridGap:"5%"
    }
}
class PaletteList extends Component {
    render() {
        var {palettes,classes} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                    <h1>React colors</h1>
                    </nav>
                    <div className={classes.palettes}>
                    {
                        palettes.map(palette =>(
                            <p key={palette.id}>
                            <MinPalette {...palette}/>
                            </p>
                        ))
                    }
                    </div>    
                </div>
            </div>
        )
    }
}
export default  withStyles(styles)(PaletteList);