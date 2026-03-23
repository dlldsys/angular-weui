import { type Meta, type StoryObj } from '@storybook/angular';
import { WeUINavbarComponent } from './navbar.component';

const meta: Meta<WeUINavbarComponent> = {
  title: 'Components/Navbar',
  component: WeUINavbarComponent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text'
    },
    mode: {
      control: 'select',
      options: ['default', 'light', 'dark']
    },
    showBack: {
      control: 'boolean'
    },
    backText: {
      control: 'text'
    },
    fixed: {
      control: 'boolean'
    },
    zIndex: {
      control: 'number'
    },
    border: {
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<WeUINavbarComponent>;

export const Default: Story = {
  args: {
    title: '页面标题',
    showBack: true
  }
};

export const LightMode: Story = {
  args: {
    title: '浅色模式',
    mode: 'light',
    showBack: true
  }
};

export const DarkMode: Story = {
  args: {
    title: '深色模式',
    mode: 'dark',
    showBack: true
  }
};

export const Fixed: Story = {
  args: {
    title: '固定导航栏',
    fixed: true,
    showBack: true
  }
};

export const NoBorder: Story = {
  args: {
    title: '无边框',
    border: false,
    showBack: true
  }
};

export const CustomContent: Story = {
  render: () => ({
    props: {
      handleBack: () => console.log('Back clicked'),
      handleMenu: () => console.log('Menu clicked')
    },
    template: `
      <weui-navbar title="自定义内容" (back)="handleBack()">
        <ng-template #left>
          <button class="custom-btn" (click)="handleBack()">
            <i class="icon-back"></i>
          </button>
        </ng-template>
        
        <ng-template #title>
          <div style="display: flex; align-items: center; gap: 8px;">
            <i class="icon-home"></i>
            <span>自定义标题</span>
          </div>
        </ng-template>
        
        <ng-template #right>
          <button class="custom-btn" (click)="handleMenu()">
            <i class="icon-menu"></i>
          </button>
        </ng-template>
      </weui-navbar>
    `,
    styles: [`
      .custom-btn {
        padding: 8px;
        background: none;
        border: none;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.2s;
      }
      .custom-btn:hover {
        background-color: rgba(0,0,0,0.1);
      }
      .icon-back::before { content: '←'; }
      .icon-home::before { content: '🏠'; }
      .icon-menu::before { content: '☰'; }
    `]
  })
};

export const WithRightActions: Story = {
  render: () => ({
    props: {
      handleShare: () => console.log('Share clicked'),
      handleMore: () => console.log('More clicked')
    },
    template: `
      <weui-navbar title="带操作按钮" showBack="true">
        <div weui-navbar-right style="display: flex; gap: 8px;">
          <button class="action-btn" (click)="handleShare()">分享</button>
          <button class="action-btn" (click)="handleMore()">更多</button>
        </div>
      </weui-navbar>
    `,
    styles: [`
      .action-btn {
        padding: 6px 12px;
        background: #07c160;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
      }
    `]
  })
};
