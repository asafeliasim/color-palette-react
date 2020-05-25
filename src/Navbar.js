import React, { Component } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state={
            format: "hex",
            open: false
        };
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }
    handleFormatChange(evt){
        this.setState({format: evt.target.value,open:true});
        this.props.handleChange(evt.target.value);
    }
    closeSnackbar(){
        this.setState({open:false});
    }
    render() {
        var {level,changeLevel,showingAllColors} = this.props;
        const {format,open} = this.state;
        return (
            <header className="navbar">
                <div className="logo">
                    <Link to="/">reactcolorpicker</Link>
                </div>
                {
                    showingAllColors && 
                        <div className="slider-container">
                            <span>Level: {level}</span>
                                <div className="slider">
                                    <Slider 
                                        defaultValue={level} 
                                        min={100} 
                                        max={900} 
                                        step={100}
                                        onAfterChange={changeLevel}
                                    />
                                </div>
                        </div>
                }
            <div className="select-container">
                <Select value={format} onChange={this.handleFormatChange}>
                    <MenuItem value="hex">HEX - #ffffff</MenuItem>
                    <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                    <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
                </Select>
            </div>
            <Snackbar 
            anchorOrigin={{vertical:"bottom",horizontal:"left"}}
            open={open}
            autoHideDuration={3000}
            message={<span>Format changed to {format.toUpperCase()}!</span>} 
            ContentProps={{
                "aria-describedby":"message-id"     
            }}
            onClose={this.closeSnackbar}
            action={[
                <IconButton onClick={this.closeSnackbar} color='inherit' key="close" aria-label='close'> 
                    <CloseIcon />
                </IconButton>    
            ]}       
            >
            </Snackbar>   
            </header>
        )
    }
}
export default Navbar;
