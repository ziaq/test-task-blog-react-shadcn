import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form"

import { Button } from "@/shared/components/ui/button"
import { Calendar } from "@/shared/components/ui/calendar"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover"
import { cn } from "@/shared/utils"

type DatePickerFieldProps<T extends FieldValues> = {
  field: ControllerRenderProps<T, Path<T>>
  label: string
}

export const DatePickerField = <T extends FieldValues>({ 
  field, 
  label 
}: DatePickerFieldProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <FormItem className="flex flex-col">
      <FormLabel>{label}</FormLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal cursor-pointer",
              !field.value && "text-muted-foreground"
            )}
          >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={(date) => {
              field.onChange(date);
              setOpen(false);
            }}
            captionLayout="dropdown"
            defaultMonth={new Date(1990, 6)}
            startMonth={new Date(1965, 6)}
            endMonth={new Date(2025, 3)}
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  )
}
