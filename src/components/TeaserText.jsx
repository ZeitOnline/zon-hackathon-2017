import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class TeaserText extends PureComponent {
    static propTypes = {
        text: PropTypes.string.isRequired,
        charIndex: PropTypes.number.isRequired,
        hidden: PropTypes.bool.isRequired,
    };

    componentDidUpdate() {
        if (!this.props.hidden) {
            if ('scrollIntoViewIfNeeded' in this.mark) {
                this.mark.scrollIntoViewIfNeeded(true);
            } else if ('scrollIntoView' in this.mark) {
                // waiting for FF 58
                // @see https://bugzilla.mozilla.org/show_bug.cgi?id=1389274
                // this.mark.scrollIntoView({
                //     behavior: 'smooth',
                //     block: 'nearest',
                // });
            }
        }
    }

    render() {
        const { text, charIndex, hidden } = this.props;
        const end = text.replace(/\s/g, ' ').indexOf(' ', charIndex);

        return (
            <p className="teaser__text" hidden={hidden}>
                {text.slice(0, charIndex)}
                <mark ref={(element) => { this.mark = element; }}>
                    {text.slice(charIndex, end)}
                </mark>
                {text.slice(end)}
            </p>
        );
    }
}
