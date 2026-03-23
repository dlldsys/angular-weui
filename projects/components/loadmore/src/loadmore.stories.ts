import { type Meta, type StoryObj } from '@storybook/angular';
import { WeUILoadmoreComponent } from './loadmore.component';

const meta: Meta<WeUILoadmoreComponent> = {
  title: 'Components/Loadmore',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<WeUILoadmoreComponent>;

export const Loading: Story = {
  render: () => ({
    props: {
      loadingText: '正在加载...'
    },
    template: `
      <div style="background: var(--weui-BG-2); padding: 20px;">
        <weui-loadmore type="loading" [loadingText]="loadingText"></weui-loadmore>
      </div>
    `
  })
};

export const LoadingLine: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="background: var(--weui-BG-2); padding: 20px;">
        <weui-loadmore type="loadingline" tips="加载中"></weui-loadmore>
      </div>
    `
  })
};

export const Nodata: Story = {
  render: () => ({
    props: {
      nodataText: '暂无数据'
    },
    template: `
      <div style="background: var(--weui-BG-2); padding: 20px;">
        <weui-loadmore type="nodata" [nodataText]="nodataText"></weui-loadmore>
      </div>
    `
  })
};

export const CustomText: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="background: var(--weui-BG-2); padding: 20px;">
        <weui-loadmore type="loading" loadingText="加载更多内容，请稍候..."></weui-loadmore>
      </div>
    `
  })
};

export const InList: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="max-width: 400px; background: var(--weui-BG-2);">
        <div style="padding: 16px;">
          <h3 style="margin: 0 0 12px; font-size: 16px;">文章列表</h3>
          <p style="margin: 8px 0; color: var(--weui-FG-1); font-size: 14px;">文章内容占位区域...</p>
          <p style="margin: 8px 0; color: var(--weui-FG-1); font-size: 14px;">文章内容占位区域...</p>
        </div>
        <weui-loadmore type="loading" loadingText="正在加载更多"></weui-loadmore>
      </div>
    `
  })
};
