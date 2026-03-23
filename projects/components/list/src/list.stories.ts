import { type Meta, type StoryObj } from '@storybook/angular';
import { WeUIListComponent, WeUIListItemComponent } from './list.component';

const meta: Meta<WeUIListComponent> = {
  title: 'Components/List',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<WeUIListComponent>;

export const Default: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-list>
        <weui-list-item label="标题文字" value="说明文字"></weui-list-item>
        <weui-list-item label="标题文字" value="说明文字"></weui-list-item>
        <weui-list-item label="标题文字" value="说明文字"></weui-list-item>
      </weui-list>
    `
  })
};

export const WithIcons: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-list>
        <weui-list-item 
          label="我的收藏" 
          value="122" 
          icon="weui-icon-collection"
        ></weui-list-item>
        <weui-list-item 
          label="我的订阅" 
          value="32" 
          icon="weui-icon-subscribe"
        ></weui-list-item>
        <weui-list-item 
          label="我的红包" 
          icon="weui-icon-redpacket"
        ></weui-list-item>
      </weui-list>
    `
  })
};

export const WithThumbs: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-list>
        <weui-list-item 
          label="我的收藏" 
          value="122" 
          thumb="https://via.placeholder.com/28/07c160/ffffff?text=1"
        ></weui-list-item>
        <weui-list-item 
          label="我的订阅" 
          value="32" 
          thumb="https://via.placeholder.com/28/10aeff/ffffff?text=2"
        ></weui-list-item>
        <weui-list-item 
          label="我的红包" 
          thumb="https://via.placeholder.com/28/fa5151/ffffff?text=3"
        ></weui-list-item>
      </weui-list>
    `
  })
};

export const AccessList: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-list access>
        <weui-list-item 
          label="个人中心" 
          arrow="true"
        ></weui-list-item>
        <weui-list-item 
          label="设置" 
          value="未开启" 
          arrow="true"
        ></weui-list-item>
        <weui-list-item 
          label="意见反馈" 
          arrow="true"
        ></weui-list-item>
      </weui-list>
    `
  })
};

export const GroupedList: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="max-width: 400px;">
        <weui-list title="基础信息">
          <weui-list-item label="姓名" value="张三"></weui-list-item>
          <weui-list-item label="手机号" value="138****8888"></weui-list-item>
          <weui-list-item label="邮箱" value="zhang@example.com"></weui-list-item>
        </weui-list>
        
        <weui-list title="账户设置" access>
          <weui-list-item label="修改密码" arrow="true"></weui-list-item>
          <weui-list-item label="支付设置" arrow="true"></weui-list-item>
          <weui-list-item label="安全中心" arrow="true"></weui-list-item>
        </weui-list>
      </div>
    `
  })
};

export const MediaList: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-list>
        <weui-list-item 
          label="这是标题"
          desc="描述信息描述信息描述信息描述信息描述信息描述信息描述信息"
          thumb="https://via.placeholder.com/56/07c160/ffffff?text=图"
          arrow="true"
        ></weui-list-item>
        <weui-list-item 
          label="这是标题"
          desc="描述信息描述信息描述信息描述信息描述信息描述信息描述信息"
          thumb="https://via.placeholder.com/56/10aeff/ffffff?text=图"
          arrow="true"
        ></weui-list-item>
      </weui-list>
    `
  })
};
