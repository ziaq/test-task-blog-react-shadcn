import { useAuthStore } from "@/store/auth-store"
import { ProfileCard } from "@/features/profile/components/profile-card"
import { Spinner } from "@/components/ui/spinner"
import { PostsCard } from "@/features/posts/components/posts-card"

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
