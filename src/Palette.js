import React,{Component} from 'react';
import ColorBox from './ColorBox';
import './paletteFooter.css';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/PaletteStyles';



class Palette extends Component {
    constructor(props){
        super(props);
        this.state = {level: 500,format:'hex'};
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }
    changeLevel(newLevel){
        this.setState({level:newLevel});
    }
    changeFormat(val){
        this.setState({format:val})
    }
    
    render(){
     
        const {colors,paletteName,emoji,id} = this.props.palette;
        const {classes} = this.props;
        const {level,format}  = this.state;
        const colorBoxes = colors[level].map((color,i)=> (
            <ColorBox 
                key={i} 
                background={color[format]} 
                name={color.name}
                showingFullPalette={true} 
                moreUrl={`/palette/${id}/${color.id}`}
            />
        ));   
        return (
        <div className={classes.palette}>
            <Navbar 
                level={level} 
                changeLevel={this.changeLevel} 
                handleChange={this.changeFormat}
                showingAllColors
            />
            <div className={classes.colors}>
                {colorBoxes}
            </div>
            <PaletteFooter paletteName={paletteName} emoji={emoji} />
        </div>
        )
    }
}
export default withStyles(styles)(Palette);
