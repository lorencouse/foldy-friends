// src/components/AdminRoute.js
import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useUserRole } from "../hooks/useUserRole";

const AdminRoute = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const { user, loading } = useAuth();
    const userRole = useUserRole();

    useEffect(() => {
      if (!loading) {
        if (!user || userRole !== "admin") {
          router.push("/sign-in");
        }
      }
    }, [user, loading, userRole]);

    if (loading || !user || userRole !== "admin") {
      return <p>Loading...</p>; // or any loading indicator
    }

    return <WrappedComponent {...props} />;
  };
};

export default AdminRoute;
