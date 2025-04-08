import { apiFetch } from '@/shared/api'

import { accessTokenResponseSchema } from '../dto/access-token-response.schema'
import { loginSchema } from '../dto/login.schema'
import { LoginFormValues } from '../form-schemas/login-form.schema'
import { getFingerprint } from '../utils/fingerprint'
import { scheduleTokenRefresh } from '../utils/schedule-token-refresh'

export async function login(input: LoginFormValues): Promise<string> {
  const fingerprint = await getFingerprint()
  const body = loginSchema.parse({ ...input, fingerprint })

  const response = await apiFetch('/auth/login', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const accessTokenResponse = accessTokenResponseSchema.parse(response)

  scheduleTokenRefresh()

  return accessTokenResponse.accessToken
}
