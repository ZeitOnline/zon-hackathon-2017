import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class TextDisplay extends PureComponent {
    static propTypes = {
        text: PropTypes.string.isRequired,
        charIndex: PropTypes.number.isRequired,
    };

    componentDidUpdate() {
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

    render() {
        const { text, charIndex } = this.props;
        const wordStart = text.lastIndexOf(' ', charIndex) + 1;
        const wordEnd = text.indexOf(' ', charIndex);
        // TODO ignore newlines (\n)
        // FIXME The word "E-Mail" in German texts
        // breaks the onboundary events.
        return (
            <div className="text-display">
                <p className="text-display__content">
                    {text.slice(0, wordStart)}
                    <mark
                        className="text-display__marked"
                        ref={(element) => { this.mark = element; }}
                    >
                        {text.slice(wordStart, wordEnd)}
                    </mark>
                    {text.slice(wordEnd)}
                </p>
            </div>
        );
    }
}
