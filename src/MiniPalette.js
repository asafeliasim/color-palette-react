import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/MiniPalette';
import DeleteIcon from '@material-ui/icons/Delete';

class MinPalette extends Component {

    constructor(props){
        super(props);
        this.deletePalette= this.deletePalette.bind(this);
    }
    deletePalette(e){
        e.stopPropagation();
        this.props.handleDelete(this.props.id);
    }
    render(){
        const {classes,paletteName,emoji,colors,handleClick} = this.props;
        const miniColorsBoxes = colors.map(c =>(
            <div className={classes.miniColor} style={{backgroundColor: c.color}} key={c.name}/>
        ));
        return(
            <div className={classes.root} onClick={handleClick}>
                    <DeleteIcon
                        className={classes.deleteIcon}
                        style={{transition:'all 0.5s ease-in-out'}}
                        onClick={this.deletePalette}
                    />
                <div className={classes.colors}>
                    {miniColorsBoxes}
                </div>
                <h5 className={classes.title}>{paletteName}
                    <span className={classes.emoji}>{emoji}</span>
                </h5>
            </div>
        )
    }
}
export default withStyles(styles)(MinPalette);
