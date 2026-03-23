import { type Meta, type StoryObj } from '@storybook/angular';
import { WeUIGridComponent } from '../index';
import { WeUIGridItemComponent } from '../index';

const meta: Meta<WeUIGridComponent> = {
  title: 'Components/Grid',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'select',
      options: [2, 3, 4, 5]
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md']
    }
  }
};

export default meta;
type Story = StoryObj<WeUIGridComponent>;

export const Default: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-grid [columns]="3">
        <weui-grid-item *ngFor="let item of [1,2,3,4,5,6,7,8,9]">
          <div class="demo-grid-icon">📱</div>
          <div class="demo-grid-label">网格 {{ item }}</div>
        </weui-grid-item>
      </weui-grid>
    `,
    styles: [`
      .demo-grid-icon {
        font-size: 28px;
        margin-bottom: 4px;
      }
      .demo-grid-label {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.9);
      }
    `]
  })
};

export const TwoColumns: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-grid [columns]="2" gap="sm">
        <weui-grid-item *ngFor="let item of [1,2,3,4]">
          <div class="demo-grid-icon">📱</div>
          <div class="demo-grid-label">网格 {{ item }}</div>
        </weui-grid-item>
      </weui-grid>
    `,
    styles: [`
      .demo-grid-icon {
        font-size: 28px;
        margin-bottom: 4px;
      }
      .demo-grid-label {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.9);
      }
    `]
  })
};

export const FourColumns: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-grid [columns]="4" gap="sm">
        <weui-grid-item *ngFor="let item of [1,2,3,4,5,6,7,8]">
          <div class="demo-grid-icon">📱</div>
          <div class="demo-grid-label">网格 {{ item }}</div>
        </weui-grid-item>
      </weui-grid>
    `,
    styles: [`
      .demo-grid-icon {
        font-size: 28px;
        margin-bottom: 4px;
      }
      .demo-grid-label {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.9);
      }
    `]
  })
};

export const WithImages: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-grid [columns]="3" gap="sm">
        <weui-grid-item *ngFor="let item of [1,2,3,4,5,6]">
          <img src="https://via.placeholder.com/80x80/07c160/ffffff?text={{ item }}" alt="图标 {{ item }}" style="width: 40px; height: 40px; object-fit: cover;" />
          <div class="demo-grid-label">图标 {{ item }}</div>
        </weui-grid-item>
      </weui-grid>
    `,
    styles: [`
      .demo-grid-label {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.9);
        margin-top: 4px;
      }
    `]
  })
};

export const NoGap: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-grid [columns]="3" gap="none">
        <weui-grid-item *ngFor="let item of [1,2,3,4,5,6]">
          <div class="demo-grid-icon">📱</div>
          <div class="demo-grid-label">网格 {{ item }}</div>
        </weui-grid-item>
      </weui-grid>
    `,
    styles: [`
      .demo-grid-icon {
        font-size: 28px;
        margin-bottom: 4px;
      }
      .demo-grid-label {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.9);
      }
    `]
  })
};
