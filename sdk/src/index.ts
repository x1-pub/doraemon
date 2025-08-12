import md5 from 'md5'
import type { Data, DoraemonOptions, RequestFunction } from './type'

const HOST = 'https://doraemon.x1.pub/open-api/v1'

class Doraemon {
  private options: DoraemonOptions
  private request: RequestFunction

  constructor(options: DoraemonOptions) {
    this.options = options
    this.request = <T>(api: string, payload: Record<string, unknown>) => {
      const auth = this.cerateHeaders()
      return fetch(`${HOST}/${api}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...auth,
        },
        body: JSON.stringify(payload)
      }).then(async res => await res.json() as T)
    }
  }

  private cerateHeaders = () => {
    const { app, secret } = this.options
    const timestamp = Date.now() / 1000
    const sign = md5(`${timestamp}${app}${secret}`)
    return {
      'doraemon-timestamp': String(timestamp),
      'doraemon-app': app,
      'doraemon-sign': sign,
    }
  }

  GetDataByGroupName = async (groupName: string) => {
    return this.request<Data[]>('GetData', { groupName, env: this.options.env })
  }
}

export default Doraemon
