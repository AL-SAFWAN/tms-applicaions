"use client";
import { useUser } from "@/hooks/auth";
import UserProfileHeader from "./_components/UserProfileHeader";
import EditProfileOverlay from "./_components/EditProfileOverlay";
import EditForm from "./_components/EditForm";
function UserProfile() {
  const { data: user } = useUser();
  return (
    <div className="container px-12">
      <UserProfileHeader />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* {user && <EditForm user={user} />} */}
        {/* TODO ticket stats  */}
        {user && <EditForm user={user} />}
      </div>
    </div>
  );
}

export default UserProfile;
