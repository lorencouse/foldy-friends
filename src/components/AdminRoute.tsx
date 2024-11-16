import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useUserRole } from "../hooks/useUserRole";
import { LoadingScreen } from "../components/Product/LoadingScreen";
import { ComponentType } from "react";

type WrappedComponentProps = { [key: string]: any };

const AdminRoute = <P extends WrappedComponentProps>(
  WrappedComponent: ComponentType<P>,
) => {
  const AdminRouteComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const { user, loading } = useAuth();
    const userRole = useUserRole();

    useEffect(() => {
      if (!loading) {
        if (!user || userRole !== "admin") {
          router.push("/sign-in");
        }
      }
    }, [user, loading, userRole, router]);

    if (loading || !user || userRole !== "admin") {
      return <LoadingScreen />;
    }

    return <WrappedComponent {...props} />;
  };

  return AdminRouteComponent;
};

export default AdminRoute;
