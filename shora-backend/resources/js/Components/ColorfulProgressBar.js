import * as React from 'react';
import { LinearProgress } from '@mui/material'
import { styled } from '@mui/styles';
import { withStyles } from '@mui/styles';

const red = (t) => {
    let result = Math.min(Math.round((-19 / 500) * t * t + (53 / 25) * t + 244), 255).toString(16)
    if (result.length == 1)
        result = "0" + result;
    return result;
}
const green = (t) => {
    let result = Math.round((-79 / 2500) * t * t + (106 / 25) * t + 67).toString(16)
    if (result.length == 1)
        result = "0" + result;
    return result;
}
const blue = (t) => (54).toString(16)
const alpha = (t) => {
    let result = t.toString(16);
    if (result.length == 1)
        result = "0" + result;
    return result;
}
const color = (t) => `#${red(t)}${green(t)}${blue(t)}`

function hex2(c) {
    c = Math.round(c);
    if (c < 0) c = 0;
    if (c > 255) c = 255;

    var s = c.toString(16);
    if (s.length < 2) s = "0" + s;

    return s;
}

function colorRgb(r, g, b) {
    return "#" + hex2(r) + hex2(g) + hex2(b);
}

function shade(col, light) {

    // TODO: Assert that col is good and that -1 < light < 1

    var r = parseInt(col.substr(1, 2), 16);
    var g = parseInt(col.substr(3, 2), 16);
    var b = parseInt(col.substr(5, 2), 16);

    if (light < 0) {
        r = (1 + light) * r;
        g = (1 + light) * g;
        b = (1 + light) * b;
    } else {
        r = (1 - light) * r + light * 255;
        g = (1 - light) * g + light * 255;
        b = (1 - light) * b + light * 255;
    }

    return colorRgb(r, g, b);
}

const withStylesProps = styles => Component => props => {
    const Comp = withStyles(styles(props))(Component);
    return <Comp {...props} />;
};

function ColorfulProgressBar(props) {
    const { classes } = props;
    return <LinearProgress {...props} classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }} />;
}

const styles = props => {
    return {
        colorPrimary: {
            backgroundColor: shade(color(props.value), 0.6),
        },
        barColorPrimary: {
            backgroundColor: color(props.value),
        }
    }
};

export default withStylesProps(styles)(ColorfulProgressBar);