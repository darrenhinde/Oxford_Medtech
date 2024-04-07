import Image from "next/image";


/**
 * v0 by Vercel.
 * @see https://v0.dev/t/38XFLjBkOpe
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"

export default function Component() {
  return (
    <nav className="flex items-center h-16 px-4 md:px-6 border-b border-gray-200 dark:border-gray-800 fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-50">
      <Link className="flex items-center space-x-2 text-lg font-semibold tracking-wider uppercase" href="/">
        Patienthub
        <span className="sr-only">Patienthub</span>
      </Link>
      <div className="ml-auto flex items-center space-x-4">
        <Link className="flex w-6 h-6 items-center justify-center" href="#">
        <Image
            className="rounded-xl"
            src="/patienthub.png"
            alt="PatientHub"
            width={40}
            height={40}
            priority
          />
          <span className="sr-only">View profile</span>
        </Link>
      </div>
    </nav>
  )
}

