export default function Pages({
  className,
  color,
}: {
  className: string;
  color: string;
}) {
  return (
    <div
      className={`${className} ${color} shadow-[0px_0px_50px_-20px_rgba(0,0,0,0.45)] shadow-black flex flex-col items-center justify-center rounded-3xl h-[87vh] w-[90vw] transform transition-all duration-500 absolute`}
    ></div>
  );
}
