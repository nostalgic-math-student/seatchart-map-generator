import Head from "next/head";
import Link from "next/link";
import AreaForm from "~/components/generatorForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>Seatmap Generator</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-violet-950">
        <div className="container flex flex-col absolute items-center justify-center gap-12 px-4 py-16  ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem] ">
            Ticketsaver Seatmap Generator
          </h1>
          <div>
            <AreaForm/>
          </div>
        </div>
      </main>
    </>
  );
}
