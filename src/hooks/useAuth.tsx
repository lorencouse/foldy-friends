// src/hooks/useAuth.ts
import { useState, useEffect } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebaseConfig";
import { UserData, AddressInfo } from "../types";

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
      async (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          const { uid, email, displayName, photoURL } = firebaseUser;

          // Fetch additional user data from Firestore
          const userDocRef = doc(db, "users", uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data() as UserData;
            setUser({
              id: uid,
              email,
              username: displayName || userData.username || "",
              photo_url: photoURL || userData.photo_url || "",
              created_at: userData.created_at, // Assuming created_at is stored as a Firestore Timestamp
              shipping_info: userData.shipping_info,
              billing_info: userData.billing_info,
              order_history: userData.order_history,
            });
          } else {
            // Set user with default values if no additional user data found
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
          }
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
