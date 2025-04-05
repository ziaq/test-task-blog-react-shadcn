import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { ControllerRenderProps } from "react-hook-form"

interface DatePickerFieldProps {
  field: ControllerRenderProps<any, any>
  label: string
  disabledFuture?: boolean
}

export const DatePickerField = ({ field, label, disabledFuture }: DatePickerFieldProps) => (
  <FormItem className="flex flex-col">
    <FormLabel>{label}</FormLabel>
    <Popover>
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
          onSelect={field.onChange}
          captionLayout="dropdown"
          defaultMonth={new Date(1990, 6)}
          fromMonth={new Date(1965, 6)}
          toMonth={new Date(2025, 3)}
          disabled={disabledFuture ? (date) => date > new Date() : undefined}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    <FormMessage />
  </FormItem>
)
