import { type Meta, type StoryObj } from '@storybook/angular';
import { WeUITabbarComponent } from './tabbar.component';

const meta: Meta<WeUITabbarComponent> = {
  title: 'Components/Tabbar',
  component: WeUITabbarComponent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object'
    },
    activeIndex: {
      control: 'number'
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
type Story = StoryObj<WeUITabbarComponent>;

// 使用 emoji 图标的示例
export const Default: Story = {
  args: {
    items: [
      { id: 'home', text: '首页', icon: '🏠' },
      { id: 'discover', text: '发现', icon: '🔍' },
      { id: 'profile', text: '我的', icon: '👤' }
    ],
    activeIndex: 0
  }
};

// 使用图片图标的示例
export const WithImageIcons: Story = {
  args: {
    items: [
      { 
        id: 'home', 
        text: '首页', 
        icon: 'https://cdn-icons-png.flaticon.com/24/1946/1946436.png',
        activeIcon: 'https://cdn-icons-png.flaticon.com/24/1946/1946436.png'
      },
      { 
        id: 'discover', 
        text: '发现', 
        icon: 'https://cdn-icons-png.flaticon.com/24/565/565419.png',
        activeIcon: 'https://cdn-icons-png.flaticon.com/24/565/565419.png'
      },
      { 
        id: 'profile', 
        text: '我的', 
        icon: 'https://cdn-icons-png.flaticon.com/24/1077/1077063.png',
        activeIcon: 'https://cdn-icons-png.flaticon.com/24/1077/1077063.png'
      }
    ],
    activeIndex: 0
  }
};

export const WithBadges: Story = {
  args: {
    items: [
      { id: 'home', text: '首页', icon: '🏠' },
      { id: 'messages', text: '消息', icon: '💬', badge: 5 },
      { id: 'notifications', text: '通知', icon: '🔔', badge: '新' },
      { id: 'profile', text: '我的', icon: '👤', badge: 99 }
    ],
    activeIndex: 0
  }
};

export const WithDisabledItem: Story = {
  args: {
    items: [
      { id: 'home', text: '首页', icon: '🏠' },
      { id: 'discover', text: '发现', icon: '🔍' },
      { id: 'vip', text: 'VIP', icon: '⭐', disabled: true },
      { id: 'profile', text: '我的', icon: '👤' }
    ],
    activeIndex: 0
  }
};

export const NotFixed: Story = {
  args: {
    items: [
      { id: 'tab1', text: '标签1', icon: '📌' },
      { id: 'tab2', text: '标签2', icon: '📋' },
      { id: 'tab3', text: '标签3', icon: '📊' }
    ],
    fixed: false,
    border: true
  }
};

export const Interactive: Story = {
  render: () => ({
    props: {
      items: [
        { id: 'home', text: '首页', icon: '🏠' },
        { id: 'discover', text: '发现', icon: '🔍' },
        { id: 'profile', text: '我的', icon: '👤' }
      ],
      activeIndex: 0,
      handleTabChange: (event: any) => {
        console.log('Tab changed:', event);
      }
    },
    template: `
      <div style="height: 200px; display: flex; flex-direction: column;">
        <div style="flex: 1; display: flex; align-items: center; justify-content: center; background: #f5f5f5;">
          <div style="text-align: center;">
            <h3>当前选中: {{ items[activeIndex]?.text }}</h3>
            <p>索引: {{ activeIndex }}</p>
          </div>
        </div>
        
        <weui-tabbar 
          [items]="items" 
          [activeIndex]="activeIndex"
          (change)="handleTabChange($event)">
        </weui-tabbar>
      </div>
    `
  })
};

export const FourItems: Story = {
  args: {
    items: [
      { id: 'home', text: '首页', icon: '🏠' },
      { id: 'messages', text: '消息', icon: '💬', badge: 3 },
      { id: 'discover', text: '发现', icon: '🔍' },
      { id: 'profile', text: '我的', icon: '👤' }
    ],
    activeIndex: 0
  }
};
