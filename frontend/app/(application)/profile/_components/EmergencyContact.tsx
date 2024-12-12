import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertTriangle, Heart, Phone } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import {
  Overlay,
  OverlayContent,
  OverlayHeader,
  OverlayTitle,
  OverlayTrigger,
} from "@/components/ui/overlay";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/auth";
import EmergencyForm from "./EmergencyForm";

const EmergencyContact: React.FC = () => {
  const { data: user } = useUser();
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Heart className="mr-2 h-5 w-5" />
          Emergency Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 font-bold">Emergency Contact</h4>
            <p>
              {user?.emergencyContactName} ({user?.emergencyContactRelationship}
              )
            </p>
            <p className="flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              {user?.emergencyContactPhone}
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="mb-2 font-bold">Medical Information</h4>
            <p>Allergies: {user?.allergies}</p>
            <p>Medications: {user?.medications}</p>
            <p>Medical Conditions: {user?.medicalConditions}</p>
          </div>
        </div>
        <Overlay open={open} onOpenChange={setOpen}>
          <OverlayTrigger asChild>
            <Button variant="outline" className="mt-8 w-full">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Update Emergency Info
            </Button>
          </OverlayTrigger>
          <OverlayContent>
            <OverlayHeader>
              <OverlayTitle>Update Emergency Information</OverlayTitle>
            </OverlayHeader>
            {user && <EmergencyForm user={user} />}
          </OverlayContent>
        </Overlay>
      </CardContent>
    </Card>
  );
};

export default EmergencyContact;
