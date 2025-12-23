import { Card } from '@heroui/card'
import { Input, Textarea } from '@heroui/input'

// Styles to fix the label position when the input is filled
const inputClasses = {
  label:
    'group-data-[filled-within=true]:-translate-y-full scale-100 group-data-[filled-within=true]:top-0 transition-transform',
  mainWrapper: 'my-2'
}

const inputStyles = {
  size: 'lg' as 'lg' | 'md' | 'sm',
  labelPlacement: 'outside' as 'outside' | 'inside',
  classNames: inputClasses
}

export default function CreateWritingA1Page() {
  return (
    <main>
      <h1 className="text-2xl font-bold text-primary-400 mb-5">Create Writing A1</h1>
      <hr className="text-primary-200 transition-tr" />

      <form>
        <Input type="text" id="title" name="title" label="Title" {...inputStyles} />

        <Textarea id="description" name="description" label="Description"></Textarea>

        <Card className="p-6">
          <h2 className="mb-6">1. Punctuation</h2>

          <div>
            <Input
              className="mb-4"
              id="title"
              name="title"
              label="Title"
              {...inputStyles}
            />

            <Textarea
              id="punctuation-script"
              name="punctuation-script"
              label="Text"
              {...inputStyles}
            ></Textarea>
          </div>
        </Card>

        <Card>
          <h2>2. Spelling</h2>

          <div>
            <Textarea id="description" name="description" label="Description"></Textarea>
          </div>
        </Card>

        <button type="submit">Create</button>
      </form>
    </main>
  )
}
