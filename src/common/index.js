/**
 * This path is defined accordding to the deployed environment for this app.
 * Each route path should prepend the prefix
 * eg:
 *  https://xxx.com/{APP_PATH_PREFIX}/{my browser route path goes here}
 */
export const APP_PATH_PREFIX = ''

export const POST = 'POST'
export const GET = 'GET'

export const PLATFORM = 'WEB'

export const DRAFT = 'DRAFT'
export const TODO = 'TODO'
export const COMPLETED = 'COMPLETED'

/**
 * Default loading page index, number of items per page and page `stat`
 */
export const DEFAULT_ISSUE_LIST_PAGE = 1
export const DEFAULT_ISSUE_LIST_SIZE = 10
export const DEFAULT_ISSUE_LIST_STAT = DRAFT

/**
 * Issue stat
 */
export const DRAFT_ISSUE = {stat: DRAFT, name: '未处理', icon: 'service-untreated', iconBgColorClass: 'untreated'}
export const TODO_ISSUE = {stat: TODO, name: '正在处理', icon: 'service-set', iconBgColorClass: 'set'}
export const COMPLETED_ISSUE = {stat: COMPLETED, name: '完成', icon: 'service-finished', iconBgColorClass: 'finished'}
