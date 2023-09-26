import Image from "next/image";
import Location from "@/../public/logo.svg";

export default function Logo({ size }: { size: number }) {
  return (
    <div className="h-10 flex items-center">
      <Image src={Location} alt="logo image" width={size} />
      <h2 className="pl-2 text-2xl">Algolendar</h2>
    </div>
  );
}
