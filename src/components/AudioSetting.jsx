import React from 'react';
import PropTypes from 'prop-types';

const AudioSetting = ({ name, value, min, max, step, onChange }) => (
    <label htmlFor={name} className="settings__label">
        <span>{ name }</span>
        <span>{ value }</span>
        <input
            id={name}
            name={name}
            type="range"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={onChange}
        />
    </label>
);

AudioSetting.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.func.isRequired,
};

AudioSetting.defaultProps = {
    min: 0,
    max: 1,
    step: 0.1,
};

export default AudioSetting;
