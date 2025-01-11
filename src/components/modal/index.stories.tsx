import React from 'react';

import { StoryFn, Meta } from '@storybook/react';

import { Modal } from '..';

export default {
  title: 'Components/Modal',
  component: Modal,
} as Meta<typeof Modal>;

export const TopModal: StoryFn<typeof Modal> = () => (
  <Modal type="success" open position="top">
    Success submitted Lorem ipsum dolor sit amet consectetur adipisicing elit.
  </Modal>
);

export const BottomModal: StoryFn<typeof Modal> = () => (
  <Modal type="error" open position="bottom">
    Failed to submit Lorem ipsum dolor sit amet consectetur adipisicing elit.
  </Modal>
);

export const TopCenterModal: StoryFn<typeof Modal> = () => (
  <Modal type="error" open position="top-center">
    Failed to submit Lorem ipsum dolor sit amet consectetur adipisicing elit.
  </Modal>
);

export const BottomCenterModal: StoryFn<typeof Modal> = () => (
  <Modal type="error" open position="bottom-center">
    Failed to submit Lorem ipsum dolor sit amet consectetur adipisicing elit.
  </Modal>
);
