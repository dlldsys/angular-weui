import type { Meta, StoryObj } from '@storybook/angular';
import { WeUIToastComponent, WeUIToastType, WeUIToastPosition } from './toast.component';

const meta: Meta<WeUIToastComponent> = {
  title: 'Components/Toast',
  component: WeUIToastComponent,
  tags: ['autodocs'],
  argTypes: {
    visible: {
      control: { type: 'boolean' },
    },
    message: {
      control: { type: 'text' },
    },
    type: {
      control: { type: 'select' },
      options: ['success', 'warning', 'error', 'info', 'loading'],
    },
    position: {
      control: { type: 'select' },
      options: ['top', 'center', 'bottom'],
    },
    duration: {
      control: { type: 'number' },
    },
    showIcon: {
      control: { type: 'boolean' },
    },
    zIndex: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<WeUIToastComponent>;

export const Default: Story = {
  args: {
    visible: true,
    message: '这是一个提示消息',
    type: 'info',
    position: 'center',
    duration: 2000,
    showIcon: true,
    zIndex: 1001,
  },
};

export const Success: Story = {
  args: {
    ...Default.args,
    type: 'success',
    message: '操作成功',
  },
};

export const Warning: Story = {
  args: {
    ...Default.args,
    type: 'warning',
    message: '请注意',
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    type: 'error',
    message: '操作失败',
  },
};

export const Info: Story = {
  args: {
    ...Default.args,
    type: 'info',
    message: '提示信息',
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    type: 'loading',
    message: '加载中...',
    duration: 2,
  },
};

export const Top: Story = {
  args: {
    ...Default.args,
    position: 'top',
    message: '顶部提示',
  },
};

export const Bottom: Story = {
  args: {
    ...Default.args,
    position: 'bottom',
    message: '底部提示',
  },
};

export const NoIcon: Story = {
  args: {
    ...Default.args,
    showIcon: false,
    message: '无图标提示',
  },
};

export const LongMessage: Story = {
  args: {
    ...Default.args,
    message: '这是一个很长的提示消息，用来测试Toast组件在长文本情况下的显示效果和布局是否正常',
  },
};

export const Interactive: Story = {
  render: () => ({
    template: `
      <div style="padding: 20px; display: flex; flex-direction: column; gap: 12px;">
        <h3>Toast 交互示例</h3>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button (click)="showToast('success', '成功提示')">成功</button>
          <button (click)="showToast('warning', '警告提示')">警告</button>
          <button (click)="showToast('error', '错误提示')">错误</button>
          <button (click)="showToast('info', '信息提示')">信息</button>
          <button (click)="showToast('loading', '加载中...', 0)">加载</button>
        </div>
        
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button (click)="showPosition('top')">顶部</button>
          <button (click)="showPosition('center')">居中</button>
          <button (click)="showPosition('bottom')">底部</button>
        </div>
        
        <div>
          <button (click)="hideToast()">隐藏Toast</button>
        </div>
        
        <weui-toast #toastRef [visible]="visible" [message]="message" [type]="type" 
                     [position]="position" [duration]="duration" [showIcon]="showIcon"
                     (close)="handleClose()"></weui-toast>
      </div>
    `,
    props: {
      visible: false,
      message: '',
      type: 'info' as WeUIToastType,
      position: 'center' as WeUIToastPosition,
      duration: 2000,
      showIcon: true,
      showToast: function (type: WeUIToastType, message: string, duration?: number) {
        this['visible'] = true;
        this['type'] = type;
        this['message'] = message;
        this['duration'] = duration ?? 2000;
      },
      showPosition: function (position: WeUIToastPosition) {
        this['visible'] = true;
        this['type'] = 'info';
        this['message'] = `${position}位置提示`;
        this['position'] = position;
      },
      hideToast: function () {
        this['visible'] = false;
      },
      handleClose: function () {
        this['visible'] = false;
      },
    },
  }),
};
