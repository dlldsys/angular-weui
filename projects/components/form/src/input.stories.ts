import { type Meta, type StoryObj } from '@storybook/angular';
import { WeUIInputComponent, WeUIInputType, WeUIInputSize, WeUIInputStatus } from './input.component';

const meta: Meta<WeUIInputComponent> = {
  title: 'Components/Form/Input',
  component: WeUIInputComponent,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'number', 'tel', 'email', 'url', 'search'],
      description: '输入框类型'
    },
    size: {
      control: 'select',
      options: ['small', 'normal', 'large'],
      description: '输入框尺寸'
    },
    label: {
      control: 'text',
      description: '标签文本'
    },
    placeholder: {
      control: 'text',
      description: '占位文本'
    },
    value: {
      control: 'text',
      description: '输入值'
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用'
    },
    readonly: {
      control: 'boolean',
      description: '是否只读'
    },
    clearable: {
      control: 'boolean',
      description: '是否显示清除按钮'
    },
    loading: {
      control: 'boolean',
      description: '是否显示加载状态'
    },
    maxlength: {
      control: 'number',
      description: '最大输入长度'
    },
    minlength: {
      control: 'number',
      description: '最小输入长度'
    },
    helpText: {
      control: 'text',
      description: '帮助文本'
    },
    errorMessage: {
      control: 'text',
      description: '错误信息'
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: '输入框状态'
    },
    autofocus: {
      control: 'boolean',
      description: '是否自动聚焦'
    }
  }
};

export default meta;
type Story = StoryObj<WeUIInputComponent>;

export const Default: Story = {
  args: {
    type: 'text',
    size: 'normal',
    label: '',
    placeholder: '请输入文本',
    disabled: false,
    readonly: false,
    clearable: false,
    loading: false,
    helpText: '',
    errorMessage: '',
    status: 'default',
    autofocus: false
  }
};

export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: '用户名',
    placeholder: '请输入用户名'
  }
};

export const Password: Story = {
  args: {
    ...Default.args,
    type: 'password',
    label: '密码',
    placeholder: '请输入密码'
  }
};

export const Number: Story = {
  args: {
    ...Default.args,
    type: 'number',
    label: '数量',
    placeholder: '请输入数量'
  }
};

export const Tel: Story = {
  args: {
    ...Default.args,
    type: 'tel',
    label: '手机号',
    placeholder: '请输入手机号'
  }
};

export const Email: Story = {
  args: {
    ...Default.args,
    type: 'email',
    label: '邮箱',
    placeholder: '请输入邮箱'
  }
};

export const Search: Story = {
  args: {
    ...Default.args,
    type: 'search',
    label: '搜索',
    placeholder: '搜索内容'
  }
};

export const Sizes: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <weui-input size="small" label="小尺寸" placeholder="小尺寸输入框"></weui-input>
        <weui-input size="normal" label="标准尺寸" placeholder="标准尺寸输入框"></weui-input>
        <weui-input size="large" label="大尺寸" placeholder="大尺寸输入框"></weui-input>
      </div>
    `
  })
};

export const Clearable: Story = {
  args: {
    ...Default.args,
    label: '可清除',
    placeholder: '请输入内容，输入后显示清除按钮',
    clearable: true,
    value: '可清除的内容'
  }
};

export const WithMaxlength: Story = {
  args: {
    ...Default.args,
    label: '字数限制',
    placeholder: '最多输入10个字符',
    maxlength: 10
  }
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    label: '禁用状态',
    placeholder: '此输入框已禁用',
    disabled: true,
    value: '禁用内容'
  }
};

export const Readonly: Story = {
  args: {
    ...Default.args,
    label: '只读状态',
    placeholder: '此输入框只读',
    readonly: true,
    value: '只读内容'
  }
};

export const WithHelpText: Story = {
  args: {
    ...Default.args,
    label: '帮助文本',
    placeholder: '请输入',
    helpText: '请输入6-20位字符'
  }
};

export const Success: Story = {
  args: {
    ...Default.args,
    label: '成功状态',
    placeholder: '验证通过',
    status: 'success',
    value: 'valid@email.com'
  }
};

export const Warning: Story = {
  args: {
    ...Default.args,
    label: '警告状态',
    placeholder: '请输入',
    status: 'warning',
    helpText: '密码强度较弱'
  }
};

export const Error: Story = {
  args: {
    ...Default.args,
    label: '错误状态',
    placeholder: '请输入邮箱',
    status: 'error',
    errorMessage: '邮箱格式不正确'
  }
};

export const StatusComparison: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <weui-input 
          label="默认状态" 
          placeholder="请输入"
          value="">
        </weui-input>
        
        <weui-input 
          label="成功状态" 
          placeholder="请输入"
          status="success"
          value="valid@email.com">
        </weui-input>
        
        <weui-input 
          label="警告状态" 
          placeholder="请输入"
          status="warning"
          helpText="密码强度较弱">
        </weui-input>
        
        <weui-input 
          label="错误状态" 
          placeholder="请输入"
          status="error"
          errorMessage="邮箱格式不正确">
        </weui-input>
      </div>
    `
  })
};

