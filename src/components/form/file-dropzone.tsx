import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils"

type FileDropzoneProps = {
  onDrop: (files: File[]) => void
  maxFiles: number
}

export const FileDropzone = ({ onDrop, maxFiles }: FileDropzoneProps) => {
  const multiple = maxFiles !== 1;

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: { ["image/jpeg, image/png"]: [] },
    multiple: multiple,
    maxFiles,
  })

  const errorMessage = fileRejections.length > 0 && (
    <ul className="mt-2 text-sm text-red-500 space-y-1">
      {fileRejections.map((rejection, index) => (
        <li key={index}>
          {rejection.file.name}:{" "}
          {rejection.errors.map((e) => e.message).join(", ")}
        </li>
      ))}
    </ul>
  )

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border border-dashed rounded-md p-4 text-center cursor-pointer transition",
        isDragActive ? "bg-muted" : "bg-background"
      )}
    >
      <input {...getInputProps()} />
      <p className="text-sm text-muted-foreground text-center">
        {isDragActive ? (
          "Drop the file here..."
        ) : multiple ? (
          <>
            Drag & drop or click to upload images<br />
            <span className="text-xs">PNG or JPG, max 5MB each</span>
          </>
        ) : (
          <>
            Drag & drop or click to upload an image<br />
            <span className="text-xs">PNG or JPG, max 5MB</span>
          </>
        )}
      </p>
      {errorMessage}
    </div>
  )
}
