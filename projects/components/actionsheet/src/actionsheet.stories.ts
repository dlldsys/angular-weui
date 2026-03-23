import { type Meta, type StoryObj } from '@storybook/angular';
import { WeUIActionSheetComponent, WeUIActionSheetItem } from './actionsheet.component';

const meta: Meta<WeUIActionSheetComponent> = {
  title: 'Components/ActionSheet',
  component: WeUIActionSheetComponent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    visible: {
      control: 'boolean',
      description: '是否显示'
    },
    title: {
      control: 'text',
      description: '标题'
    },
    actions: {
      control: 'object',
      description: '操作项列表'
    },
    showCancel: {
      control: 'boolean',
      description: '是否显示取消按钮'
    },
    cancelText: {
      control: 'text',
      description: '取消按钮文本'
    },
    mask: {
      control: 'boolean',
      description: '是否显示遮罩'
    },
    maskClosable: {
      control: 'boolean',
      description: '点击遮罩是否关闭'
    },
    zIndex: {
      control: 'number',
      description: 'z-index层级'
    },
    lockScroll: {
      control: 'boolean',
      description: '是否锁定背景滚动'
    }
  }
};

export default meta;
type Story = StoryObj<WeUIActionSheetComponent>;

const basicActions: WeUIActionSheetItem[] = [
  { name: '拍照' },
  { name: '从相册选择' },
  { name: '其他文件' }
];

const warnActions: WeUIActionSheetItem[] = [
  { name: '编辑' },
  { name: '删除', type: 'warn' },
  { name: '举报', type: 'warn' }
];

const iconActions: WeUIActionSheetItem[] = [
  { name: '发送给朋友', icon: 'weui-icon-share' },
  { name: '收藏', icon: 'weui-icon-star' },
  { name: '保存到相册', icon: 'weui-icon-photo' },
  { name: '复制链接', icon: 'weui-icon-link' }
];

const disabledActions: WeUIActionSheetItem[] = [
  { name: '可用操作' },
  { name: '禁用操作', type: 'disabled' },
  { name: '警告操作', type: 'warn' }
];

const loadingActions: WeUIActionSheetItem[] = [
  { name: '操作1' },
  { name: '加载中...', loading: true },
  { name: '操作3' }
];

export const Default: Story = {
  args: {
    visible: true,
    title: '请选择操作',
    actions: basicActions,
    showCancel: true,
    cancelText: '取消',
    mask: true,
    maskClosable: true,
    zIndex: 1000,
    lockScroll: true
  }
};

export const NoTitle: Story = {
  args: {
    ...Default.args,
    title: '',
    actions: basicActions
  }
};

export const WithCancel: Story = {
  args: {
    ...Default.args,
    showCancel: true,
    cancelText: '取消'
  }
};

export const NoCancel: Story = {
  args: {
    ...Default.args,
    showCancel: false
  }
};

export const WithCustomCancel: Story = {
  args: {
    ...Default.args,
    showCancel: true,
    cancelText: '我再想想'
  }
};

export const WarnActions: Story = {
  args: {
    ...Default.args,
    title: '危险操作',
    actions: warnActions
  }
};

export const WithIcons: Story = {
  args: {
    ...Default.args,
    title: '分享到',
    actions: iconActions
  }
};

export const WithDisabled: Story = {
  args: {
    ...Default.args,
    title: '混合操作',
    actions: disabledActions
  }
};

export const WithLoading: Story = {
  args: {
    ...Default.args,
    title: '加载状态',
    actions: loadingActions
  }
};

export const NoMask: Story = {
  args: {
    ...Default.args,
    mask: false
  }
};

export const MaskClosableFalse: Story = {
  args: {
    ...Default.args,
    maskClosable: false
  }
};

export const Interactive: Story = {
  render: () => ({
    props: {
      visible: false,
      actions: basicActions,
      showCancel: true,
      showActionSheet: function() {
        this['visible'] = true;
      },
      hideActionSheet: function() {
        this['visible'] = false;
      },
      handleSelect: function(event: { item: WeUIActionSheetItem; index: number }) {
        console.log('Selected:', event.item.name, 'at index:', event.index);
        this['visible'] = false;
      },
      handleCancel: function() {
        console.log('Cancelled');
        this['visible'] = false;
      }
    },
    template: `
      <div style="padding: 20px; display: flex; flex-direction: column; gap: 16px;">
        <h3>ActionSheet 交互示例</h3>
        <p>点击下方按钮打开操作菜单</p>
        
        <button 
          (click)="showActionSheet()"
          style="padding: 12px 24px; background: #07c160; color: white; border: none; border-radius: 8px; cursor: pointer;">
          打开 ActionSheet
        </button>
        
        <div style="margin-top: 20px;">
          <p><strong>当前状态:</strong> {{ visible ? '已打开' : '已关闭' }}</p>
        </div>
        
        <weui-actionsheet
          [visible]="visible"
          [actions]="actions"
          [showCancel]="showCancel"
          cancelText="取消"
          title="请选择操作"
          (select)="handleSelect($event)"
          (cancel)="handleCancel()"
          (visibleChange)="visible = $event">
        </weui-actionsheet>
      </div>
    `
  })
};

export const ShareSheet: Story = {
  render: () => ({
    props: {
      visible: true,
      actions: [
        { name: '微信', icon: 'weui-icon-chat' },
        { name: '朋友圈', icon: 'weui-icon-circle' },
        { name: 'QQ', icon: 'weui-icon-qq' },
        { name: '微博', icon: 'weui-icon-group' },
        { name: '复制链接', icon: 'weui-icon-link' },
        { name: '更多', icon: 'weui-icon-more' }
      ] as WeUIActionSheetItem[],
      showCancel: true
    },
    template: `
      <div style="padding: 40px; background: #f5f5f5;">
        <weui-actionsheet
          [visible]="visible"
          [actions]="actions"
          [showCancel]="showCancel"
          cancelText="取消"
          title="分享到">
        </weui-actionsheet>
      </div>
    `
  })
};

export const DangerSheet: Story = {
  render: () => ({
    props: {
      visible: true,
      actions: [
        { name: '编辑', type: 'default' },
        { name: '复制', type: 'default' },
        { name: '删除', type: 'warn' }
      ] as WeUIActionSheetItem[],
      showCancel: true
    },
    template: `
      <div style="padding: 40px; background: #f5f5f5;">
        <weui-actionsheet
          [visible]="visible"
          [actions]="actions"
          [showCancel]="showCancel"
          cancelText="取消"
          title="选择操作">
        </weui-actionsheet>
      </div>
    `
  })
};

export const LongList: Story = {
  render: () => ({
    props: {
      visible: true,
      actions: [
        { name: '选项一' },
        { name: '选项二' },
        { name: '选项三' },
        { name: '选项四' },
        { name: '选项五' },
        { name: '选项六' },
        { name: '选项七' },
        { name: '选项八' },
        { name: '选项九' },
        { name: '选项十' }
      ] as WeUIActionSheetItem[],
      showCancel: true
    },
    template: `
      <div style="padding: 40px; background: #f5f5f5;">
        <weui-actionsheet
          [visible]="visible"
          [actions]="actions"
          [showCancel]="showCancel"
          cancelText="取消"
          title="长列表示例">
        </weui-actionsheet>
      </div>
    `
  })
};
