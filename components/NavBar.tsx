import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/previous-events", label: "Previous Events" },
  { href: "/predict-winner", label: "Predict-Winner" },
  { href: "/upcoming-events", label: "Upcoming Events" },
];

export default function NavBar() {
  return (
    <>
      <div className="fixed bottom-7 md:bottom-5 left-1/2 -translate-x-1/2 z-10 bg-white/70 dark:bg-black/50 border border-zinc-700 backdrop-blur-sm rounded-full px-2 py-2 sm:px-6 sm:py-3">
        <ul className="flex items-center justify-center sm:space-x-3 md:space-x-6">
          {navLinks.map((link) => (
            <li
              key={link.href}
              className="hover:scale-110 transition-transform duration-300"
            >
              <Link
                href={link.href}
                className="text-xs sm:text-sm block px-1 md:px-3 py-1 whitespace-nowrap"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
