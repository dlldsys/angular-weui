import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// 导入所有组件
import { WeUIButtonComponent } from '../../projects/components/button/src/button.component';
import { WeUICellComponent } from '../../projects/components/cell/src/cell.component';
import { WeUIDialogComponent } from '../../projects/components/dialog/src/dialog.component';
import { WeUIToastComponent } from '../../projects/components/toast/src/toast.component';
import { WeUIToastService } from '../../projects/components/toast/src/toast.service';
import { WeUIActionsheetComponent, WeUIActionsheetItem } from '../../projects/components/actionsheet/src/actionsheet.component';
import { WeUIInputComponent } from '../../projects/components/form/src/input.component';
import { WeUINavbarComponent } from '../../projects/components/navbar/src/navbar.component';
import { WeUITabbarComponent, WeUITabbarItem } from '../../projects/components/tabbar/src/tabbar.component';
import { WeUIIconComponent } from '../../projects/components/icon/src/icon.component';
import { WeUIProgressComponent } from '../../projects/components/progress/src/progress.component';
import { WeUIArticleComponent } from '../../projects/components/article/src/article.component';
import { WeUIFlexComponent } from '../../projects/components/flex/src/flex.component';
import { WeUIFlexItemComponent } from '../../projects/components/flex/src/flex-item.component';
import { WeUIGridComponent } from '../../projects/components/grid/src/grid.component';
import { WeUIGridItemComponent } from '../../projects/components/grid/src/grid-item.component';
import { WeUIListComponent } from '../../projects/components/list/src/list.component';
import { WeUILoadmoreComponent } from '../../projects/components/loadmore/src/loadmore.component';
import { WeUIPanelComponent } from '../../projects/components/panel/src/panel.component';
import { WeUIPreviewComponent, WeUIPreviewItemComponent } from '../../projects/components/preview/src/preview.component';
import { WeUIGalleryComponent } from '../../projects/components/gallery/src/gallery.component';
import { WeUICloseComponent } from '../../projects/components/gallery/src/gallery-close.component';
import { WeUIFooterComponent } from '../../projects/components/footer/src/footer.component';
import { WeUIStepsComponent, WeUIStepComponent } from '../../projects/components/steps/src/steps.component';
import { WeUIBadgeComponent } from '../../projects/components/badge/src/badge.component';
import { WeUIPickerComponent, WeUIPickerColumn } from '../../projects/components/picker/src/picker.component';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    WeUIButtonComponent,
    WeUICellComponent,
    WeUIDialogComponent,
    WeUIToastComponent,
    WeUIActionsheetComponent,
    WeUIInputComponent,
    WeUINavbarComponent,
    WeUITabbarComponent,
    WeUIIconComponent,
    WeUIProgressComponent,
    WeUIArticleComponent,
    WeUIFlexComponent,
    WeUIFlexItemComponent,
    WeUIGridComponent,
    WeUIGridItemComponent,
    WeUIListComponent,
    WeUILoadmoreComponent,
    WeUIPanelComponent,
    WeUIPreviewComponent,
    WeUIPreviewItemComponent,
    WeUIGalleryComponent,
    WeUIFooterComponent,
    WeUIStepsComponent,
    WeUIStepComponent,
    WeUIBadgeComponent,
    WeUIPickerComponent
  ],
  templateUrl: './demo.html',
  styleUrls: ['./demo.scss']
})
export class DemoComponent implements OnInit, OnDestroy {
  // 按钮状态
  isLoading = false;
  buttonCount = 0;

  // 对话框状态
  dialogVisible = false;
  alertVisible = false;
  confirmVisible = false;

  // Toast 状态
  toastVisible = false;
  toastType: 'success' | 'warning' | 'error' | 'info' | 'loading' | 'text' = 'success';
  toastMessage = '';

  // 防抖机制
  private toastDebounceTimer: any = null;
  
  // Toast 组件引用
  @ViewChild('toastComponent') toastComponent!: WeUIToastComponent;

  constructor(private toastService: WeUIToastService, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    // 确保 toast 组件已经初始化
  }

  // ActionSheet 状态
  actionSheetVisible = false;
  actions: WeUIActionsheetItem[] = [];
  actionsheetItems: WeUIActionsheetItem[] = [];

