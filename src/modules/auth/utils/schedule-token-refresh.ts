import { refreshAccessToken } from '../utils/refresh-token'

let timeoutId: NodeJS.Timeout | null = null

export const scheduleTokenRefresh = () => {
  if (timeoutId) clearTimeout(timeoutId)

  timeoutId = setTimeout(async () => {
    try {
      await refreshAccessToken()
      scheduleTokenRefresh()
    } catch(error) {
      console.log(error)
    }
  }, 29 * 60 * 1000) // 29 min
}

export const cancelScheduleTokenRefresh = () => {
  if (timeoutId) clearTimeout(timeoutId)
  timeoutId = null
}
