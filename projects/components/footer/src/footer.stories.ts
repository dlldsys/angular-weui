import { type Meta, type StoryObj } from '@storybook/angular';
import { WeUIFooterComponent } from './footer.component';

const meta: Meta<WeUIFooterComponent> = {
  title: 'Components/Footer',
  component: WeUIFooterComponent,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text'
    },
    fixed: {
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<WeUIFooterComponent>;

export const Default: Story = {
  args: {
    text: 'Copyright © 2024 WeUI Angular'
  }
};

export const WithLinks: Story = {
  args: {
    links: [
      { text: '链接一', href: '#' },
      { text: '链接二', href: '#' },
      { text: '链接三', href: '#' }
    ]
  }
};

export const WithLinksAndText: Story = {
  args: {
    links: [
      { text: '帮助中心', href: '#' },
      { text: '联系客服', href: '#' }
    ],
    text: 'Copyright © 2024 WeUI Angular'
  }
};

export const Fixed: Story = {
  args: {
    text: '固定在底部的 Footer',
    fixed: true
  }
};

export const Complex: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="height: 200px; display: flex; flex-direction: column; justify-content: flex-end;">
        <weui-footer 
          [links]="[
            { text: '帮助中心', href: '#' },
            { text: '联系客服', href: '#' },
            { text: '隐私政策', href: '#' }
          ]"
          text="Copyright © 2024 WeUI Angular"
        ></weui-footer>
      </div>
    `
  })
};
