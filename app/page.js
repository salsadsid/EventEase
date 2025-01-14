import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-100 to-blue-300  p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-12 items-center text-center">
        <section className="relative text-gray-800  p-12 sm:p-20 w-full max-w-4xl">
          <div className="container mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Welcome to <span className="text-blue-600">EventEase</span>
            </h1>
            <p className="text-lg lg:text-xl mb-8">
              Your one-stop destination for discovering and managing all your
              exciting events.
            </p>

            <p className="text-base lg:text-lg font-medium mb-8">
              🎉 Want to see all the exciting events? Please{" "}
              <span className="font-bold text-blue-600">login first</span> to
              get started.
            </p>

            <div className="space-x-4">
              <Link href="/login">
                <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="outline"
                  className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 hover:text-white"
                >
                  Register
                </Button>
              </Link>
            </div>
          </div>

          {/* Decorative Element */}
        </section>
      </main>

      <footer className="mt-12 text-center text-gray-600">
        © 2025 EventEase. All rights reserved.
      </footer>
    </div>
  );
}
