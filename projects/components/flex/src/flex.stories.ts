import { type Meta, type StoryObj } from '@storybook/angular';
import { WeUIFlexComponent } from '../index';

const meta: Meta<WeUIFlexComponent> = {
  title: 'Components/Flex',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    justify: {
      control: 'select',
      options: ['start', 'end', 'center', 'between', 'around', 'evenly']
    },
    align: {
      control: 'select',
      options: ['top', 'bottom', 'center', 'baseline', 'stretch']
    },
    direction: {
      control: 'select',
      options: ['row', 'column', 'row-reverse', 'column-reverse']
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse']
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg']
    }
  }
};

export default meta;
type Story = StoryObj<WeUIFlexComponent>;

export const Default: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-flex gap="md">
        <div style="background: #07c160; color: white; padding: 16px; border-radius: 4px;">Item 1</div>
        <div style="background: #10aeff; color: white; padding: 16px; border-radius: 4px;">Item 2</div>
        <div style="background: #fa5151; color: white; padding: 16px; border-radius: 4px;">Item 3</div>
      </weui-flex>
    `
  })
};

export const JustifyContent: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <weui-flex justify="start">
          <div style="width: 60px; height: 40px; background: #07c160; color: white; display: flex; align-items: center; justify-content: center; border-radius: 4px;">1</div>
          <div style="width: 60px; height: 40px; background: #10aeff; color: white; display: flex; align-items: center; justify-content: center; border-radius: 4px;">2</div>
        </weui-flex>
        <weui-flex justify="center">
          <div style="width: 60px; height: 40px; background: #07c160; color: white; display: flex; align-items: center; justify-content: center; border-radius: 4px;">1</div>
          <div style="width: 60px; height: 40px; background: #10aeff; color: white; display: flex; align-items: center; justify-content: center; border-radius: 4px;">2</div>
        </weui-flex>
        <weui-flex justify="between">
          <div style="width: 60px; height: 40px; background: #07c160; color: white; display: flex; align-items: center; justify-content: center; border-radius: 4px;">1</div>
          <div style="width: 60px; height: 40px; background: #10aeff; color: white; display: flex; align-items: center; justify-content: center; border-radius: 4px;">2</div>
        </weui-flex>
      </div>
    `
  })
};

export const AlignItems: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <weui-flex align="top" style="height: 80px; background: #f7f7f7; padding: 8px;">
          <div style="width: 60px; height: 60px; background: #07c160; color: white; display: flex; align-items: center; justify-content: center; border-radius: 4px;">Top</div>
          <div style="width: 60px; height: 40px; background: #10aeff; color: white; display: flex; align-items: center; justify-content: center; border-radius: 4px;">Center</div>
        </weui-flex>
        <weui-flex align="center" style="height: 80px; background: #f7f7f7; padding: 8px;">
          <div style="width: 60px; height: 60px; background: #07c160; color: white; display: flex; align-items: center; justify-content: center; border-radius: 4px;">Top</div>
          <div style="width: 60px; height: 40px; background: #10aeff; color: white; display: flex; align-items: center; justify-content: center; border-radius: 4px;">Center</div>
        </weui-flex>
        <weui-flex align="bottom" style="height: 80px; background: #f7f7f7; padding: 8px;">
          <div style="width: 60px; height: 60px; background: #07c160; color: white; display: flex; align-items: center; justify-content: center; border-radius: 4px;">Top</div>
          <div style="width: 60px; height: 40px; background: #10aeff; color: white; display: flex; align-items: center; justify-content: center; border-radius: 4px;">Center</div>
        </weui-flex>
      </div>
    `
  })
};

export const FlexItems: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-flex gap="md">
        <div style="flex: 1; background: #07c160; color: white; padding: 16px; border-radius: 4px; text-align: center;">1</div>
        <div style="flex: 2; background: #10aeff; color: white; padding: 16px; border-radius: 4px; text-align: center;">2</div>
        <div style="flex: 1; background: #fa5151; color: white; padding: 16px; border-radius: 4px; text-align: center;">1</div>
      </weui-flex>
    `
  })
};

export const Wrap: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-flex wrap="wrap" gap="sm" style="max-width: 300px; background: #f7f7f7; padding: 8px;">
        <div *ngFor="let item of [1,2,3,4,5,6,7,8,9]" 
             style="width: 80px; height: 60px; background: #07c160; color: white; display: flex; align-items: center; justify-content: center; border-radius: 4px;">
          {{ item }}
        </div>
      </weui-flex>
    `
  })
};

export const Column: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-flex direction="column" gap="md" style="max-width: 200px;">
        <div style="background: #07c160; color: white; padding: 16px; border-radius: 4px;">Header</div>
        <div style="flex: 1; background: #f7f7f7; padding: 16px; border-radius: 4px; min-height: 100px;">Content</div>
        <div style="background: #10aeff; color: white; padding: 16px; border-radius: 4px;">Footer</div>
      </weui-flex>
    `
  })
};
