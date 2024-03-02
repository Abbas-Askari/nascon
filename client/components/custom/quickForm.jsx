import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { Input } from "../ui/input"
import { PasswordInput } from "./passwordInput"

export const QuickForm = ({fields, form, onSubmit}) => {
  const formFields = fields.map(fieldObject => 
    <FormField
    className=""
    control={form.control}
    key={fieldObject.name}
    name={fieldObject.name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel>{fieldObject.label}</FormLabel>
          <FormControl>
            {fieldObject.type === "password" ? 
            <PasswordInput placeholder={fieldObject.placeholder} field={field} /> :
            <Input type={fieldObject.type} placeholder={fieldObject.placeholder} {...field} />}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />)

  return (
    <Form {...form}>
      <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4 h-full ">
        {formFields}
        <Button type="submit" className="">{buttonText}</Button>
      </form>
    </Form>
  )
}
