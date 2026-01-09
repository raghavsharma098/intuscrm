import { UserInfoHeader } from "@/components/settings/overview/UserInfoHeader";
import { InfoBanner } from "@/components/settings/overview/InfoBanner";
import { PersonalInfoCard } from "@/components/settings/overview/PersonalInfoCard";
import { TwoFactorCard } from "@/components/settings/overview/TwoFactorCard";
import { SupportCard } from "@/components/settings/overview/SupportCard";

export default function SettingsOverviewPage() {
  const user = {
    name: "Hardik Jain",
    email: "hardik3810@gmail.com",
    sid: "US0de05c830c0d02fc0a092025923a5cad",
    isVerified: true
  };

  const twoFactor = {
    phone: "+91XXXXXX2917",
    isPhoneVerified: true,
    verificationMethod: "Text message",
    authenticatorStatus: "Not enrolled"
  };

  return (
    <div className="animate-in fade-in duration-500">
      <UserInfoHeader name={user.name} />
      <InfoBanner />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PersonalInfoCard user={user} />
        <TwoFactorCard info={twoFactor} />
      </div>
      
      <SupportCard />
    </div>
  );
}
