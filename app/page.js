export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center  p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          EventEase
        </h1>
        <p className="text-lg text-center sm:text-left">
          Welcome to EventEase, your one-stop destination for all things event
        </p>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* <a
          href="https://github.com/EventEase"
          className="flex gap-2 items-center"
        >
          <Image src="/github.svg" alt="GitHub" width={24} height={24}></Image>
          GitHub
        </a> */}
      </footer>
    </div>
  );
}
