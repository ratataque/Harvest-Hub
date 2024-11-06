export default function Pages({
  className,
  color,
  style,
  transTransi,
  scaleTransi,
}: {
  className?: string;
  color?: string;
  style?: React.CSSProperties;
  transTransi?: string;
  scaleTransi?: string;
}) {
  return (
    <div
      className={`${className} ${transTransi} rounded-3xl transform transition-transform absolute mt-20 mb-8`}
      style={style}
    >
      <div
        className={`${scaleTransi} ${color} shadow-[0px_0px_50px_-20px_rgba(0,0,0,0.45)] shadow-black inset-0 rounded-3xl pointer-events-none transform transition-transform h-[87vh] w-[90vw] flex flex-col items-center justify-center`}
      ></div>
    </div>
  );
}
