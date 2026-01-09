"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { CheckCircle2, Pencil, Save, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PersonalInfo {
  email: string;
  name: string;
  sid: string;
  isVerified: boolean;
}

interface PersonalInfoCardProps {
    user: PersonalInfo;
}

export function PersonalInfoCard({ user }: PersonalInfoCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
  };

  const handleCancel = () => {
      setFormData(user);
      setIsEditing(false);
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold">Personal information</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-6">
        <div>
          <label className="text-sm font-medium text-slate-500 block mb-1">Email address</label>
            {isEditing ? (
                 <Input 
                 value={formData.email} 
                 onChange={(e) => setFormData({...formData, email: e.target.value})}
                 className="max-w-md"
               />
            ) : (
                <div className="flex items-center justify-between">
                    <span className="text-slate-900">{formData.email}</span>
                    {user.isVerified && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified
                        </span>
                    )}
                </div>
            )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-500 block mb-1">Full name</label>
          {isEditing ? (
                 <Input 
                 value={formData.name} 
                 onChange={(e) => setFormData({...formData, name: e.target.value})}
                 className="max-w-md"
               />
            ) : (
                <div className="text-slate-900">{formData.name}</div>
            )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-500 block mb-1">User SID</label>
          {/* SID is usually read-only */}
          <div className="text-slate-900 font-mono text-sm break-all">{user.sid}</div>
        </div>
      </CardContent>
      <CardFooter>
        {isEditing ? (
             <div className="flex gap-2">
                 <Button onClick={handleSave} className="gap-2 bg-slate-900 text-white hover:bg-slate-800">
                     <Save className="w-4 h-4" />
                     Save
                 </Button>
                 <Button onClick={handleCancel} className="gap-2 bg-white text-slate-700 border border-slate-300 hover:bg-slate-50">
                     <X className="w-4 h-4" />
                     Cancel
                 </Button>
             </div>
        ) : (
            <button 
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium"
            >
            <Pencil className="w-4 h-4" />
            Edit
            </button>
        )}
      </CardFooter>
    </Card>
  );
}
