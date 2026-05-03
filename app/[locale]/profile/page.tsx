import { ProfileDashboard } from "@/features/profile/components/ProfileDashboard";
import { AuthGuard } from "@/shared/components/guards/AuthGuard";

export default function ProfilePage() {
  return (
    <AuthGuard>
      <div className="container mx-auto py-10 px-4">
        <ProfileDashboard />
      </div>
    </AuthGuard>
  );
}
