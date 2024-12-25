"use client";

import ProfileContainer from "@/components/ProfilePage/ProfileContainer";
import React, { useEffect } from "react";
import UpdateForm from "@/components/ProfilePage/UpdateForm";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Profil() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      router.push("/");
    }
  }, [session, router]);

  if (!session?.user) {
    return null;
  }

  return (
    <ProfileContainer className="xl:relative">
      <div className="lg:py-12 xl:py-16 lg:px-12 xl:px-24">
        <h1 className="font-medium text-2xl text-greenColorSecondary mb-12 lg:truncate lg:max-w-[365px] xl:max-w-full">
          Gérez votre compte - {session?.user?.name}
        </h1>
        <Image
          src="/FormsMedia/profile-image.jpg"
          alt="logo"
          width={1400}
          height={1055}
          className="h-[150px] md:h-[200px] lg:h-[150px] object-cover [object-position:50%_20%] rounded-lg mb-12 xl:hidden"
        />
        <div className="xl:flex xl:w-full xl:justify-between xl:gap-32">
          <UpdateForm />
          <Image
            src="/FormsMedia/profile-image.jpg"
            alt="logo"
            width={1400}
            height={1055}
            className="h-[150px] md:h-[200px] lg:h-[150px] xl:h-[350px] xl:w-[300px] object-cover [object-position:50%_20%] rounded-lg mb-12 hidden xl:block"
          />
        </div>
      </div>
    </ProfileContainer>
  );
}
