import React, { Component } from 'react';
import MinPalette from './MiniPalette';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/PaletteListStyles';


class PaletteList extends Component {
    goTopalette(id){
        this.props.history.push(`/palette/${id}`); 
    }
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
                            <MinPalette {...palette} handleClick={()=>this.goTopalette(palette.id)} key={palette.id}/>
                        ))
                    }
                    </div>    
                </div>
            </div>
        )
    }
}
export default  withStyles(styles)(PaletteList);