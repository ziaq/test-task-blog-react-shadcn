import { ProfileCard } from "@/features/profile/profile-card"

const HomePage = () => {
  return (
    <main className="flex flex-col gap-6 items-center min-h-screen p-6 bg-muted/50">
      <ProfileCard />
      {/* Посты пойдут ниже */}
    </main>
  )
}

export default HomePage
