"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Page = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>;
  }
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
        <div>
          Name: <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
        >
          Log Out
        </button>
      </div>
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded text-center">
        <h1 className="text-2xl font-bold mb-6">Event Management</h1>
        <Link
          href="/dashboard/events/create"
          className="block bg-blue-600 text-white py-2 rounded mb-4 hover:bg-blue-700"
        >
          Create Event
        </Link>
        <Link
          href="/dashboard/events"
          className="block bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          View Events
        </Link>
      </div>
    </div>
  );
};

export default Page;
