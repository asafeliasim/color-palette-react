import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import classNames from "classnames";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import {ChromePicker} from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import DraggableColorList from "./DraggableColorList";
import {arrayMove} from "react-sortable-hoc";

class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPaletteName:''
        }
        this.handleChange= this.handleChange.bind(this);
    }
    componentDidMount() {
        ValidatorForm.addValidationRule("isPaletteNameUnique",value =>
            this.props.palettes.every(({paletteName}) =>
                paletteName.toLowerCase() !== value.toLowerCase())
        );
    }

    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }
    render() {
        const {classes,open} = this.props;
        const {newPaletteName} = this.state;
        return (
            <div>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color="default"
                    className={classNames(classes.appBar,{
                        [classes.appBarShift]: open
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.props.handleDrawerOpen}
                            edge="start"
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Create your own palette colors
                        </Typography>
                        <ValidatorForm onSubmit={()=>this.props.savePalette(newPaletteName)}>
                            <TextValidator
                                label="Palette Name"
                                name="newPaletteName"
                                value={this.state.newPaletteName}
                                onChange={this.handleChange}
                                validators={["required","isPaletteNameUnique"]}
                                errorMessages={["Enter Palette Name","Palette Name is already used"]}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"

                            >
                                Save Palette
                            </Button>
                            <Button variant="contained" color="secondary">
                                <Link to='/'>Go Back</Link>
                            </Button>
                        </ValidatorForm>

                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default PaletteFormNav;
