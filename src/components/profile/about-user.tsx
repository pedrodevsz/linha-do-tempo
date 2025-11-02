"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Edit, KeyRound, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { Card } from "../ui/card";

export function AboutUser({
  onEdit,
  onChangePassword,
}: {
  onEdit: () => void;
  onChangePassword: () => void;
}) {
  const { user, verifySession, logout, loading } = useAuth();
  const [profile, setProfile] = useState<typeof user | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const ok = await verifySession();
      if (ok) setProfile(user);
    };
    fetchUser();
  }, [user, verifySession]);

  if (loading) return <p className="text-white">Carregando usuário...</p>;
  if (!profile) return <p className="text-white">Nenhum usuário encontrado.</p>;

  return (
    <Card className="relative flex flex-col md:flex-row items-center md:items-start gap-6 p-6 bg-neutral-900 border border-neutral-700 rounded-2xl shadow-lg">
      <div className="w-24 h-24 rounded-full overflow-hidden border border-neutral-700 flex-shrink-0">
        {profile.avatarUrl ? (
          <Image
            src={profile.avatarUrl}
            alt={profile.name}
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center text-white text-2xl font-bold">
            {profile.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-2 text-white w-full">
        <h2 className="text-2xl font-bold">{profile.name}</h2>
        {profile.username && (
          <p className="text-lilac-400 text-sm">@{profile.username}</p>
        )}
        {profile.email && <p className="text-gray-300 text-sm">{profile.email}</p>}

        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onChangePassword}
            className="flex items-center gap-2 text-white border-gray-600 hover:bg-gray-700"
          >
            <KeyRound className="h-4 w-4" />
            Modificar senha
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={logout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sair da conta
          </Button>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onEdit}
        className="absolute top-3 right-3 text-white hover:bg-gray-700"
        title="Editar perfil"
      >
      </Button>
    </Card>
  );
}
