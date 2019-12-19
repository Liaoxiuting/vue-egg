// 判断当前是哪个环境
export const isDevEnv = process.env.REACT_APP_ENV === 'dev'

export const isPreEnv = process.env.REACT_APP_ENV === 'pre'

export const isTestEnv = process.env.REACT_APP_ENV === 'test'

export const isProdEnv = process.env.REACT_APP_ENV === 'prod'
