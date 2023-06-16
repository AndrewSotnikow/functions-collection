import getErrorMessage from '../utils/helpers/getErrorMessage'
import TokenDb from '../features/login/model/db/tokenDb'
import { baseUrl, loginRoute, loginToken } from './apiConstants'
class ApiClient {
    private static _instance: ApiClient
    tokenDb = TokenDb.Instance

    public static get Instance() {
        return (this._instance = new ApiClient())
    }

    createRequestData = (
        requestMethod: string,
        authToken?: string | null,
        requestBody?: string
    ) => {
        const requestData = {
            method: requestMethod,
            body: requestBody ? requestBody : null,
            headers: authToken
                ? this.createAuthRequestHeaders(authToken)
                : this.createRequestHeaders(),
        }

        return requestData
    }

    createAuthRequestHeaders = (authToken: string) => {
        const authRequestHeaders = {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${authToken}`,
        }
        return authRequestHeaders
    }

    createRequestHeaders = () => {
        const requestHeaders = {
            'Content-type': 'application/json; charset=UTF-8',
        }
        return requestHeaders
    }

    request = async (
        requestMethod: string,
        route: string,
        authToken?: string | null,
        includeBaseUrl?: boolean,
        requestBody?: string
    ) => {
        let jsonData

        const requestData = this.createRequestData(
            requestMethod,
            authToken,
            requestBody
        )
        try {
            const url =
                includeBaseUrl === undefined || includeBaseUrl
                    ? `${baseUrl}${route}`
                    : `${route}`

            let response = await fetch(`${url}`, requestData)

            if (response.status === 401) {
                this.handle401Error().then(async (res) => {
                    if (res) {
                        response = await fetch(`${url}`, requestData)
                    }
                })
            }

            jsonData = await response.json()
        } catch (error) {
            getErrorMessage(error)
            return null
        }

        return jsonData
    }

    singIn = async () => {
        const loginResponse = await this.request(
            'POST',
            loginRoute,
            loginToken.value
        )

        try {
            this.tokenDb.saveLocalToken(loginResponse.token)
            return loginResponse.token
        } catch (error) {
            getErrorMessage(error)

            return null
        }
    }

    handle401Error = async () => {
        let retryCounter = 0
        const maxRetryCount = 5
        const retryFactorScale = 2
        const retryMillis = 1000
        const delayMillis = retryCounter * retryFactorScale * retryMillis
        let isGoodRespons = false

        while (retryCounter < maxRetryCount) {
            await new Promise((resolve) => setTimeout(resolve, delayMillis))

            try {
                const signInResult = await this.singIn()
                if (!signInResult) {
                    retryCounter++
                } else {
                    isGoodRespons = true
                    return isGoodRespons
                }
            } catch (error) {
                getErrorMessage(error)
            }
        }

        getErrorMessage('Sign in failed after multiple attempts')

        isGoodRespons = false
        return isGoodRespons
    }

    getWithAuth = async (
        route: string,
        includeBaseUrl?: boolean,
        body?: string
    ) => {
        const sessionToken = this.tokenDb.getLocalToken()
        const response = await this.request(
            'GET',
            route,
            sessionToken,
            includeBaseUrl,
            body
        )

        return response
    }

    get = async (route: string, includeBaseUrl?: boolean, body?: string) => {
        const response = await this.request(
            'GET',
            route,
            undefined,
            includeBaseUrl,
            body
        )
        return response
    }

    postWithAuth = async (
        route: string,
        includeBaseUrl?: boolean,
        body?: string
    ) => {
        const sessionToken = this.tokenDb.getLocalToken()
        const response = await this.request(
            'POST',
            route,
            sessionToken,
            includeBaseUrl,
            body
        )
        return response
    }

    post = async (route: string, includeBaseUrl?: boolean) => {
        const response = await this.request(
            'POST',
            route,
            undefined,
            includeBaseUrl
        )
        return response
    }
}
export default ApiClient
