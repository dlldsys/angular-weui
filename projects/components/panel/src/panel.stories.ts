import { type Meta, type StoryObj } from '@storybook/angular';
import { WeUIPanelComponent } from './panel.component';

const meta: Meta<WeUIPanelComponent> = {
  title: 'Components/Panel',
  component: WeUIPanelComponent,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text'
    },
    more: {
      control: 'text'
    },
    access: {
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<WeUIPanelComponent>;

export const Default: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-panel title="面板标题">
        <div style="padding: 16px; color: rgba(0, 0, 0, 0.6);">
          这里是面板内容区域，可以放置任意内容。
        </div>
      </weui-panel>
    `
  })
};

export const WithMoreLink: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-panel title="面板标题" more="查看更多" moreHref="#">
        <div style="padding: 16px; color: rgba(0, 0, 0, 0.6);">
          面板内容，带有"查看更多"链接。
        </div>
      </weui-panel>
    `
  })
};

export const MediaList: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-panel title="图文组合列表" more="更多" moreHref="#">
        <div class="weui-media-box weui-media-box_text">
          <img class="weui-media-box__thumb" src="https://via.placeholder.com/60x60/07c160/ffffff?text=1" alt="缩略图" />
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">标题一</h4>
            <p class="weui-media-box__desc">这里是描述文字，可以是多行文本。</p>
          </div>
        </div>
        <div class="weui-media-box weui-media-box_text">
          <img class="weui-media-box__thumb" src="https://via.placeholder.com/60x60/10aeff/ffffff?text=2" alt="缩略图" />
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">标题二</h4>
            <p class="weui-media-box__desc">这里是另一条描述文字。</p>
          </div>
        </div>
        <div class="weui-media-box weui-media-box_text">
          <img class="weui-media-box__thumb" src="https://via.placeholder.com/60x60/fa5151/ffffff?text=3" alt="缩略图" />
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">标题三</h4>
            <p class="weui-media-box__desc">这里是第三条描述文字。</p>
          </div>
        </div>
      </weui-panel>
    `
  })
};

export const TextList: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-panel title="文字列表">
        <div style="padding: 16px; color: rgba(0, 0, 0, 0.6);">
          文字列表项一
        </div>
        <div style="padding: 16px; color: rgba(0, 0, 0, 0.6);">
          文字列表项二
        </div>
        <div style="padding: 16px; color: rgba(0, 0, 0, 0.6);">
          文字列表项三
        </div>
      </weui-panel>
    `
  })
};

export const AccessList: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-panel [access]="true" style="border-radius: 0;">
        <div style="padding: 16px; color: rgba(0, 0, 0, 0.9); cursor: pointer;">
          链接列表项一 →
        </div>
        <div style="padding: 16px; color: rgba(0, 0, 0, 0.9); cursor: pointer;">
          链接列表项二 →
        </div>
        <div style="padding: 16px; color: rgba(0, 0, 0, 0.9); cursor: pointer;">
          链接列表项三 →
        </div>
      </weui-panel>
    `
  })
};