  // 完整的Actionsheet演示菜单
  fullActionsheetActions: WeUIActionsheetItem[] = [
    { name: '拍照', type: 'default', icon: 'weui-icon-camera' },
    { name: '从相册选择', type: 'default', icon: 'weui-icon-photo' },
    { name: '微信', type: 'default', icon: 'weui-icon-circle' },
    { name: '编辑', type: 'default', icon: 'weui-icon-edit' },
    { name: '删除', type: 'warn', icon: 'weui-icon-delete' },
    { name: '分享', type: 'default', icon: 'weui-icon-share' }
  ];

  // 操作菜单
  menuActions: WeUIActionsheetItem[] = [
    { name: '收藏', type: 'default', icon: 'weui-icon-star' },
    { name: '发送给朋友', type: 'default', icon: 'weui-icon-share' },
    { name: '收藏', type: 'default', icon: 'weui-icon-star' },
    { name: '编辑', type: 'default', icon: 'weui-icon-edit' },
    { name: '删除', type: 'warn', icon: 'weui-icon-delete' }
  ];

  // 导航栏和标签栏
  activeTabIndex = 0;
  tabbarItems: WeUITabbarItem[] = [];
  currentSection = 'home';

  // 进度条
  progressValue = 35;

  // 步骤条
  currentStep = 1;
  
  // 组件页步骤条独立状态
  componentStep = 1;

  // 输入框
  username = '';
  password = '';
  phone = '';
  email = '';

  // 列表数据
  listData = [
    { id: 1, label: '文字标题', value: '详细信息', desc: '描述信息' },
    { id: 2, label: '带图标', value: '图标内容', icon: 'weui-icon-success' },
    { id: 3, label: '可点击', value: '点击查看', arrow: true },
    { id: 4, label: '禁用状态', value: '不可操作', disabled: true }
  ];

  // 图片列表 - 使用 Bing 每日图片
  galleryImages = [
    { src: 'https://www.bing.com/th?id=OHR.TadamiRiver_ZH-CN8656732915_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp&w=400&h=300&rs=1', alt: '日本田麦川', description: '日本田麦川 - 秋日里如诗如画的梯田风光' },
    { src: 'https://www.bing.com/th?id=OHR.CormorantsSky_ZH-CN8589139483_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp&w=400&h=300&rs=1', alt: '鸬鹚与天空', description: '鸬鹚与天空 - 壮观的鸟群飞行景象' },
    { src: 'https://www.bing.com/th?id=OHR.SnowMushroom_ZH-CN8514354219_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp&w=400&h=300&rs=1', alt: '雪中蘑菇', description: '雪中蘑菇 - 冬日里独特的自然奇观' }
  ];
  galleryVisible = false;
  galleryIndex = 0;

  // 加载更多
  loadMoreType: 'loading' | 'nodata' | 'loadingline' = 'loading';
  isLoadingMore = false;

  // 选择器状态
  pickerVisible = false;
  selectedCity = '';
  cityColumns: WeUIPickerColumn[][] = [
    [
      { label: '北京', value: 'beijing' },
      { label: '上海', value: 'shanghai' },
      { label: '广州', value: 'guangzhou' },
      { label: '深圳', value: 'shenzhen' }
    ],
    [
      { label: '朝阳区', value: 'chaoyang' },
      { label: '海淀区', value: 'haidian' },
      { label: '东城区', value: 'dongcheng' },
      { label: '西城区', value: 'xicheng' }
    ]
  ];

  // 日期选择器状态
  dateVisible = false;
  selectedDate = '';
  dateColumns: WeUIPickerColumn[][] = [];
  selectedDateIndexes: number[] = [6, 2, 22]; // 默认选中今天的索引 (2026-03-23)

  private loadingTimer: any;
  private progressTimer: any;

