import Image from "next/image";
export default function GeneralView() {
  return (
    <div>
      <Image
        src="/images/fougere.png"
        alt="Picture of the author"
        width={100}
        height={100}
        className="w-10"
      />

      <Image
        src="/images/logo.png"
        alt="Picture of the author"
        width={300}
        height={300}
        className="w-10"
      />
    </div>
  );
}
