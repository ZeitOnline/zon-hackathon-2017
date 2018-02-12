import React from 'react';
import PropTypes from 'prop-types';

import { TEASER } from 'app/shapes';
import { distanceToNow } from 'app/utilities';

const Teaser = ({
    teaser,
}) => (
    <article className="teaser">
        <a href={teaser.href} tabIndex="-1">
            <h2>
                <span className="teaser__kicker">{teaser.supertitle}</span>
                <span className="teaser__title">{teaser.teaser_title || teaser.title}</span>
            </h2>
        </a>
        <div className="teaser__date">
            {distanceToNow(teaser.release_date)}
        </div>
        <p className="teaser__intro">{teaser.teaser_text}</p>
        <div className="teaser__player">
            <button className="teaser__playbutton" >
                {'▶'}
            </button>
        </div>
    </article>
);

Teaser.propTypes = {
    teaser: PropTypes.shape(TEASER).isRequired,
};

export default Teaser;
