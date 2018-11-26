import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import { TEASER } from 'app/shapes';
import { TextDisplay, AudioSettings } from 'app/components';

const PlayerContext = ({ readChars, currentTeaser, visibleContext }) => (
    <CSSTransition
        classNames="slide"
        timeout={300}
        mountOnEnter
        unmountOnExit
        in={!!visibleContext && (visibleContext !== 'text' || !!currentTeaser)}
    >
        <div className="player-context">
            { visibleContext === 'text' && currentTeaser && (
                <TextDisplay charIndex={readChars} text={currentTeaser.playerText} />
            )}
            { visibleContext === 'settings' && <AudioSettings /> }
        </div>
    </CSSTransition>
);

PlayerContext.propTypes = {
    currentTeaser: PropTypes.shape(TEASER),
    readChars: PropTypes.number.isRequired,
    visibleContext: PropTypes.oneOf(['', 'settings', 'text']),
};

PlayerContext.defaultProps = {
    currentTeaser: null,
    visibleContext: '',
};

export default PlayerContext;
