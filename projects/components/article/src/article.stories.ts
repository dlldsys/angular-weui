import { type Meta, type StoryObj } from '@storybook/angular';
import { WeUIArticleComponent } from './article.component';

const meta: Meta<WeUIArticleComponent> = {
  title: 'Components/Article',
  component: WeUIArticleComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<WeUIArticleComponent>;

export const Default: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-article title="文章标题" subtitle="副标题" author="作者" time="2024-01-01">
        <p>这是文章的第一段内容。文章内容支持富文本格式，包括各种HTML标签。</p>
        
        <h2>二级标题</h2>
        <p>这是二级标题下的内容段落。</p>
        
        <h3>三级标题</h3>
        <p>这是三级标题下的内容段落。</p>
        
        <blockquote>
          这是一个引用块，用于突出显示重要信息。
        </blockquote>
        
        <ul>
          <li>列表项一</li>
          <li>列表项二</li>
          <li>列表项三</li>
        </ul>
        
        <p>文章中还支持<code>内联代码</code>和代码块：</p>
        
        <pre><code>function example() {
  console.log('Hello, World!');
}</code></pre>
        
        <table>
          <thead>
            <tr>
              <th>列1</th>
              <th>列2</th>
              <th>列3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>数据1</td>
              <td>数据2</td>
              <td>数据3</td>
            </tr>
            <tr>
              <td>数据4</td>
              <td>数据5</td>
              <td>数据6</td>
            </tr>
          </tbody>
        </table>
      </weui-article>
    `,
  }),
};

export const CustomTemplate: Story = {
  render: () => ({
    props: {},
    template: `
      <weui-article>
        <ng-template #header>
          <div style="text-align: center; padding: 20px 0;">
            <h1 style="color: #07c160;">自定义标题</h1>
            <p style="color: #888;">自定义副标题和元信息</p>
          </div>
        </ng-template>
        
        <p>这是自定义内容模板区域。</p>
        <p>可以在这里放置任何自定义内容。</p>
        
        <ng-template #footer>
          <div style="text-align: center; margin-top: 20px;">
            <p>自定义底部内容</p>
          </div>
        </ng-template>
      </weui-article>
    `,
  }),
};
