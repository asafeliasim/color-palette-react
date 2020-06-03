import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Picker} from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
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


  /*  handleClose = () => {
        this.setState({open:false});
    };*/
    render() {
        const {hideForm,savePalette} = this.props;
        const {newPaletteName,open} = this.state;
        return (
            <Dialog
                open={open}
                aria-labelledby='form-dialog-title'
                onClose={hideForm}
            >
                <DialogTitle id='form-dialog-title'>Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={() => savePalette(newPaletteName)}>
                    <DialogContent>
                        <DialogContentText>
                           Please enter a name for your beautiful palette. make sure it is unique!
                        </DialogContentText>
                        <Picker />
                            <TextValidator
                                label="Palette Name"
                                name="newPaletteName"
                                value={newPaletteName}
                                onChange={this.handleChange}
                                fullWidth
                                margin="normal"
                                validators={["required","isPaletteNameUnique"]}
                                errorMessages={["Enter Palette Name","Palette Name is already used"]}
                            />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={hideForm} color="primary">
                            Cancel
                        </Button>
                        <Button variant='contained' color='primary' type='submit'>
                            Save Palette
                        </Button>
                    </DialogActions>
                </ValidatorForm>
                </Dialog>
        );
    }
}

export default PaletteMetaForm;
