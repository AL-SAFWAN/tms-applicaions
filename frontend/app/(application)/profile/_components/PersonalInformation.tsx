import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Weight, Ruler, Mail, MapPin, UserIcon } from "lucide-react";
import { useUser } from "@/hooks/auth";

const PersonalInformation: React.FC = ({}) => {
  const { data: user } = useUser();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <UserIcon className="mr-2 h-5 w-5" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <span>{user?.email}</span>
        </div>
        <div className="flex items-center space-x-4">
          <Weight className="h-5 w-5 text-muted-foreground" />
          <span>Weight: {user?.weight} kg</span>
        </div>
        <div className="flex items-center space-x-4">
          <Ruler className="h-5 w-5 text-muted-foreground" />
          <span>Height: {user?.height} cm</span>
        </div>
        <div className="flex items-center space-x-4">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <span className="w-1/2 text-wrap">{user?.address}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInformation;
