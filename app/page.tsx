import { Linden_Hill } from "next/font/google";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/characters">Characters</Link>
      <Link href="/user">User profile</Link>
    </main>
  );
}
