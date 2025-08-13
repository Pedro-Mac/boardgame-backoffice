import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

const formSchema = z.object({
  title: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  min_players: z.number().min(1, 'At least one player is required'),
  max_players: z.number().min(1, 'At least one player is required'),
  duration: z.number().min(1, 'Duration must be at least 1 minute'),
  price: z.number().min(0, 'Price cannot be negative'),
  is_available: z.boolean(),
})
const AddGameForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      min_players: 1,
      max_players: 1,
      duration: 30,
      price: 0,
      is_available: false,
    },
  })

  function handleSubmit(data: z.infer<typeof formSchema>) {
    console.log('Form submitted with data:', data)
    // Handle form submission logic here
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="[&>*]:mb-4">
          <FormField
            control={form.control}
            name="title"
            render={(field) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Game title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={(field) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="min_players"
            render={(field) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Min players" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="max_players"
            render={(field) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Max players" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={(field) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Duration" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={(field) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_available"
            render={(field) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Is available" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

export default AddGameForm
