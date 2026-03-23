import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { WeUIPickerComponent, WeUIPickerColumn } from './picker.component';
import { WeUIButtonComponent } from '../../button/index';

const meta: Meta<WeUIPickerComponent> = {
  title: 'Components/Picker',
  component: WeUIPickerComponent,
  decorators: [
    moduleMetadata({
      imports: [WeUIPickerComponent, WeUIButtonComponent, CommonModule],
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
    title: {
      control: 'text'
    },
    maskClosable: {
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<WeUIPickerComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      singleColumn: [
        { label: '飞机票', value: 0 },
        { label: '火车票', value: 1 },
        { label: '的士票', value: 2 },
        { label: '公交票', value: 3, disabled: true },
        { label: '其他', value: 4 },
      ] as WeUIPickerColumn[],
      handleConfirm: (result: any) => {
        console.log('Picker Result:', result);
        alert(`选择了: ${result.labels.join(', ')}`);
      },
      handleCancel: () => {
        console.log('Picker cancelled');
      }
    },
    template: `
      <div style="padding: 20px;">
        <button weui-button (click)="visible = true">打开单列选择器</button>
        <weui-picker 
          [visible]="visible"
          [columns]="[singleColumn]"
          title="单列选择器"
          [maskClosable]="maskClosable"
          (confirm)="handleConfirm($event)"
          (cancel)="handleCancel()"
          (visibleChange)="visible = $event">
        </weui-picker>
      </div>
    `
  })
};

export const MultiColumn: Story = {
  render: (args) => ({
    props: {
      ...args,
      provinces: [
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' },
        { label: '广东', value: 'guangdong' },
        { label: '浙江', value: 'zhejiang' },
      ] as WeUIPickerColumn[],
      cities: [
        { label: '北京市', value: 'beijingshi' },
        { label: '海淀区', value: 'haidian' },
        { label: '朝阳区', value: 'chaoyang' },
        { label: '浦东新区', value: 'pudong' },
        { label: '广州市', value: 'guangzhoushi' },
        { label: '深圳市', value: 'shenzhen' },
      ] as WeUIPickerColumn[],
      handleConfirm: (result: any) => {
        console.log('Multi Column Result:', result);
        alert(`选择了: ${result.labels.join(' - ')}`);
      },
      handleCancel: () => {
        console.log('Multi Column Picker cancelled');
      }
    },
    template: `
      <div style="padding: 20px;">
        <button weui-button (click)="visible = true">打开多列选择器</button>
        <weui-picker 
          [visible]="visible"
          [columns]="[provinces, cities]"
          title="省市区选择"
          [maskClosable]="maskClosable"
          (confirm)="handleConfirm($event)"
          (cancel)="handleCancel()"
          (visibleChange)="visible = $event">
        </weui-picker>
      </div>
    `
  })
};

export const TimePicker: Story = {
  render: (args) => ({
    props: {
      ...args,
      hours: Array.from({ length: 24 }, (_, i) => ({
        label: `${i.toString().padStart(2, '0')} 时`,
        value: i
      })) as WeUIPickerColumn[],
      minutes: Array.from({ length: 60 }, (_, i) => ({
        label: `${i.toString().padStart(2, '0')} 分`,
        value: i
      })) as WeUIPickerColumn[],
      handleConfirm: (result: any) => {
        console.log('Time Result:', result);
        alert(`选择了: ${result.labels.join(':')}`);
      },
      handleCancel: () => {
        console.log('Time Picker cancelled');
      }
    },
    template: `
      <div style="padding: 20px;">
        <button weui-button (click)="visible = true">打开时间选择器</button>
        <weui-picker 
          [visible]="visible"
          [columns]="[hours, minutes]"
          title="选择时间"
          [maskClosable]="maskClosable"
          (confirm)="handleConfirm($event)"
          (cancel)="handleCancel()"
          (visibleChange)="visible = $event">
        </weui-picker>
      </div>
    `
  })
};

export const DatePicker: Story = {
  render: (args) => ({
    props: {
      ...args,
      years: Array.from({ length: 50 }, (_, i) => ({
        label: `${1990 + i} 年`,
        value: 1990 + i
      })) as WeUIPickerColumn[],
      months: Array.from({ length: 12 }, (_, i) => ({
        label: `${(i + 1).toString().padStart(2, '0')} 月`,
        value: i + 1
      })) as WeUIPickerColumn[],
      days: Array.from({ length: 31 }, (_, i) => ({
        label: `${(i + 1).toString().padStart(2, '0')} 日`,
        value: i + 1
      })) as WeUIPickerColumn[],
      handleConfirm: (result: any) => {
        console.log('Date Result:', result);
        alert(`选择了: ${result.labels.join('-')}`);
      },
      handleCancel: () => {
        console.log('Date Picker cancelled');
      }
    },
    template: `
      <div style="padding: 20px;">
        <button weui-button (click)="visible = true">打开日期选择器</button>
        <weui-picker 
          [visible]="visible"
          [columns]="[years, months, days]"
          title="选择日期"
          [maskClosable]="maskClosable"
          (confirm)="handleConfirm($event)"
          (cancel)="handleCancel()"
          (visibleChange)="visible = $event">
        </weui-picker>
      </div>
    `
  })
};

export const WithDisabledItems: Story = {
  render: (args) => ({
    props: {
      ...args,
      items: [
        { label: '选项 1', value: 1 },
        { label: '选项 2', value: 2 },
        { label: '禁用选项', value: 3, disabled: true },
        { label: '选项 4', value: 4 },
        { label: '禁用选项 2', value: 5, disabled: true },
        { label: '选项 6', value: 6 },
      ] as WeUIPickerColumn[],
      handleConfirm: (result: any) => {
        console.log('Disabled Items Result:', result);
        alert(`选择了: ${result.labels.join(', ')}`);
      },
      handleCancel: () => {
        console.log('Picker with disabled items cancelled');
      }
    },
    template: `
      <div style="padding: 20px;">
        <button weui-button (click)="visible = true">打开带禁用项的选择器</button>
        <weui-picker 
          [visible]="visible"
          [columns]="[items]"
          title="带禁用项"
          [maskClosable]="maskClosable"
          (confirm)="handleConfirm($event)"
          (cancel)="handleCancel()"
          (visibleChange)="visible = $event">
        </weui-picker>
      </div>
    `
  })
};
