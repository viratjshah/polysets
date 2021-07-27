import React from 'react';
import {storiesOf} from '@storybook/react';

import { Requirements } from '../components/Requirements/Requirements';

const stories = storiesOf('AppTest', module);

stories.add('App', () => {
    return (<Requirements />);
});


