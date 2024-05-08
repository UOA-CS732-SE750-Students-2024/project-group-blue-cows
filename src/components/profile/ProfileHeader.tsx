import { Card, CardContent } from "../ui/card";

export default function ProfileHeader() {
  return (
    <div>
      <Card className="w-full bg-[#FFD166] pt-4 mb-4">
        <CardContent>
          <p>
            Your name, email and profile picture are managed by your Google
            Account. If you need to change these details, please do so in your
            Google Account settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
