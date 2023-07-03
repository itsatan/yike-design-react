module.exports = {extends: ['@commitlint/config-conventional']}
/*
 * @Description: commit-msg提交信息格式规范
 *
 * commit-msg格式: <type>(scope?): <subject>
 *   - type: 用于表明我们这次提交的改动类型，是新增了功能？还是修改了测试代码？又或者是更新了文档？
 *     - build: 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
 *     - chore: 其他修改, 比如改变构建流程、或者增加依赖库、工具等
 *     - ci: 持续集成修改
 *     - docs: 文档修改
 *     - feat: 新特性、新功能
 *     - fix: 修改bug
 *     - perf: 优化相关，比如提升性能、体验
 *     - refactor: 代码重构
 *     - revert: 回滚到上一个版本
 *     - style: 代码格式修改, 注意不是 css 修改
 *     - test: 测试用例修改
 *   - scope：一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块。
 *   - Subject：一句话描述此次提交的主要内容，做到言简意赅
 */