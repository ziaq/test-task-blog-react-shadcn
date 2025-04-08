import { useAuthStore } from '@/modules/auth'
import { PostsCard } from '@/modules/posts'
import { ProfileCard } from '@/modules/profile'
import { Spinner } from '@/shared/components/ui/spinner'

const HomePage = () => {
  const { accessToken } = useAuthStore()

  if (!accessToken) {
    return (
      <main className="flex justify-center items-center min-h-screen bg-muted/50">
        <Spinner size={40} />
      </main>
    )
  }

  return (
    <main className="flex flex-col gap-6 items-center min-h-screen p-6 bg-muted/50">
      <ProfileCard />
      <PostsCard />
    </main>
  )
}

export default HomePage
