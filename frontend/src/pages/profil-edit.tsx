'use client';

import React, { useState } from "react";
import { useAuthContext } from "@urbannerd/provider/AuthProvider";
import { colors } from "@urbannerd/constant";
import Link from "next/link";
import { ArrowLeftIcons } from "@urbannerd/components/Icons";
import EditProfilForm from "@urbannerd/components/Forms/EditProfilForm/EditProfilForm";
import { useRouter } from "next/router";
import { AuthSchemaType } from "@urbannerd/types";

const ProfilEdit = () => {
  const {user} = useAuthContext()
  const [newUser, setNewUser] = useState<AuthSchemaType | null>(null)
  const router =   useRouter()
  if(!newUser) return null
    return (
      <>
        <main className="profil_settings_main">
        <div onClick={() => router.back()} className="back_arrow">
        <ArrowLeftIcons 
        iconProps={{
              size: 32,
              color: colors.colorWhite,
            }}></ArrowLeftIcons>
      </div>
        <EditProfilForm />
        </main>
      </>
    );
  };
  
  export default ProfilEdit;
  