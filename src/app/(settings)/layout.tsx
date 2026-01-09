import { SettingsShell } from "@/components/settings/layout/SettingsShell";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SettingsShell>
      {children}
    </SettingsShell>
  );
}
