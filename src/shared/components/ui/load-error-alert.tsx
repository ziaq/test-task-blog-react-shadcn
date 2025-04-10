import { AlertCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from './alert'

type Props = {
  title?: string
  message: string
}

export const LoadErrorAlert = ({ title = 'Error', message }: Props) => (
  <Alert variant="destructive">
    <AlertCircle className="w-4 h-4" />
    <AlertTitle>{title}</AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
)