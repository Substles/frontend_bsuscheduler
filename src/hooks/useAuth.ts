/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "@/lib/cookie";

type Permission = "admin" | "user" | "faculty" | null;

function useAuth() {
  const [permission, setPermission] = useState<Permission>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("token");
    const permission = getCookie("permission") as Permission;
    
    setPermission(permission);

    if (!token || !permission) {
      if (permission !== null)
        navigate('/login', {replace: true})
    }
  }, [permission]);
  

  return permission;
}

export default useAuth;
