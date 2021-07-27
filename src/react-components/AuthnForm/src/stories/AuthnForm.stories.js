import React from 'react';
import {storiesOf} from '@storybook/react';
import './authstyle.css';
import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css'; 

import { AuthnForm } from '../components/AuthnForm/AuthnForm';

const stories = storiesOf('Auth', module);

stories.add('AuthnForm', ({mode,constants}) => {
    return (<AuthnForm mode={mode} constants={constants} />);
});