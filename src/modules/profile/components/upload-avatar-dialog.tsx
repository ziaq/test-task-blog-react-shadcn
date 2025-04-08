import { Upload } from 'lucide-react'
import { useState } from 'react'

import { FileDropzone } from '@/shared/components/form'
import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/components/ui/dialog'
import { Spinner } from '@/shared/components/ui/spinner'

import { useUploadAvatar } from '../hooks/use-upload-avatar'

export const UploadAvatarDialog = () => {
  const [open, setOpen] = useState(false)
  const { mutate: upload, isPending, error } = useUploadAvatar()

  const handleDrop = (files: File[]) => {
    const file = files[0]
    if (file) {
      upload(file, {
        onSuccess: () => setOpen(false),
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          <Upload className="mr-2 h-4" />
          Upload Avatar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Avatar</DialogTitle>
        </DialogHeader>

        {isPending ? (
          <div className="flex justify-center py-6">
            <Spinner size={28} />
          </div>
        ) : (
          <FileDropzone onDrop={handleDrop} maxFiles={1} />
        )}

        {error && (
          <p className="text-sm text-red-500 text-center mt-2">
            Failed to upload avatar. Please try again.
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}