  ngOnInit(): void {
    // 初始化标签栏数据
    this.tabbarItems = [
      { id: 'home', text: '首页', icon: '🔥' },
      { id: 'components', text: '组件', icon: '📦' },
      { id: 'gallery', text: '图库', icon: '🖼️', badge: 3 },
      { id: 'profile', text: '我的', icon: '👤' }
    ];

    // 初始化操作栏数据
    this.actionsheetItems = [
      { name: '编辑', type: 'default', icon: 'weui-icon-edit' },
      { name: '删除', type: 'warn', icon: 'weui-icon-delete' }
    ];

    // 初始化日期选择器数据
    const currentYear = new Date().getFullYear();
    this.dateColumns = [
      // 年份 (扩展到2020-2030，共11年)
      Array.from({ length: 11 }, (_, i) => ({
        label: `${2020 + i}年`,
        value: 2020 + i
      })),
      // 月份 (1-12)
      Array.from({ length: 12 }, (_, i) => ({
        label: `${i + 1}月`,
        value: i + 1
      })),
      // 日期 (1-31) - 初始设置为31天，会在打开时根据具体年月调整
      Array.from({ length: 31 }, (_, i) => ({
        label: `${i + 1}日`,
        value: i + 1
      }))
    ];
    
    // 初始化时也设置正确的日期列
    const today = new Date();
    const yearIndex = currentYear - 2020; // 计算当前年份在2020-2030范围内的索引
    const monthIndex = today.getMonth(); // 当前月份索引
    this.selectedDateIndexes = [yearIndex, monthIndex, today.getDate() - 1];
    this.updateDateColumns(yearIndex, monthIndex);
  }

  ngOnDestroy(): void {
    this.clearTimers();
    // 清理防抖定时器
    if (this.toastDebounceTimer) {
      clearTimeout(this.toastDebounceTimer);
      this.toastDebounceTimer = null;
    }
  }

