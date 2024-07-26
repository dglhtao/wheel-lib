## Vue 组件库

[toc]

### Tabs
普通Tab、水平滚动Tab
&nbsp;

### Loading
等待动画
`Vue.prototype.$jzLoading.show()`
`Vue.prototype.$jzLoading.hide()`
&nbsp;

### MyIframe
内嵌页
`Vue.prototype.$MyIframe.show({ url })`
`Vue.prototype.$MyIframe.hide()`
&nbsp;

### Switch
switch组件
&nbsp;

### Table
H5四列固定表头的表格组件
&nbsp;

### Table2
H5固定表头和首列的表格组件，sticky实现
&nbsp;

### BsTable
JSX写法，基于better-scroll封装滚动的表格，可水平垂直滚动，表头和任意列固定（可解决iOS滚动回弹问题）
&nbsp;

### BsTable2
Vue组件写法，基于better-scroll封装滚动的表格，添加虚拟滚动功能，可水平垂直滚动，表头和任意列固定（可解决iOS滚动回弹问题）
通过插槽和插槽透传功能，实现表格布局和内容的分离，便于灵活插入内容
- 支持点击表头属性数据排序
- 支持属性顺序动态更改
- 接口可通知滚动到水平边缘位置，支持接入“水平边缘位置的下次滚动快捷切换页面或Tab”功能
&nbsp;

### InputNumber/InputNumber1
数字输入框组件，带左右加减号，可设置精度、步长、最大最小值、提示文字、数值变化后对话框toast提示、是否显示单位、是否禁止输入
&nbsp;

### Empty
空页面
&nbsp;

### Svg
Svg图片显示
&nbsp;

### v-lazy
图片懒加载
通过Vue.directive设置方法，并在方法中用IntersectionObserver监听图片的出现
&nbsp;
