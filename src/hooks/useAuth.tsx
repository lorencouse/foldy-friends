import { useState, useEffect } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "../lib/firebaseConfig";
import { UserData } from "../types";

interface UseAuthReturn {
  user: UserData | null;
  loading: boolean;
}

const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          const { uid, email, displayName, photoURL } = firebaseUser;
          setUser({
            id: uid,
            email,
            username: displayName || "",
            photo_url: photoURL || "",
            created_at: new Date(),
            shipping_info: {} as AddressInfo,
            billing_info: {} as AddressInfo,
            order_history: [],
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export default useAuth;
