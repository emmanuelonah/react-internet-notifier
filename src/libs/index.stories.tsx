import React from 'react';

import { Meta } from '@storybook/react';

import { ReactInternetNotifier } from './index.component';

export default {
  title: 'Components/ReactInternetNotifier',
  component: ReactInternetNotifier,
} as Meta<typeof ReactInternetNotifier>;

export const TurnOnAndOffYourWifiToSee = () => <ReactInternetNotifier />;
