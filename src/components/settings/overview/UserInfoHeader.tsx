import Image from "next/image";

interface UserInfoHeaderProps {
  name: string;
}

export function UserInfoHeader({ name }: UserInfoHeaderProps) {
  return (
    <div className="flex items-center gap-8 mb-8">
      <div className="relative w-48 h-32 hidden md:flex items-center justify-center rounded-lg overflow-hidden shrink-0">
        <Image 
          src="/settings-user.png" 
          alt="User Settings Illustration" 
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{name}</h1>
        <p className="text-slate-600">
          View and manage your personal information, security and preferences here.
        </p>
      </div>
    </div>
  );
}
