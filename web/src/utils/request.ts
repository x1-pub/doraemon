import type { AxiosInstance, AxiosRequestConfig } from "axios"
import axios from "axios"
import { merge } from "lodash-es"

function createInstance() {
  const instance = axios.create()

  instance.interceptors.request.use(
    config => config,
    error => Promise.reject(error)
  )

  instance.interceptors.response.use(
    (response) => {
      const apiData = response.data

      const responseType = response.request?.responseType
      if (responseType === "blob" || responseType === "arraybuffer") return apiData

      const code = apiData.code
      switch (code) {
        case 0:
          return apiData.data
        case 10010:
          window.location.href = apiData.data.loginUrl
          return
        default:
          return Promise.reject(new Error("Error"))
      }
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  return instance
}

function createRequest(instance: AxiosInstance) {
  return <T>(config: AxiosRequestConfig): Promise<T> => {
    const defaultConfig: AxiosRequestConfig = {
      baseURL: import.meta.env.PROD ? '/' : '/dev-api',
      headers: {
        "Content-Type": "application/json"
      },
      data: {},
      timeout: 5000,
      withCredentials: false
    }
    
    const mergeConfig = merge(defaultConfig, config)
    return instance(mergeConfig)
  }
}

const instance = createInstance()
const request = createRequest(instance)

export default request