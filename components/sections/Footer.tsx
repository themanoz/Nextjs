import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-4 flex flex-col py-10 items-center justify-around mx-auto px-4 text-center text-muted-foreground space-y-2">
      <p className="flex items-center text-xs sm:text-sm md:text-md lg:text-md">
        &copy; {new Date().getFullYear()} GitTrek. All rights reserved.
      </p>
      <div className="flex justify-center space-x-4 text-xs sm:text-sm md:text-md lg:text-md">
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/terms-conditions">Terms and Conditions</Link>
        <Link href="/refund-policy">Refund Policy</Link>
      </div>
    </footer>
  );
}
