import ProfileForm from "@/components/profile/ProfileForm"
import Spinner from "@/components/Spinner"
import { useAuth } from "@/hooks/useAuth"

function ProfileView() {
  const { data, isLoading } = useAuth()

  if (isLoading) return <Spinner />

  if (data) return (
    <ProfileForm data={data} />
  )
}

export default ProfileView