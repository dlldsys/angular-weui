import { type Meta, type StoryObj } from '@storybook/angular';
import { WeUIStepsComponent, WeUIStepComponent } from './steps.component';

const meta: Meta<WeUIStepsComponent> = {
  title: 'Components/Steps',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<WeUIStepsComponent>;

export const Default: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-steps>
        <weui-step title="选择" status="finish"></weui-step>
        <weui-step title="确认" status="finish"></weui-step>
        <weui-step title="支付" status="process"></weui-step>
        <weui-step title="完成" status="wait"></weui-step>
      </weui-steps>
    `
  })
};

export const Vertical: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="max-width: 300px;">
        <weui-steps direction="vertical">
          <weui-step title="填写信息" status="finish" description="已完成基本信息填写"></weui-step>
          <weui-step title="身份验证" status="finish" description="已完成身份认证"></weui-step>
          <weui-step title="审核" status="process" description="预计2小时内完成"></weui-step>
          <weui-step title="完成" status="wait"></weui-step>
        </weui-steps>
      </div>
    `
  })
};

export const WithError: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-steps>
        <weui-step title="选择" status="finish"></weui-step>
        <weui-step title="确认" status="error" description="信息有误"></weui-step>
        <weui-step title="支付" status="wait"></weui-step>
        <weui-step title="完成" status="wait"></weui-step>
      </weui-steps>
    `
  })
};

export const WithDescriptions: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="max-width: 400px;">
        <weui-steps direction="vertical">
          <weui-step title="买家付款" status="finish" description="2024-01-15 10:30"></weui-step>
          <weui-step title="卖家发货" status="finish" description="2024-01-15 14:20"></weui-step>
          <weui-step title="等待收货" status="process" description="韵达快递：SF1234567890"></weui-step>
          <weui-step title="交易完成" status="wait"></weui-step>
        </weui-steps>
      </div>
    `
  })
};

export const CustomIcons: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-steps>
        <weui-step title="下单" status="finish" [custom]="true">
          <i icon style="font-size: 16px;">✓</i>
        </weui-step>
        <weui-step title="支付" status="finish" [custom]="true">
          <i icon style="font-size: 16px;">✓</i>
        </weui-step>
        <weui-step title="配送" status="process" [custom]="true">
          <i icon style="font-size: 16px;">🚚</i>
        </weui-step>
        <weui-step title="完成" status="wait" [custom]="true">
          <i icon style="font-size: 16px;">📦</i>
        </weui-step>
      </weui-steps>
    `
  })
};
