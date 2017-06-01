/**
 * This path is defined accordding to the deployed environment for this app.
 * Each route path should prepend the prefix
 * eg:
 *  https://xxx.com/{APP_PATH_PREFIX}/{my browser route path goes here}
 */
export const APP_PATH_PREFIX = ''
/**
 * Default loading page index, number of items per page and page `stat`
 */
export const DEFAULT_ISSUE_LIST_PAGE = 1
export const DEFAULT_ISSUE_LIST_SIZE = 10
export const DEFAULT_ISSUE_LIST_STAT = 'all'

/**
 * Issue stat
 */
export const ALL_ISSUE = {stat: 'all', name: '全部', icon: 'service-all', iconBgColorClass: 'all'}
export const HANDLING_ISSUE = {stat: 'handling', name: '正在处理', icon: 'service-set', iconBgColorClass: 'set'}
export const UNHANDLING_ISSUE = {stat: 'unhandling', name: '未处理', icon: 'service-untreated', iconBgColorClass: 'untreated'}
export const FINISH_ISSUE = {stat: 'finish', name: '完成', icon: 'service-finished', iconBgColorClass: 'finished'}
