import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import { TEASER } from 'app/shapes';
import { TextDisplay, AudioSettings } from 'app/components';

export default class PlayerContext extends Component {
    static propTypes = {
        currentTeaser: PropTypes.shape(TEASER),
        readChars: PropTypes.number.isRequired,
        visibleContext: PropTypes.oneOf(['', 'settings', 'text']),
    };

    static defaultProps = {
        currentTeaser: null,
        visibleContext: '',
    };

    state = {
        forceHide: false,
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visibleContext === 'text') {
            this.setState({
                forceHide: !nextProps.currentTeaser,
            });
        }
    }

    render() {
        const {
            readChars,
            currentTeaser,
            visibleContext,
        } = this.props;

        const show = (visibleContext !== '') && !this.state.forceHide;

        return (
            <CSSTransition
                classNames="slide"
                timeout={300}
                mountOnEnter
                unmountOnExit
                in={show}
                key="text-display"
            >
                <div className="player-context">
                    { visibleContext === 'text' && currentTeaser && <TextDisplay
                        charIndex={readChars}
                        text={currentTeaser.playerText}
                    />}
                    { visibleContext === 'settings' && <AudioSettings /> }
                </div>
            </CSSTransition>
        );
    }
}
