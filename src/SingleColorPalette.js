import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/PaletteStyles';


class SingleColorPalette extends Component {
    constructor(props){
        super(props);
        this._shades = this.gatherShades(this.props.palette,this.props.colorId);         
        this.state = {format: 'hex'};
        this.changeFormat = this.changeFormat.bind(this);
    }
    gatherShades(palette,colorToFilterBy){
        var shades = [];
        var allColors = palette.colors;      
        for(let key in allColors){
            shades = shades.concat(
                allColors[key].filter(color=> color.id === colorToFilterBy)
            );
        }
        return shades.slice(1);
    }
    changeFormat(val){
        this.setState({format:val})
    }
    render() {
        var {format} = this.state;
        var {classes} = this.props;
        var {paletteName,emoji,id} = this.props.palette;
        var colorBoxes = this._shades.map(c => (
            <ColorBox 
                key={c.id} 
                name={c.name} 
                background={c[format]} 
                showingFullPalette={false}
            />
        ))
        return (
            <div className={classes.palette}>
                <Navbar 
                    handleChange={this.changeFormat}
                    showingAllColors={false}
                />
                <div className={classes.colors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`}>GO BACK</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}
export default withStyles(styles)(SingleColorPalette);
