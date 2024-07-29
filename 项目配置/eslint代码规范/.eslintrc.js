module.exports = {
  root: true, // 启用或禁用ESLint配置文件
  env: {
    node: true // 启用Node.js全局变量和作用域
  },
  extends: [
    'plugin:vue/essential', // vue2，继承Vue的essential预设规则集
    // 'plugin:vue/vue3-essential', // vue3
    '@vue/standard' // 继承Vue的standard预设规则集
  ],
  parserOptions: {
    parser: 'babel-eslint' // 使用babel-eslint作为解析器，以便支持ES6+语法
  },
  rules: {
    // 自定义规则
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 正式环境对console采取warn
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 正式环境对debugger采取warn
    'camelcase': 'off' // 'on' 是否强制对象使用驼峰命名法
  }
}