  private clearTimers(): void {
    if (this.loadingTimer) {
      clearTimeout(this.loadingTimer);
    }
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
    }
  }

  // 按钮操作
  handleButtonClick(): void {
    this.buttonCount++;
    this.showToast('success', `按钮点击次数: ${this.buttonCount}`);
  }

  toggleLoading(): void {
    this.isLoading = true;
    this.loadingTimer = setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  // 对话框操作
  openDialog(): void {
    this.dialogVisible = true;
  }

  openAlert(): void {
    this.alertVisible = true;
  }

  openConfirm(): void {
    this.confirmVisible = true;
  }

  handleDialogConfirm(): void {
    this.dialogVisible = false;
    this.showToast('success', '确认操作成功');
  }

  handleDialogCancel(): void {
    this.dialogVisible = false;
    this.showToast('info', '取消操作');
  }

  handleAlertConfirm(): void {
    this.alertVisible = false;
    this.showToast('success', 'Alert 已关闭');
  }

  handleConfirmOk(): void {
    this.confirmVisible = false;
    this.showToast('success', '确认删除');
  }

  handleConfirmCancel(): void {
    this.confirmVisible = false;
    this.showToast('info', '取消删除');
  }

  // Toast 操作
  showToast(type: 'success' | 'warning' | 'error' | 'info' | 'loading' | 'text', message: string): void {
    // 清除之前的防抖定时器
    if (this.toastDebounceTimer) {
      clearTimeout(this.toastDebounceTimer);
      this.toastDebounceTimer = null;
    }
    
    // 立即设置属性，提供即时反馈
    this.toastType = type;
    this.toastMessage = message;
    this.toastVisible = true;
    
    // 使用 markForCheck 而不是 detectChanges 来优化性能
    this.cdr.markForCheck();
    
    // 立即调用组件方法，无需延迟
    // 组件内部已经有保护机制防止重复调用
    if (this.toastComponent) {
      this.toastComponent.showToast();
    }
  }

  hideToast(): void {
    if (this.toastDebounceTimer) {
      clearTimeout(this.toastDebounceTimer);
      this.toastDebounceTimer = null;
    }
    this.toastVisible = false;
  }

  // 专门用于关闭 loading 类型的 toast
  closeLoadingToast(): void {
    if (this.toastType === 'loading') {
      this.hideToast();
      this.showToast('success', '操作完成');
    }
  }

  // 销毁所有toast
  destroyAllToasts(): void {
    // 销毁组件级别的toast
    this.hideToast();
    
    // 销毁service级别的toast
    this.toastService.destroyAll();
  }

  // Toast Service 示例方法
  showServiceExamples(): void {
    // 默认配置（自动关闭，1500毫秒）- success 类型
    this.toastService.success('操作成功');
    
    // 默认配置（自动关闭，1500毫秒）- warning 类型
    setTimeout(() => {
      this.toastService.warning('这是一个警告');
    }, 2000);
    
    // 自定义延迟时间（自动关闭，3000毫秒）
    setTimeout(() => {
      this.toastService.error('自定义延迟时间', { duration: 3000 });
    }, 4000);
    
    // 手动禁用自动关闭（需要手动关闭）
    setTimeout(() => {
      this.toastService.info('需要手动关闭的提示', { autoClose: false });
    }, 7000);
    
    // Loading 提示（默认不自动关闭，需要手动关闭）
    setTimeout(() => {
      this.toastService.loading('正在处理...');
    }, 9000);
  }

  // 演示同时只能有一个toast的功能
  demonstrateSingleToast(): void {
    // 清理所有现有的toast
    this.destroyAllToasts();
    
    // 使用更长的间隔来避免栈溢出
    this.showToast('success', '第一个Toast');
    
    setTimeout(() => {
      this.showToast('warning', '第二个Toast（会替换第一个）');
    }, 800);
    
    setTimeout(() => {
      this.showToast('error', '第三个Toast（会替换第二个）');
    }, 1600);
    
    setTimeout(() => {
      this.showToast('info', '第四个Toast（会替换第三个）');
    }, 2400);
  }

  // 测试栈溢出修复
  testStackOverflowFix(): void {
    console.log('Testing stack overflow fix...');
    
    try {
      // 快速连续调用多个toast（现在应该不会导致栈溢出）
      for (let i = 0; i < 10; i++) {
        this.showToast('info', `快速测试 ${i + 1}`);
      }
      
      // 使用service测试
      for (let i = 0; i < 5; i++) {
        this.toastService.warning(`Service测试 ${i + 1}`);
      }
      
      console.log('Stack overflow test completed successfully');
    } catch (error) {
      console.error('Stack overflow test failed:', error);
    }
  }

  // 测试循环引用修复
  testCircularReferenceFix(): void {
    console.log('Testing circular reference fix...');
    
    try {
      // 创建一个service toast
      this.toastService.success('Service Toast 测试');
      
      // 立即尝试隐藏它（这之前会导致循环引用）
      setTimeout(() => {
        this.toastService.hide();
        console.log('Circular reference test passed');
      }, 100);
      
    } catch (error) {
      console.error('Circular reference test failed:', error);
    }
  }

  // 测试自动关闭功能
  testAutoClose(): void {
    console.log('Testing auto-close functionality...');
    
    // 测试不同类型的自动关闭
    this.showToast('success', '成功提示（1500ms后自动关闭）');
    
    setTimeout(() => {
      this.showToast('warning', '警告提示（1500ms后自动关闭）');
    }, 2000);
    
    setTimeout(() => {
      this.showToast('error', '错误提示（1500ms后自动关闭）');
    }, 4000);
    
    setTimeout(() => {
      this.showToast('info', '信息提示（1500ms后自动关闭）');
    }, 6000);
    
    setTimeout(() => {
      this.showToast('loading', '加载提示（不会自动关闭）');
    }, 8000);
    
    console.log('Auto-close test started - check console for timing');
  }

  // 测试响应速度
  testResponsiveness(): void {
    console.log('Testing toast responsiveness...');
    
    // 快速连续点击测试，验证无延迟
    const startTime = performance.now();
    
    this.showToast('info', '立即显示测试');
    
    const endTime = performance.now();
    console.log(`Toast response time: ${endTime - startTime}ms`);
    
    // 测试快速连续调用
    setTimeout(() => {
      this.showToast('warning', '快速调用1');
    }, 100);
    
    setTimeout(() => {
      this.showToast('error', '快速调用2');
    }, 200);
    
    setTimeout(() => {
      this.showToast('success', '快速调用3');
    }, 300);
  }

  // 测试Service Toast关闭
  testServiceToastCleanup(): void {
    console.log('Testing service toast cleanup...');
    
    // 记录初始状态
    const initialToasts = document.querySelectorAll('.weui-toast__wrp');
    console.log(`Initial toasts: ${initialToasts.length}`);
    
    // 创建几个service toast
    this.toastService.success('Service Toast 1');
    
    setTimeout(() => {
      this.toastService.warning('Service Toast 2');
    }, 1000);
    
    setTimeout(() => {
      this.toastService.error('Service Toast 3');
    }, 2000);
    
    // 3秒后销毁所有，验证是否完全清理
    setTimeout(() => {
      console.log('Destroying all service toasts...');
      
      // 检查销毁前的数量
      const beforeDestroy = document.querySelectorAll('.weui-toast__wrp');
      console.log(`Before destroy: ${beforeDestroy.length}`);
      
      this.toastService.destroyAll();
      
      // 检查是否还有残留
      setTimeout(() => {
        const remainingToasts = document.querySelectorAll('.weui-toast__wrp');
        console.log(`After destroy: ${remainingToasts.length}`);
        
        if (remainingToasts.length === 0) {
          console.log('✅ Service toast cleanup test PASSED');
        } else {
          console.log('❌ Service toast cleanup test FAILED');
          remainingToasts.forEach((toast, index) => {
            console.log(`Remaining toast ${index}:`, toast.textContent);
          });
        }
      }, 500);
    }, 3000);
  }

  hideServiceToast(): void {
    this.toastService.hide();
  }

  // ActionSheet 操作
  openActionSheet(): void {
    this.actionSheetVisible = true;
  }

  handleActionSelect(item: WeUIActionsheetItem, index: number): void {
    this.actionSheetVisible = false;
    this.showToast('success', `选择了: ${item.name}`);
  }

  handleActionCancel(): void {
    this.actionSheetVisible = false;
    this.showToast('info', '已取消');
  }

  // 标签栏操作
  handleTabChange(event: { item: WeUITabbarItem; index: number }): void {
    this.activeTabIndex = event.index;
    this.currentSection = event.item.id;
  }

  // 导航栏操作
  handleBack(): void {
    this.showToast('info', '返回上一页');
  }

  // 进度条操作
  startProgress(): void {
    this.progressValue = 0;
    this.progressTimer = setInterval(() => {
      if (this.progressValue < 100) {
        this.progressValue += 5;
        if (this.progressValue >= 100) {
          clearInterval(this.progressTimer);
          setTimeout(() => {
            this.progressValue = 0;
          }, 1500);
        }
      }
    }, 200);
  }

  // 步骤条操作
  nextStep(): void {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // 组件页步骤条操作
  nextComponentStep(): void {
    if (this.componentStep < 4) {
      this.componentStep++;
    }
  }

  prevComponentStep(): void {
    if (this.componentStep > 1) {
      this.componentStep--;
    }
  }

  // 图库操作
  openGallery(index: number): void {
    this.galleryIndex = index;
    this.galleryVisible = true;
  }

  closeGallery(): void {
    this.galleryVisible = false;
  }

  // 加载更多
  loadMore(): void {
    this.isLoadingMore = true;
    setTimeout(() => {
      this.loadMoreType = 'nodata';
      this.isLoadingMore = false;
    }, 2000);
  }

  resetLoadMore(): void {
    this.loadMoreType = 'loading';
  }

  // 表单操作
  handleSubmit(): void {
    if (!this.username) {
      this.showToast('error', '请输入用户名');
      return;
    }
    if (!this.password) {
      this.showToast('error', '请输入密码');
      return;
    }
    if (!this.phone) {
      this.showToast('error', '请输入手机号');
      return;
    }
    this.showToast('success', '表单提交成功');
  }

  // 单元格点击
  handleCellClick(item: any): void {
    this.showToast('info', `点击了: ${item.label}`);
  }

  // 选择器操作
  openCityPicker(): void {
    // 重置并初始化选择器，设置默认选中北京
    this.pickerVisible = true;
  }

  handlePickerConfirm(result: any): void {
    this.pickerVisible = false;
    this.selectedCity = result.labels.join(' ');
    this.showToast('success', `选择了: ${this.selectedCity}`);
  }

  handlePickerCancel(): void {
    this.pickerVisible = false;
    this.showToast('info', '已取消');
  }

  // 日期选择器操作
  openDatePicker(): void {
    // 设置默认选中今天
    const today = new Date();
    const currentYear = today.getFullYear(); // 2026
    const currentMonth = today.getMonth() + 1; // 3 (3月)
    const currentDate = today.getDate(); // 23
    
    // 计算索引偏移
    const yearIndex = currentYear - 2020; // 2026 - 2020 = 6
    const monthIndex = currentMonth - 1; // 3 - 1 = 2 (第3个月，索引2)
    const dateIndex = currentDate - 1; // 23 - 1 = 22 (第23天，索引22)
    
    // 更新选中索引
    this.selectedDateIndexes = [yearIndex, monthIndex, dateIndex];
    
    // 确保日期列正确（根据当前年月计算天数）
    this.updateDateColumns(yearIndex, monthIndex);
    
    this.dateVisible = true;
  }

  // 日期选择器变化处理
  handleDateChange(result: any): void {
    // 只更新选中索引，不更新日期列（避免干扰picker状态）
    this.selectedDateIndexes = result.indexes || [0, 0, 0];
  }

  // 更新日期列（根据年月计算正确的天数）
  private updateDateColumns(yearIndex: number, monthIndex: number): void {
    // 确保索引在有效范围内
    if (yearIndex < 0 || yearIndex >= this.dateColumns[0].length ||
        monthIndex < 0 || monthIndex >= this.dateColumns[1].length) {
      return;
    }
    
    const year = this.dateColumns[0][yearIndex]?.value;
    const month = this.dateColumns[1][monthIndex]?.value;
    
    if (year && month) {
      // 计算该月的天数 - 使用正确的JavaScript Date构造方法
      // new Date(year, month, 0) 会返回指定月份的最后一天
      const daysInMonth = new Date(year, month, 0).getDate();
      
      // 获取当前日期列的长度
      const currentDaysInMonth = this.dateColumns[2].length;
      
      // 只有在天数发生变化时才更新
      if (currentDaysInMonth !== daysInMonth) {
        // 更新日期列
        const newDateColumn = Array.from({ length: daysInMonth }, (_, i) => ({
          label: `${i + 1}日`,
          value: i + 1
        }));
        
        // 创建新的数组引用以触发变更检测
        this.dateColumns = [
          [...this.dateColumns[0]],
          [...this.dateColumns[1]],
          newDateColumn
        ];
        
        // 确保当前选中的日期索引在新的天数范围内
        if (this.selectedDateIndexes[2] >= daysInMonth) {
          this.selectedDateIndexes[2] = daysInMonth - 1;
        }
      }
    }
  }

  handleDateConfirm(result: any): void {
    this.dateVisible = false;
    
    // 获取选中的年月日
    const year = this.dateColumns[0][this.selectedDateIndexes[0]]?.value;
    const month = this.dateColumns[1][this.selectedDateIndexes[1]]?.value;
    const day = this.dateColumns[2][this.selectedDateIndexes[2]]?.value;
    
    // 验证日期的有效性
    if (year && month && day) {
      // 创建日期对象进行验证
      const date = new Date(year, month - 1, day);
      
      // 检查日期是否有效（防止2月30日等无效日期）
      if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
        // 格式化日期显示
        this.selectedDate = `${year}年${month}月${day}日`;
        this.showToast('success', `选择了: ${this.selectedDate}`);
      } else {
        // 如果日期无效，调整到该月最后一天
        const lastDay = new Date(year, month, 0).getDate();
        this.selectedDate = `${year}年${month}月${lastDay}日`;
        this.showToast('warning', `日期已调整为: ${this.selectedDate}`);
      }
    } else {
      this.showToast('error', '日期选择无效');
    }
  }

  // 切换部分
  showSection(section: string): void {
    this.currentSection = section;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==================== TrackBy 函数优化 ====================
  // 使用 trackBy 可以让 Angular 识别数组中的每个元素，
  // 在数据更新时只渲染变化的元素，避免不必要的 DOM 操作

  trackByTabbarItem(index: number, item: WeUITabbarItem): string {
    return item.id;
  }

  trackByListItem(index: number, item: { id: number }): number {
    return item.id;
  }

  trackByGalleryImage(index: number, item: { src: string }): string {
    return item.src;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
