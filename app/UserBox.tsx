"use client";

import User from "@/model/user";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";

export default function UserBox(props: { user: User }) {
  const { user: userProfile, error, isLoading } = useUser();
  const [user, setUser] = useState(props.user);
  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then(setUser);
  }, [userProfile]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!userProfile) return <a href="/api/auth/login">Login</a>;
  return (
    <div>
      <h2>{user.name}</h2>
      <a href="/api/auth/logout">Logout</a>
    </div>
  );
}
