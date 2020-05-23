import React,{Component} from 'react';
import ColorBox from './ColorBox';
import './Palette.css';
import Navbar from './Navbar';

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
     
        var {colors,paletteName,emoji} = this.props.palette;
        var {level,format}  = this.state;
        var colorBoxes = colors[level].map((color,i)=> (
            <ColorBox key={i} background={color[format]} name={color.name}/>
        ));   
        return (
        <div className="palette">
            <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat}/>
            <div className="palette-colors">
                {colorBoxes}
            </div>
            <footer className="plaette-footer">
                {paletteName} 
                <span className="emoji"> {emoji}</span>
            </footer>   
        </div>
        )
    }
}
export default Palette;