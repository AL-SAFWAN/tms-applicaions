import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
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
              joined since {user?.createdAt?.toLocaleDateString()}
            </p>
          </div>

          {user && <ChangePasswordOverlay user={user} />}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileHeader;
