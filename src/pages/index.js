import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login"); // Redirect to login page
  }, []);

  return null; // Since it's redirecting, we don't need to render anything
}
