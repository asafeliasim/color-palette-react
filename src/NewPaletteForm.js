import React,{Component} from 'react';
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
import DraggableColorBox from "./DraggableColorBox";

const drawerWidth = 400;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        height: "calc(100vh - 64px)",
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
});

class NewPaletteForm extends Component {

    constructor(props) {
        super(props)
        this.state= {
            open: false,
            currentColor: 'teal',
            newColorName: '',
            colors: [],
            newPaletteName:''
        };
        this.addNewColor= this.addNewColor.bind(this);
        this.updateCurrentColor= this.updateCurrentColor.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.savePalette= this.savePalette.bind(this);

    }


    componentDidMount() {
        ValidatorForm.addValidationRule("isColorNameUnique", value =>
            this.state.colors.every(
                ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule("isColorUnique", value =>
            this.state.colors.every(({color}) => color !== this.state.currentColor)
        );
        ValidatorForm.addValidationRule("isPaletteNameUnique",value =>
            this.props.palettes.every(({paletteName}) =>
                paletteName.toLowerCase() !== value.toLowerCase())
        );
    }
    addNewColor(){

        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        };
        this.setState({ colors: [...this.state.colors, newColor], newColorName: "" });
        console.log(this.state.colors);
   }
    updateCurrentColor(newColor) {
        this.setState({currentColor: newColor.hex});
    }
    handleDrawerOpen = () => {
        this.setState({ open: true });
    }
    handleDrawerClose = () => {
        this.setState({ open: false });
    }
    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }
    savePalette(){
        let newName = this.state.newPaletteName
        const newPalette = {
            paletteName:newName,
            id: newName.toLowerCase().replace(/ /g,"-"),
            colors: this.state.colors
        }
        this.props.savePalette(newPalette);
        this.props.history.push('/');
    }
    render(){
        const { open, colors,currentColor } = this.state;
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color="default"
                    className={classes.appBar}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Create your own palette colors
                        </Typography>
                        <ValidatorForm onSubmit={this.savePalette}>
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
                        </ValidatorForm>

                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Typography variant="h4">
                        Design your palette
                    </Typography>
                    <Divider />
                    <div>
                        <Button variant="contained" color="secondary">Clear Palette</Button>
                        <Button variant="contained" color="primary">Random color</Button>
                    </div>
                    <ChromePicker
                        color={currentColor}
                        onChangeComplete={this.updateCurrentColor}
                    />
                    <ValidatorForm onSubmit={this.addNewColor} ref='form'>
                        <TextValidator
                            name="newColorName"
                            value={this.state.newColorName}
                            onChange={this.handleChange}
                            validators={["required", "isColorNameUnique", "isColorUnique"]}
                            errorMessages={[
                                "Enter a color name",
                                "Color name must be unique",
                                "Color already used!"
                            ]}
                        />
                        <Button
                            variant='contained'
                            type='submit'
                            color='primary'
                            style={{ backgroundColor: this.state.currentColor }}
                        >
                            Add Color
                        </Button>
                    </ValidatorForm>

                </Drawer>
                <main
                    className={classNames(classes.content,{
                        [classes.contentShift]:open
                    })}
                >
                    <div className={classes.drawerHeader} />
                        {
                            colors.map((color,i)=> (
                                <DraggableColorBox key={i} color={color.color} name={color.name}/>
                            ))
                        }
                </main>
            </div>
        );
    }
}
export default withStyles(styles,{withTheme:true})(NewPaletteForm);
