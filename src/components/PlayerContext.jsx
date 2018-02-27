import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import { TEASER } from 'app/shapes';
import { TextDisplay } from 'app/components';

const PlayerContext = (props) => {
    const {
        readChars,
        currentTeaser,
        show,
    } = props;

    return (
        <CSSTransition
            classNames="slide"
            timeout={300}
            mountOnEnter
            unmountOnExit
            in={show}
        >
            <TextDisplay
                charIndex={readChars}
                hidden={false}
                text={currentTeaser.playerText}
            />
        </CSSTransition>
    );
};

PlayerContext.propTypes = {
    currentTeaser: PropTypes.shape(TEASER),
    readChars: PropTypes.number.isRequired,
    show: PropTypes.bool,
};

PlayerContext.defaultProps = {
    currentTeaser: null,
    show: false,
};

export default PlayerContext;
