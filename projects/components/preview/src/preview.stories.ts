import { type Meta, type StoryObj } from '@storybook/angular';
import { WeUIPreviewComponent, WeUIPreviewItemComponent } from './preview.component';

const meta: Meta<WeUIPreviewComponent> = {
  title: 'Components/Preview',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text'
    },
    subTitle: {
      control: 'text'
    },
    value: {
      control: 'text'
    },
    valueBold: {
      control: 'boolean'
    },
    primaryBtn: {
      control: 'text'
    },
    secondaryBtn: {
      control: 'text'
    }
  }
};

export default meta;
type Story = StoryObj<WeUIPreviewComponent>;

export const Default: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-preview 
        title="标题" 
        subTitle="副标题信息"
        value="¥100.00"
        [valueBold]="true"
        primaryBtn="主操作"
        secondaryBtn="辅助操作"
      >
        <weui-preview-item label="标题" value="内容文字"></weui-preview-item>
        <weui-preview-item label="标题" value="内容文字"></weui-preview-item>
      </weui-preview>
    `
  })
};

export const OrderPreview: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-preview 
        title="订单信息" 
        subTitle="订单号: 202401010001"
        primaryBtn="确认收货"
        secondaryBtn="取消订单"
      >
        <weui-preview-item label="商品名称" value="WeUI Angular 组件库"></weui-preview-item>
        <weui-preview-item label="商品价格" value="¥99.00"></weui-preview-item>
        <weui-preview-item label="配送地址" value="北京市朝阳区某某街道"></weui-preview-item>
        <weui-preview-item label="备注" value="请小心轻放"></weui-preview-item>
      </weui-preview>
    `
  })
};

export const PaymentPreview: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-preview 
        title="支付信息" 
        value="¥199.00"
        [valueBold]="true"
        primaryBtn="确认支付"
      >
        <weui-preview-item label="订单编号" value="20240101123456789"></weui-preview-item>
        <weui-preview-item label="商品名称" value="年度会员"></weui-preview-item>
        <weui-preview-item label="支付方式" value="微信支付"></weui-preview-item>
      </weui-preview>
    `
  })
};

export const TransferPreview: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-preview 
        title="转账详情"
        value="¥5,000.00"
        [valueBold]="true"
        primaryBtn="转账"
      >
        <weui-preview-item label="收款人" value="张三"></weui-preview-item>
        <weui-preview-item label="收款银行" value="中国银行 (****4567)"></weui-preview-item>
        <weui-preview-item label="转账说明" value="月度分红"></weui-preview-item>
        <weui-preview-item label="到账时间" value="预计2小时内到账"></weui-preview-item>
      </weui-preview>
    `
  })
};

export const WithLink: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-preview 
        title="链接预览"
        primaryBtn="查看详情"
        secondaryBtn="返回"
      >
        <weui-preview-item label="名称" value="WeUI Angular"></weui-preview-item>
        <weui-preview-item label="官网" value="https://weui.io" href="https://weui.io"></weui-preview-item>
        <weui-preview-item label="描述" value="微信风格的 Angular 组件库"></weui-preview-item>
      </weui-preview>
    `
  })
};
