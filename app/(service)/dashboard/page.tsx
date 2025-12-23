import { currentUser } from '@clerk/nextjs/server'
import { Card } from '@heroui/card'
import Image from 'next/image'
export default async function DashboardPage() {
  const user = await currentUser()
  if (!user) return <div>Not logged in</div>
  return (
    <main>
      <h1 className="text-2xl font-bold text-primary-400 mb-5">Dashboard</h1>
      <Card shadow="sm" className="p-4 gap-4 max-w-2xl flex-nowrap flex-row items-center">
        <Image
          className="rounded-full w-24 h-24 aspect-square"
          src={user.imageUrl || ''}
          alt={user.firstName || 'User profile picture'}
          width={100}
          height={100}
        />
        <div>
          <p className="text-xl font-bold">{user.fullName}</p>
        </div>
      </Card>
    </main>
  )
}
