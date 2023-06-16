import jwtRepository from '../features/login/model/repository/jwtRepository'

export const jwtSecret = 'NSgkO0l3e99Qqs218FyB3rP2ykQjmP2lxEEB+NnkcNA='
export const loginToken = jwtRepository()
export const baseUrl = 'https://toya-334417.lm.r.appspot.com/'

export const loginRoute = 'login'
export const getChannelsRoute = 'channels'
export const getConfigRoute = 'config'

export const toyaLicenseProxyUri =
    'https://beta-api-atv.toya.net.pl/adamk/atv/drm/license/'
