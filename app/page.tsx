import Image from "next/image";
import Link from "next/link";
import coverImage from "@/public/cover-image.png";

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <Image
        src={coverImage}
        alt="UFC octagon cover image"
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-white dark:to-black" />

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 text-center">
        <h1 className="text-3xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-red-500 via-white to-blue-500 bg-clip-text text-transparent">
          UFC Fight Predictor
        </h1>
        <p className="mt-4 max-w-2xl text-base md:text-lg text-zinc-100/90 dark:text-zinc-200">
          Get precise predictions for UFC fights with ~70% historical accuracy.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/upcoming-events"
            className="px-5 py-2.5 rounded-full border border-white/70 text-white hover:bg-white/10 backdrop-blur-sm transition"
          >
            Upcoming events
          </Link>
          <Link
            href="/predict-winner"
            className="px-5 py-2.5 rounded-full bg-white text-black font-medium shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition"
          >
            Predict winner
          </Link>
          <Link
            href="/previous-events"
            className="px-5 py-2.5 rounded-full border border-white/70 text-white hover:bg-white/10 backdrop-blur-sm transition"
          >
            Previous events
          </Link>
        </div>
      </section>
    </main>
  );
}
