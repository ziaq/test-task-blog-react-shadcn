import type { UseMutationResult } from "@tanstack/react-query"

import { env } from "@/shared/config/env"
import { ApiError } from "@/shared/errors/api-error"
import { NetworkError } from "@/shared/errors/network-error"


type FormErrorProps = {
  error: UseMutationResult["error"]
  statusMessages?: Record<number, string>
}

export const FormError = ({ error, statusMessages }: FormErrorProps) => {
  if (!error) return null

  if (error instanceof ApiError) {
    const customMessage = statusMessages?.[error.status]
    if (customMessage) {
      return <p className="text-sm text-red-500">{customMessage}</p>
    }

    if (env.VITE_DEV_MODE) {
      return (
        <p className="text-sm text-red-500">
          Server error ({error.status}): {error.message}
        </p>
      )
    }
  
    return (
      <p className="text-sm text-red-500">
        Unexpected server error. Please try again later.
      </p>
    )
  }

  if (error instanceof NetworkError) {
    return (
      <p className="text-sm text-red-500">
        Network error. Please check your connection and try again.
      </p>
    )
  }

  return (
    <p className="text-sm text-red-500">
      Something went wrong. Please try again.
    </p>
  )
}
