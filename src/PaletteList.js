import React, { Component } from 'react';
import MinPalette from './MiniPalette';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/PaletteListStyles';
import {Link} from 'react-router-dom';


class PaletteList extends Component {
    goToPalette(id){
        this.props.history.push(`/palette/${id}`); 
    }
    render() {
        var {palettes,classes,deletePalette} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                    <h1>React colors</h1>
                        <Link to="/palette/new">Create palette</Link>
                    </nav>
                    <div className={classes.palettes}>
                    {
                        palettes.map(palette =>(
                            <MinPalette
                                {...palette}
                                handleClick={()=>this.goToPalette(palette.id)}
                                key={palette.id}
                                id={palette.id}
                                handleDelete={deletePalette}
                            />
                        ))
                    }
                    </div>    
                </div>
            </div>
        )
    }
}
export default  withStyles(styles)(PaletteList);
