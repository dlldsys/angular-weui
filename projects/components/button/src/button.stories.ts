import type { Meta, StoryObj } from '@storybook/angular';
import { WeUIButtonComponent, WeUIButtonType, WeUIButtonSize } from './button.component';

const meta: Meta<WeUIButtonComponent> = {
  title: 'Components/Button',
  component: WeUIButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset']
    },
    buttonType: {
      control: { type: 'select' },
      options: ['primary', 'default', 'warn']
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'normal', 'large']
    },
    disabled: {
      control: { type: 'boolean' }
    },
    loading: {
      control: { type: 'boolean' }
    },
    block: {
      control: { type: 'boolean' }
    },
    plain: {
      control: { type: 'boolean' }
    },
    round: {
      control: { type: 'boolean' }
    },
    circle: {
      control: { type: 'boolean' }
    }
  }
};

export default meta;
type Story = StoryObj<WeUIButtonComponent>;

export const Default: Story = {
  args: {
    type: 'button',
    buttonType: 'default',
    size: 'normal',
    disabled: false,
    loading: false,
    block: false,
    plain: false,
    round: false,
    circle: false
  },
  render: (args) => ({
    props: args,
    template: `
      <weui-button [type]="type" [buttonType]="buttonType" [size]="size" 
                   [disabled]="disabled" [loading]="loading" [block]="block"
                   [plain]="plain" [round]="round" [circle]="circle">
        按钮文本
      </weui-button>
    `
  })
};

export const Primary: Story = {
  args: {
    ...Default.args,
    buttonType: 'primary'
  }
};

export const Warn: Story = {
  args: {
    ...Default.args,
    buttonType: 'warn'
  }
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small'
  }
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'large'
  }
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true
  }
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true
  }
};

export const Block: Story = {
  args: {
    ...Default.args,
    block: true
  }
};

export const Plain: Story = {
  args: {
    ...Default.args,
    plain: true
  }
};

export const Round: Story = {
  args: {
    ...Default.args,
    round: true
  }
};

export const Circle: Story = {
  args: {
    ...Default.args,
    circle: true
  }
};

export const AllTypes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; padding: 20px;">
        <div style="display: flex; gap: 12px; align-items: center;">
          <weui-button buttonType="primary">主要按钮</weui-button>
          <weui-button buttonType="default">默认按钮</weui-button>
          <weui-button buttonType="warn">警告按钮</weui-button>
        </div>
        
        <div style="display: flex; gap: 12px; align-items: center;">
          <weui-button size="small">小按钮</weui-button>
          <weui-button size="normal">普通按钮</weui-button>
          <weui-button size="large">大按钮</weui-button>
        </div>
        
        <div style="display: flex; gap: 12px; align-items: center;">
          <weui-button disabled>禁用按钮</weui-button>
          <weui-button loading>加载中</weui-button>
        </div>
        
        <div style="display: flex; gap: 12px; align-items: center;">
          <weui-button plain>朴素按钮</weui-button>
          <weui-button round>圆角按钮</weui-button>
          <weui-button circle>●</weui-button>
        </div>
        
        <weui-button block>块级按钮</weui-button>
      </div>
    `
  })
};
