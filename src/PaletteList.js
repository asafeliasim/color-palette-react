import React, { Component } from 'react';
import MinPalette from './MiniPalette';
import {Link} from 'react-router-dom';

class PaletteList extends Component {
    render() {
        var {palettes} = this.props;
        return (
            <div>
                <h1>React colors</h1>
                {
                    palettes.map(palette =>(
                        <p key={palette.id}>
                        <MinPalette {...palette}/>
                        </p>
                    ))
                }
            </div>
        )
    }
}
export default  PaletteList;