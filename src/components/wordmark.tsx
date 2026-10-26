import Image from "next/image";
// Logo lengkap: versi putih (aksen limau) untuk latar gelap, versi navy untuk latar terang.
import logoNavy from "@/assets/brand/logo-navy.png";
import logoWhite from "@/assets/brand/logo-white.png";

export function Wordmark({
  variant = "white",
  className = "h-gr-xl",
}: {
  variant?: "white" | "navy";
  className?: string;
}) {
  return (
    <Image
      src={variant === "white" ? logoWhite : logoNavy}
      alt="TYNEXT Energy and Control"
      loading="eager"
      sizes="240px"
      className={`w-auto ${className}`}
    />
  );
}
