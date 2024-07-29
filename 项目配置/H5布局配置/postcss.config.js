// 用来给不同的浏览器自动添加相应前缀，如-webkit-，-moz-等等
// npm install autoprefixer --save-dev
// yarn add -D autoprefixer
const autoprefixer = require('autoprefixer')()

module.exports = {
  plugins: {
    autoprefixer,

    // yarn add postcss-px-to-viewport -D
    'postcss-px-to-viewport': {
      viewportWidth: 750, // 视口宽度，单位px，以设计稿为准
      viewportHeight: 1334, // 视口高度，通常可不设置，默认null
      uniPrecision: 6, // 转换后保留的小数点数，默认5
      viewportUnit: 'vw', // 转换后单位，vw、vh、vmin
      fontViewportUnit: 'vw', // 文字转换后单位
      selectorBlackList: ['.ignore', '#test'], // 需要忽略转换的CSS选择器，字符串或正则
      minPixelValue: 1, // 最小转换的像素，低于该像素值不转化，默认1
      mediaQuery: true, // 是否在媒体查询中也进行转换，默认false
      exclude: [/node_modules/] // 不需要转换的文件路径的正则
    }
  }
}

// 注意，如果有使用第三方组件库如vant，则可以将exclude去掉，表示内容全部进行vw转换
// 因为vant团队是根据375px设计的
