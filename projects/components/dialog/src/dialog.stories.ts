import type { Meta, StoryObj } from '@storybook/angular';
import { WeUIDialogComponent, WeUIDialogType, WeUIDialogSize } from './dialog.component';

const meta: Meta<WeUIDialogComponent> = {
  title: 'Components/Dialog',
  component: WeUIDialogComponent,
  tags: ['autodocs'],
  argTypes: {
    visible: {
      control: { type: 'boolean' }
    },
    title: {
      control: { type: 'text' }
    },
    content: {
      control: { type: 'text' }
    },
    type: {
      control: { type: 'select' },
      options: ['alert', 'confirm', 'prompt', 'default']
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'normal', 'large']
    },
    mask: {
      control: { type: 'boolean' }
    },
    closable: {
      control: { type: 'boolean' }
    },
    maskClosable: {
      control: { type: 'boolean' }
    },
    showButtons: {
      control: { type: 'boolean' }
    },
    showCancelButton: {
      control: { type: 'boolean' }
    },
    showConfirmButton: {
      control: { type: 'boolean' }
    },
    cancelText: {
      control: { type: 'text' }
    },
    confirmText: {
      control: { type: 'text' }
    },
    cancelButtonType: {
      control: { type: 'select' },
      options: ['default', 'warn']
    },
    confirmButtonType: {
      control: { type: 'select' },
      options: ['primary', 'warn']
    },
    zIndex: {
      control: { type: 'number' }
    },
    lockScroll: {
      control: { type: 'boolean' }
    }
  }
};

export default meta;
type Story = StoryObj<WeUIDialogComponent>;

export const Default: Story = {
  args: {
    visible: true,
    title: '标题',
    content: '这是一个对话框的内容',
    type: 'default',
    size: 'normal',
    mask: true,
    closable: false,
    maskClosable: false,
    showButtons: true,
    showCancelButton: true,
    showConfirmButton: true,
    cancelText: '取消',
    confirmText: '确定',
    cancelButtonType: 'default',
    confirmButtonType: 'primary',
    zIndex: 1000,
    lockScroll: true
  }
};

export const Alert: Story = {
  args: {
    ...Default.args,
    type: 'alert',
    title: '提示',
    content: '这是一个提示对话框',
    showCancelButton: false
  }
};

export const Confirm: Story = {
  args: {
    ...Default.args,
    type: 'confirm',
    title: '确认',
    content: '您确定要执行此操作吗？'
  }
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
    title: '小对话框',
    content: '这是一个小尺寸的对话框'
  }
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'large',
    title: '大对话框',
    content: '这是一个大尺寸的对话框，可以显示更多的内容。对话框会根据内容自动调整大小，确保良好的用户体验。'
  }
};

export const Closable: Story = {
  args: {
    ...Default.args,
    closable: true,
    title: '可关闭对话框',
    content: '这个对话框可以通过右上角的关闭按钮关闭'
  }
};

export const MaskClosable: Story = {
  args: {
    ...Default.args,
    maskClosable: true,
    title: '遮罩可关闭',
    content: '点击遮罩层可以关闭这个对话框'
  }
};

export const NoButtons: Story = {
  args: {
    ...Default.args,
    showButtons: false,
    title: '无按钮对话框',
    content: '这个对话框没有按钮，需要通过编程方式关闭'
  }
};

export const CustomContent: Story = {
  render: (args) => ({
    props: args,
    template: `
      <weui-dialog [visible]="visible" [title]="title" [type]="type" [size]="size"
                   [mask]="mask" [closable]="closable" [maskClosable]="maskClosable"
                   [showButtons]="showButtons" [showCancelButton]="showCancelButton"
                   [showConfirmButton]="showConfirmButton" [cancelText]="cancelText"
                   [confirmText]="confirmText" [cancelButtonType]="cancelButtonType"
                   [confirmButtonType]="confirmButtonType" [zIndex]="zIndex"
                   [lockScroll]="lockScroll">
        <ng-template #title>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="color: #07c160;">✓</span>
            <span>自定义标题</span>
          </div>
        </ng-template>
        <ng-template #content>
          <div style="text-align: left; padding: 20px;">
            <h4>自定义内容</h4>
            <p>这是自定义的对话框内容，可以包含任意的HTML内容。</p>
            <ul>
              <li>支持自定义标题</li>
              <li>支持自定义内容</li>
              <li>支持丰富的交互</li>
            </ul>
            <div style="margin-top: 16px;">
              <input type="text" placeholder="输入框示例" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
            </div>
          </div>
        </ng-template>
      </weui-dialog>
    `
  })
};
