'use client'

import { useState } from 'react'
import { Button } from '@heroui/button'
import { TrashIcon } from 'lucide-react'

type TaskType = {
  id: string
  value: string
}

// Simple UUID v4 generator
function generateUUID() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  // Fallback for browsers that don't support crypto.randomUUID()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export default function Tasks() {
  const [tasks, setTasks] = useState<TaskType[]>([{ id: 'task-0', value: '' }])

  return (
    <div className="mt-8 max-w-[400px]">
      <label className="text-primary-400 text-sm">Tasks</label>
      <ul className="flex flex-col gap-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex gap-2">
            <input
              name={task.id}
              type="text"
              className="w-full px-2 py-1 flex-1 border border-primary-200 rounded-md  peer placeholder:invisible focus-within:placeholder:visible"
              value={task.value}
              onChange={(e) =>
                setTasks((prevTasks) =>
                  prevTasks.map((prevTask) =>
                    prevTask.id === task.id ? { ...prevTask, value: e.target.value } : prevTask
                  )
                )
              }
            />
            {tasks.length > 1 && (
              <button
                type="button"
                className="text-red-400"
              
                onClick={() => setTasks((prevTasks) => prevTasks.filter((prevTask) => prevTask.id !== task.id))}
              >
                <TrashIcon />
              </button>
            )}
          </li>
        ))}
      </ul>
      <Button
        className="mt-2 font-bold w-full"
        color="primary"
        variant="bordered"
        type="button"
        onPress={() => setTasks((prevTasks) => [...prevTasks, { id: `task-${generateUUID()}`, value: '' }])}
      >
        Add Task
      </Button>
    </div>
  )
}
