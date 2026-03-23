import { type Meta, type StoryObj } from '@storybook/angular';
import { WeUIIconComponent } from './icon.component';

const meta: Meta<WeUIIconComponent> = {
  title: 'Components/Icon',
  component: WeUIIconComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [
        'success', 'warning', 'error', 'info', 'loading',
        'search', 'close', 'check', 'arrow-left', 'arrow-right',
        'arrow-up', 'arrow-down', 'plus', 'minus', 'home',
        'user', 'settings', 'star', 'heart', 'share',
        'download', 'upload', 'edit', 'delete', 'eye',
        'eye-off', 'lock', 'unlock'
      ]
    },
    size: {
      control: 'select',
      options: ['small', 'normal', 'large']
    },
    color: {
      control: 'color'
    },
    spin: {
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<WeUIIconComponent>;

export const Default: Story = {
  args: {
    type: 'success',
    size: 'normal'
  }
};

export const Sizes: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <weui-icon type="home" size="small"></weui-icon>
        <weui-icon type="home" size="normal"></weui-icon>
        <weui-icon type="home" size="large"></weui-icon>
      </div>
    `
  })
};

export const StatusIcons: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <weui-icon type="success"></weui-icon>
        <weui-icon type="warning"></weui-icon>
        <weui-icon type="error"></weui-icon>
        <weui-icon type="info"></weui-icon>
      </div>
    `
  })
};

export const Loading: Story = {
  args: {
    type: 'loading',
    spin: true
  }
};

export const CustomColor: Story = {
  args: {
    type: 'heart',
    color: '#ff1744',
    size: 'large'
  }
};

export const NavigationIcons: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <weui-icon type="arrow-left"></weui-icon>
        <weui-icon type="arrow-up"></weui-icon>
        <weui-icon type="arrow-right"></weui-icon>
        <weui-icon type="arrow-down"></weui-icon>
      </div>
    `
  })
};

export const ActionIcons: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <weui-icon type="edit"></weui-icon>
        <weui-icon type="delete"></weui-icon>
        <weui-icon type="share"></weui-icon>
        <weui-icon type="download"></weui-icon>
        <weui-icon type="upload"></weui-icon>
      </div>
    `
  })
};

export const CustomIcon: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <weui-icon size="large">⭐</weui-icon>
        <weui-icon size="large">🎉</weui-icon>
        <weui-icon size="large">🚀</weui-icon>
      </div>
    `
  })
};