export const LoginForm: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="max-width: 400px; padding: 20px;">
        <h3 style="margin-bottom: 20px;">登录</h3>
        
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <weui-input 
            label="用户名" 
            placeholder="请输入用户名"
            clearable>
          </weui-input>
          
          <weui-input 
            label="密码" 
            type="password"
            placeholder="请输入密码">
          </weui-input>
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <label style="display: flex; align-items: center; gap: 8px;">
              <input type="checkbox"> 记住我
            </label>
            <a href="#" style="color: #576b95;">忘记密码？</a>
          </div>
          
          <weui-button buttonType="primary" [block]="true">登录</weui-button>
        </div>
      </div>
    `
  })
};

export const RegistrationForm: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="max-width: 400px; padding: 20px;">
        <h3 style="margin-bottom: 20px;">注册</h3>
        
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <weui-input 
            label="用户名" 
            placeholder="请输入用户名"
            clearable
            helpText="2-20个字符">
          </weui-input>
          
          <weui-input 
            label="邮箱" 
            type="email"
            placeholder="请输入邮箱"
            clearable>
          </weui-input>
          
          <weui-input 
            label="手机号" 
            type="tel"
            placeholder="请输入手机号"
            clearable>
          </weui-input>
          
          <weui-input 
            label="验证码" 
            placeholder="请输入验证码"
            maxlength="6">
            <ng-template weui-input-suffix>
              <button style="padding: 4px 8px; background: #07c160; color: white; border: none; border-radius: 4px; cursor: pointer;">
                获取验证码
              </button>
            </ng-template>
          </weui-input>
          
          <weui-input 
            label="密码" 
            type="password"
            placeholder="请输入密码"
            helpText="6-20位，包含字母和数字">
          </weui-input>
          
          <weui-button buttonType="primary" [block]="true">注册</weui-button>
        </div>
      </div>
    `
  })
};

export const Interactive: Story = {
  render: () => ({
    props: {
      username: '',
      password: '',
      email: '',
      isValid: false,
      handleInput: function(field: string, value: string) {
        this[field] = value;
      },
      validateEmail: function(email: string): boolean {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      },
      getEmailStatus: function(): WeUIInputStatus {
        if (!this['email']) return 'default';
        return this['validateEmail'](this['email']) ? 'success' : 'error';
      }
    },
    template: `
      <div style="max-width: 400px; padding: 20px;">
        <h3>表单交互示例</h3>
        <p style="color: #888; font-size: 14px; margin-bottom: 20px;">
          在下方输入内容，查看实时验证效果
        </p>
        
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <weui-input 
            label="用户名" 
            placeholder="请输入用户名"
            clearable
            [(ngModel)]="username"
            (input)="handleInput('username', $any($event.target).value)">
          </weui-input>
          
          <weui-input 
            label="邮箱" 
            type="email"
            placeholder="请输入邮箱"
            clearable
            [(ngModel)]="email"
            [status]="getEmailStatus()"
            (input)="handleInput('email', $any($event.target).value)">
          </weui-input>
          
          <div style="margin-top: 10px; padding: 10px; background: #f5f5f5; border-radius: 4px;">
            <p><strong>当前输入：</strong></p>
            <p>用户名: {{ username || '(空)' }}</p>
            <p>邮箱: {{ email || '(空)' }}</p>
          </div>
        </div>
      </div>
    `
  })
};
