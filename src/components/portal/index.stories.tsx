import React from 'react';

import { StoryFn, Meta } from '@storybook/react';

import { Portal } from './index.component';

export default {
  title: 'Components/Portal',
  component: Portal,
} as Meta<typeof Portal>;

export const Primary: StoryFn<typeof Portal> = () => (
  <Portal>
    <div
      style={{
        position: 'fixed',
        top: '2px',
        left: '0px',
        right: '0px',
        margin: '0 auto',
      }}
    >
      Portal in action, now our accessibility device will easily read overlaying modals, portlets,
      and etc...
    </div>
  </Portal>
);
