import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { WeUIGalleryComponent } from '../index';
import { WeUIButtonComponent } from '../../button/index';

const meta: Meta<WeUIGalleryComponent> = {
  title: 'Components/Gallery',
  component: WeUIGalleryComponent,
  decorators: [
    moduleMetadata({
      imports: [WeUIGalleryComponent, WeUIButtonComponent, CommonModule],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    visible: {
      control: 'boolean'
    },
    showInfo: {
      control: 'boolean'
    },
    showDelete: {
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<WeUIGalleryComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      images: [
        { src: 'https://cn.bing.com/th?id=OHR.ThreePeaks_ZH-CN3727402889_1920x1080.jpg&rf=1&pid=hp&w=800&h=600&rs=1', alt: '图片1', description: '英国三峰国家公园 - 壮丽的山脉景观' },
        { src: 'https://cn.bing.com/th?id=OHR.PragueOldTown_ZH-CN3437169026_1920x1080.jpg&rf=1&pid=hp&w=800&h=600&rs=1', alt: '图片2', description: '布拉格老城广场 - 充满历史韵味的城市' },
        { src: 'https://cn.bing.com/th?id=OHR.RioLagoon_ZH-CN3369092473_1920x1080.jpg&rf=1&pid=hp&w=800&h=600&rs=1', alt: '图片3', description: '里约 lagoon - 碧蓝的海水与城市' },
      ]
    },
    template: `
      <div style="padding: 20px;">
        <button weui-button (click)="visible = true">打开 Gallery</button>
        <weui-gallery 
          [visible]="visible"
          [images]="images"
          [index]="0"
          [showInfo]="showInfo"
          [showDelete]="showDelete"
          (visibleChange)="visible = $event">
        </weui-gallery>
      </div>
    `
  })
};

export const SingleImage: Story = {
  render: (args) => ({
    props: {
      ...args,
      images: [
        { src: 'https://cn.bing.com/th?id=OHR.ThreePeaks_ZH-CN3727402889_1920x1080.jpg&rf=1&pid=hp&w=800&h=600&rs=1', alt: '单张图片' },
      ]
    },
    template: `
      <div style="padding: 20px;">
        <button weui-button (click)="visible = true">打开 Gallery</button>
        <weui-gallery 
          [visible]="visible"
          [images]="images"
          [index]="0"
          [showInfo]="false"
          (visibleChange)="visible = $event">
        </weui-gallery>
      </div>
    `
  })
};

export const MultipleImages: Story = {
  render: (args) => ({
    props: {
      ...args,
      currentIndex: 1,
      images: [
        { src: 'https://cn.bing.com/th?id=OHR.ThreePeaks_ZH-CN3727402889_1920x1080.jpg&rf=1&pid=hp&w=800&h=600&rs=1', alt: '图片1' },
        { src: 'https://cn.bing.com/th?id=OHR.PragueOldTown_ZH-CN3437169026_1920x1080.jpg&rf=1&pid=hp&w=800&h=600&rs=1', alt: '图片2' },
        { src: 'https://cn.bing.com/th?id=OHR.RioLagoon_ZH-CN3369092473_1920x1080.jpg&rf=1&pid=hp&w=800&h=600&rs=1', alt: '图片3' },
        { src: 'https://cn.bing.com/th?id=OHR.NorthernLights_ZH-CN3257369475_1920x1080.jpg&rf=1&pid=hp&w=800&h=600&rs=1', alt: '图片4' },
        { src: 'https://cn.bing.com/th?id=OHR.SunriseTree_ZH-CN3004814987_1920x1080.jpg&rf=1&pid=hp&w=800&h=600&rs=1', alt: '图片5' },
      ]
    },
    template: `
      <div style="padding: 20px;">
        <button weui-button (click)="visible = true">打开 Gallery (从第二张开始)</button>
        <weui-gallery 
          [visible]="visible"
          [images]="images"
          [index]="currentIndex"
          [showInfo]="true"
          (visibleChange)="visible = $event"
          (indexChange)="currentIndex = $event">
        </weui-gallery>
      </div>
    `
  })
};

export const WithDescriptions: Story = {
  render: (args) => ({
    props: {
      ...args,
      images: [
        { src: 'https://cn.bing.com/th?id=OHR.ThreePeaks_ZH-CN3727402889_1920x1080.jpg&rf=1&pid=hp&w=800&h=600&rs=1', alt: '自然1', description: '大自然的美丽风景 - 山川湖泊' },
        { src: 'https://cn.bing.com/th?id=OHR.PragueOldTown_ZH-CN3437169026_1920x1080.jpg&rf=1&pid=hp&w=800&h=600&rs=1', alt: '自然2', description: '蓝天白云下的草原' },
        { src: 'https://cn.bing.com/th?id=OHR.RioLagoon_ZH-CN3369092473_1920x1080.jpg&rf=1&pid=hp&w=800&h=600&rs=1', alt: '自然3', description: '夕阳下的海边日落' },
      ]
    },
    template: `
      <div style="padding: 20px;">
        <button weui-button (click)="visible = true">打开 Gallery (带描述)</button>
        <weui-gallery 
          [visible]="visible"
          [images]="images"
          [index]="0"
          [showInfo]="true"
          (visibleChange)="visible = $event">
        </weui-gallery>
      </div>
    `
  })
};
