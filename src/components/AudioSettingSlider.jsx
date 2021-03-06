import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AudioSettingSlider extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        min: PropTypes.number,
        max: PropTypes.number,
        step: PropTypes.number,
        onChange: PropTypes.func.isRequired,
    };

    static defaultProps = {
        min: 0,
        max: 1,
        step: 0.1,
    };

    render() {
        const { name, value, min, max, step, onChange, label } = this.props;
        const listId = `datalist-${name}`;

        return (
            <label htmlFor={name} className="settings__label">
                <span>{ label }</span>
                <input
                    id={name}
                    name={name}
                    type="range"
                    value={value}
                    min={min}
                    max={max}
                    step={step}
                    onChange={onChange}
                    list={listId}
                />
                {this.renderTickMarks(listId)}
                <output htmlFor={name}>{ value }</output>
            </label>
        );
    }

    renderTickMarks(listId) {
        const { min, max, step } = this.props;
        const list = [];
        // @see http://adripofjavascript.com/blog/drips/avoiding-problems-with-decimal-math-in-javascript.html
        const factor = 1 / step;
        let tick = min;

        while (tick <= max) {
            list.push(tick);
            tick = Math.round((tick + step) * factor) / factor;
        }

        return (
            <datalist id={listId}>
                {list.map(value => (
                    <option key={value} label={value}>{value}</option>
                ))}
            </datalist>
        );
    }
}
