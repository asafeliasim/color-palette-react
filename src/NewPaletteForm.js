import React,{Component} from 'react';
import { withStyles} from '@material-ui/core/styles';
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import Drawer from '@material-ui/core/Drawer';
import classNames from "classnames";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from "./DraggableColorList";
import {arrayMove} from "react-sortable-hoc";
import styles from './styles/NewPaletteFormStyels';




class NewPaletteForm extends Component {

    static defaultProps = {
        maxColors: 20
    }
    constructor(props) {
        super(props)
        this.state= {
            open: false,
            colors: this.props.palettes[0].colors,
            newPaletteName:''
        };
        this.addNewColor= this.addNewColor.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.savePalette= this.savePalette.bind(this);
        this.removeColor= this.removeColor.bind(this);
        this.clearColors = this.clearColors.bind(this);
        this.addRandomColor= this.addRandomColor.bind(this);
    }



    addNewColor(newColor){
        this.setState({ colors: [...this.state.colors, newColor], newColorName: "" });
        console.log(this.state.colors);
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
    savePalette(palette){
        palette.id = palette.paletteName.toLowerCase().replace(/ /g,"-");
        palette.colors = this.state.colors;
        this.props.savePalette(palette);
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
        const { open, colors } = this.state;
        const {classes,maxColors,palettes} = this.props;
        const paletteIsFull = colors.length >= maxColors;
        return (
            <div className={classes.root}>
                <PaletteFormNav
                    open={open}
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
                    <Divider />
                    <div className={classes.container}>
                    <Typography variant="h4" gutterBottom>
                        Design your palette
                    </Typography>

                    <div className={classes.buttons}>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={this.clearColors}
                        >
                            Clear Palette
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.addRandomColor}
                            disabled={paletteIsFull}
                            style={{backgroundColor: paletteIsFull ? "grey":"primary"}}
                        >
                            {paletteIsFull ? "Palette is Full": "Random Color"}
                        </Button>
                    </div>
                    <ColorPickerForm
                        paletteIsFull={paletteIsFull}
                        addNewColor={this.addNewColor}
                        colors={colors}
                    />
                    </div>
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
