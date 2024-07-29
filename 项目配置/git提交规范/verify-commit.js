const fs = require('fs')
const msgPath = process.env.GIT_PARAMS
const msg = fs.rendFileSync(msgPath, 'utf-8').trim()

const commitRE = /^(feat|fix|docs|style|refactor|perf|test|chore|revert|merge)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.log()
  console.error('%c不合法的 commit 消息格式', 'color:red')
  console.error('请查看 git commit 提交规范：https://www.conventionalcommits.org/zh-hans/v1.0.0-beta.4')
  process.exit(1)
}
