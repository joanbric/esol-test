import { SignIn } from '@clerk/nextjs'
export default function LoginPage(){
  return (
    <main className="flex flex-col items-center justify-center h-dvh">
      <SignIn />
    </main>
  )
}