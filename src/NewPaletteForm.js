import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { withStyles} from '@material-ui/core/styles';
import PaletteFormNav from "./PaletteFormNav";
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

    static defaultProps = {
        maxColors: 20
    }
    constructor(props) {
        super(props)
        this.state= {
            open: false,
            currentColor: 'teal',
            newColorName: '',
            colors: this.props.palettes[0].colors,
            newPaletteName:''
        };
        this.addNewColor= this.addNewColor.bind(this);
        this.updateCurrentColor= this.updateCurrentColor.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.savePalette= this.savePalette.bind(this);
        this.removeColor= this.removeColor.bind(this);
        this.clearColors = this.clearColors.bind(this);
        this.addRandomColor= this.addRandomColor.bind(this);
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
    savePalette(newPaletteName){
        const newPalette = {
            paletteName:newPaletteName,
            id: newPaletteName.toLowerCase().replace(/ /g,"-"),
            colors: this.state.colors
        }
        this.props.savePalette(newPalette);
        this.props.history.push('/');
    }
    removeColor(colorName){
        this.setState({
            colors: this.state.colors.filter(color=> color.name !== colorName)
        });
    }
    onSortEnd = ({oldIndex,newIndex})=>{
        this.setState(({colors})=>({
            colors:arrayMove(colors,oldIndex,newIndex)
        }))
    }
    clearColors(){
        this.setState({colors:[]});
    }
    addRandomColor(){
        // pick random color from existing palettes
        const allColors = this.props.palettes.map(p => p.colors).flat();
        var rand = Math.floor(Math.random() * allColors.length);
        const randomColor = allColors[rand];
        this.setState({colors: [...this.state.colors,randomColor]});
        console.log(rand)
    }
    render(){
        const { open, colors,currentColor } = this.state;
        const {classes,maxColors,palettes} = this.props;
        const paletteIsFull = colors.length >= maxColors;
        return (
            <div className={classes.root}>
                <PaletteFormNav
                    open={open}
                    classes={classes}
                    palettes={palettes}
                    savePalette={this.savePalette}
                    handleDrawerOpen={this.handleDrawerOpen}
                />
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
                        <Button variant="contained" color="secondary" onClick={this.clearColors}>Clear Palette</Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.addRandomColor}
                            disabled={paletteIsFull}
                            style={{backgroundColor: paletteIsFull ? "grey":"primary"}}
                        >
                            {paletteIsFull ? "Palette is Full": "Random Color"}
                        </Button>
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
                            style={{ backgroundColor: paletteIsFull? 'grey':this.state.currentColor }}
                            disabled={paletteIsFull}
                        >
                            {paletteIsFull? "Palette Full": "Add Color"}
                        </Button>
                    </ValidatorForm>

                </Drawer>
                <main
                    className={classNames(classes.content,{
                        [classes.contentShift]:open
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <DraggableColorList
                        colors={this.state.colors}
                        removeColor={this.removeColor}
                        axis="xy"
                        onSortEnd={this.onSortEnd}
                    />
                </main>
            </div>
        );
    }
}
export default withStyles(styles,{withTheme:true})(NewPaletteForm);
