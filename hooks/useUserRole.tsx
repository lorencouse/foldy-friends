import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../lib/firebaseConfig"

export function useUserRole() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        onSnapshot(userDoc, (doc) => {
          if (doc.exists()) {
            setRole(doc.data().role);
          }
        });
      } else {
        setRole(null);
      }
    });

    return unsubscribe;
  }, []);

  return role;
}
