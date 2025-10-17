import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from '@tanstack/react-router'
import { addGame } from '@/services/games/addGame'
import { useUserStore } from '@/store/user'

const formSchema = z.object({
  title: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  min_players: z.number().min(1, 'At least one player is required'),
  max_players: z.number().min(1, 'At least one player is required'),
  duration: z.number().min(1, 'Duration must be at least 1 minute'),
  price: z.number().min(0, 'Price cannot be negative'),
  is_available: z.literal('available').or(z.literal('not_available')),
})

const GameForm = ({
  title,
  description,
  min_players,
  max_players,
  duration,
  price,
  is_available,
}: {
  title?: string
  description?: string
  min_players?: number
  max_players?: number
  duration?: number
  price?: number
  is_available?: 'available' | 'not_available'
}) => {
  const userStore = useUserStore()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title || '',
      description: description || '',
      min_players: min_players || 1,
      max_players: max_players || 1,
      duration: duration || 30,
      price: price || 0,
      is_available: is_available || 'not_available',
    },
  })

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    console.log('Form submitted with data:', data)
    await addGame({
      title: data.title,
      description: data.description || '',
      min_players: data.min_players,
      max_players: data.max_players,
      duration: `${data.duration} minutes`,
      price: data.price,
      is_available: data.is_available === 'available',
      created_by: userStore.authUser?.id ? Number(userStore.authUser.id) : 0,
    })

    navigate({ to: '/admin/games', search: { limit: 10, offset: 0 } })
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="[&>*]:mb-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Game Title</FormLabel>
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Players</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Min players"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="max_players"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Players</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Max players"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (minutes)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Duration"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (in cents)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="1"
                    placeholder="Price"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_available"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Availability</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex "
                  >
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="available" />
                      </FormControl>
                      <FormLabel className="font-normal">Available</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="not_available" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Not available
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-4">
            <Link
              type="button"
              to=".."
              className="cursor-pointer border-red-500 text-red-500 hover:text-red-400 hover:border-red-400 hover:bg-white"
            >
              Cancel
            </Link>
            <Button type="submit" className="cursor-pointer">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default GameForm
