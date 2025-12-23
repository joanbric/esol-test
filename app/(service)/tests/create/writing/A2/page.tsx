
import { Button } from '@heroui/button'
import Tasks from './Tasks'
import { submitWA2Test } from '@/app/actions/submitWA2Test'
const fields = [
  {
    id: 'title',
    name: 'title',
    label: 'Title',
    type: 'text',
    required: true,
    placeholder: 'Enquiring about tennis lessons for your child'
  },
  {
    id: 'description',
    name: 'description',
    label: 'Description',
    type: 'text',
    required: true,
    placeholder: 'Write a letter to your child\'s school enquiring about tennis lessons for them.'
  },
  {
    id: 'genre',
    name: 'genre',
    label: 'Genre',
    type: 'select',
    required: true,
    options: [
      { value: 'letter', label: 'Formal Letter' },
      { value: 'email', label: 'Email' },
      { value: 'article', label: 'Article/Blog' },
      { value: 'guide', label: 'Guide' },
      { value: 'speech', label: 'Speech' }
    ]
  },
  {
    id: 'topic',
    name: 'topic',
    label: 'Topic',
    type: 'select',
    required: true,
    options: [
      { value: '01', label: 'Sports and Keeping Fit' },
      { value: '02', label: 'Me and My Community' },
      { value: '03', label: 'Social Media' },
      { value: '04', label: 'Work and Jobs' },
      { value: '05', label: 'Creativity' },
      { value: '06', label: 'Health and Safety' },
      { value: '07', label: 'Our Environment' }
    ]
  },
  {
    id: 'level',
    name: 'level',
    label: 'Level',
    type: 'select',
    required: true,
    options: [
      { value: 'PE', label: 'PE' },
      { value: 'E1', label: 'E1' },
      { value: 'E2', label: 'E2' },
      { value: 'E3', label: 'E3' },
      { value: 'L1', label: 'L1' },
      { value: 'L2', label: 'L2' }
    ]
  }
]
export default function CreateWritingA2Page() {
  return (
    <main className="">
      <h1 className="text-primary-400 text-2xl font-semibold">Create Writing A2</h1>
      <hr className="text-primary-200" />

      <form action={submitWA2Test}>
        {fields.map((field) => (
          <div key={field.id} className="mt-8 relative flex items-center group">
            {field.type === 'select' ? (
              <select
                id={field.id}
                name={field.name}
                required={field.required}
                className="w-full px-2 py-1 border border-primary-200 rounded-md max-w-[400px] peer placeholder:invisible focus-within:placeholder:visible"
                defaultValue="none"

              >
                <option value="none" disabled>Choose an option</option>
                {field.options &&
                  field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </select>
            ) : (
              <input
                id={field.id}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder ? ` E.g.: ${field.placeholder}` : ' '}
                required={field.required}
                className="w-full px-2 py-1 border border-primary-200 rounded-md max-w-[400px] peer placeholder:invisible focus-within:placeholder:visible placeholder:text-sm"
              />
            )}
            <label
              htmlFor={field.id}
              className="absolute top-1/2 left-2 text-zinc-600 group-focus-within:text-primary-400 -translate-y-1/2 group-focus-within:top-0 group-focus-within:text-sm group-focus-within:-translate-y-full peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-primary-400 peer-not-placeholder-shown:-translate-y-full peer-not-placeholder-shown:text-sm transition-transform"
            >
              {field.label}
            </label>
          </div>
        ))}
        <Tasks />

        <Button type="submit" color="primary" className="w-full mt-8 max-w-[400px] font-bold">
          Create
        </Button>
      </form>
    </main>
  )
}
