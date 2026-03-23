import { type Meta, type StoryObj } from '@storybook/angular';
import { WeUICellComponent } from './cell.component';

const meta: Meta<WeUICellComponent> = {
  title: 'Components/Cell',
  component: WeUICellComponent,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '单元格标题'
    },
    description: {
      control: 'text',
      description: '单元格描述'
    },
    value: {
      control: 'text',
      description: '单元格值'
    },
    icon: {
      control: 'text',
      description: '左侧图标类名'
    },
    clickable: {
      control: 'boolean',
      description: '是否可点击'
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用'
    },
    isLink: {
      control: 'boolean',
      description: '是否显示箭头'
    }
  }
};

export default meta;
type Story = StoryObj<WeUICellComponent>;

export const Default: Story = {
  args: {
    title: '标题文本',
    description: '描述文本',
    value: '',
    clickable: false,
    disabled: false,
    isLink: false
  }
};

export const WithIcon: Story = {
  args: {
    ...Default.args,
    icon: 'weui-icon-success',
    title: '带图标的单元格'
  }
};

export const Clickable: Story = {
  args: {
    ...Default.args,
    title: '可点击单元格',
    clickable: true
  }
};

export const WithArrow: Story = {
  args: {
    ...Default.args,
    title: '带箭头单元格',
    clickable: true,
    isLink: true
  }
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    title: '禁用单元格',
    disabled: true,
    clickable: true
  }
};

export const WithValue: Story = {
  args: {
    ...Default.args,
    title: '名称',
    value: '值'
  }
};

export const FullCell: Story = {
  args: {
    ...Default.args,
    icon: 'weui-icon-success',
    title: '完整单元格',
    description: '这是一段描述文本',
    value: '内容',
    clickable: true,
    isLink: true
  }
};

export const CellGroup: Story = {
  render: () => ({
    props: {},
    template: `
      <div class="weui-cells">
        <weui-cell 
          title="基本设置" 
          value="设置值"
          icon="weui-icon-settings"
          [clickable]="true"
          [isLink]="true">
        </weui-cell>
        
        <weui-cell 
          title="个人信息" 
          value="查看"
          icon="weui-icon-user"
          [clickable]="true"
          [isLink]="true">
        </weui-cell>
        
        <weui-cell 
          title="安全设置" 
          value="保障中"
          icon="weui-icon-safe"
          [clickable]="true"
          [isLink]="true">
        </weui-cell>
      </div>
    `
  })
};

export const FormCells: Story = {
  render: () => ({
    props: {},
    template: `
      <div class="weui-cells">
        <weui-cell 
          title="用户名"
          value="admin">
        </weui-cell>
        
        <weui-cell 
          title="手机号"
          value="138****8888">
        </weui-cell>
        
        <weui-cell 
          title="邮箱"
          value="user@example.com">
        </weui-cell>
      </div>
    `
  })
};

export const InteractiveCells: Story = {
  render: () => ({
    props: {
      items: [
        { id: 1, title: '首页', icon: 'weui-icon-home', value: '' },
        { id: 2, title: '收藏', icon: 'weui-icon-star', value: '' },
        { id: 3, title: '相册', icon: 'weui-icon-photo', value: '' },
        { id: 4, title: '卡包', icon: 'weui-icon-card', value: '' },
        { id: 5, title: '设置', icon: 'weui-icon-settings', value: '' }
      ],
      selectedId: 1,
      handleClick: function(id: number) {
        this['selectedId'] = id;
      }
    },
    template: `
      <div class="weui-cells">
        <weui-cell 
          *ngFor="let item of items"
          [title]="item.title"
          [icon]="item.icon"
          [clickable]="true"
          [isLink]="true"
          (click)="handleClick(item.id)">
        </weui-cell>
      </div>
    `
  })
};

export const WithCustomContent: Story = {
  render: () => ({
    props: {
      username: '张三',
      email: 'zhangsan@example.com'
    },
    template: `
      <div class="weui-cells">
        <weui-cell>
          <ng-template>
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 50px; height: 50px; background: #07c160; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                {{ username.charAt(0) }}
              </div>
              <div>
                <div style="font-weight: 500;">{{ username }}</div>
                <div style="font-size: 12px; color: #888;">{{ email }}</div>
              </div>
            </div>
          </ng-template>
        </weui-cell>
      </div>
    `
  })
};

export const AccessCell: Story = {
  render: () => ({
    props: {},
    template: `
      <div class="weui-cells">
        <weui-cell 
          title="小白" 
          description="微信号: xiaobai"
          icon="weui-icon-user"
          [clickable]="true"
          [isLink]="true">
        </weui-cell>
        
        <weui-cell 
          title="地区"
          value="广东 深圳"
          [clickable]="true"
          [isLink]="true">
        </weui-cell>
        
        <weui-cell 
          title="性别"
          value="男"
          [clickable]="true"
          [isLink]="true">
        </weui-cell>
      </div>
    `
  })
};
