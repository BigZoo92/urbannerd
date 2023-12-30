'use client';

import React from "react";
import { useAuthContext } from "@urbannerd/provider/AuthProvider";
import { colors } from "@urbannerd/constant";
import Link from "next/link";
import { ArrowLeftIcons } from "@urbannerd/components/Icons";
import EditProfilForm from "@urbannerd/components/Forms/EditProfilForm/EditProfilForm";

const ProfilEdit = () => {
  const {user} = useAuthContext()
  if(!user) return
    return (
      <>
        <main className="profil_settings_main">
        <Link href={`/profil/${user?.id}`} className="back_arrow">
        <ArrowLeftIcons 
        iconProps={{
              size: 32,
              color: colors.colorWhite,
            }}></ArrowLeftIcons>
      </Link>
        <EditProfilForm />
        </main>
      </>
    );
  };
  
  export default ProfilEdit;
  