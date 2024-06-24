// 引入H5开发VConsole组件
import VConsole from 'vconsole'
window.VConsole = VConsole
const showConsole = localStorage.getItem('show_console')
if (showConsole && Number(showConsole) >= new Date().getTime()) {
  // eslint-disable-next-line no-new
  new window.VConsole()
}
