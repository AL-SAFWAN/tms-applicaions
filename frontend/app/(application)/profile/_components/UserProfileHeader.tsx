import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import EditProfileOverlay from "./EditProfileOverlay";
import { useUser } from "@/hooks/auth";
import ChangePasswordOverlay from "./ChangePassword";

type UserProfileHeaderProps = {};

const UserProfileHeader: React.FC<UserProfileHeaderProps> = () => {
  const { data: user } = useUser();
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4 md:flex-row md:items-start md:space-x-6 md:space-y-0">
          <Avatar className="size-32">
            <AvatarImage src={"/"} alt={user?.firstName} />
            <AvatarFallback className="text-5xl">
              {user?.firstName[0]}
              {user?.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-muted-foreground">
              Member since {user?.createdAt.toLocaleDateString()}
            </p>

            <div className="mt-4 flex w-fit flex-wrap justify-center gap-2 md:justify-start">
              <Badge variant="secondary">{user?.beltLevel} Belt</Badge>
              <Badge variant="secondary">{user?.awardLevel} Award</Badge>
            </div>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end">
            {user && <EditProfileOverlay user={user} />}
            {user && <ChangePasswordOverlay user={user} />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileHeader;
