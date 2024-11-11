import { title } from "process";

export default function GeneralView({
  className,
  color,
  style,
  transTransi,
  scaleTransi,
  children,
  title = { color: "", txt: "" },
}: {
  className?: string;
  color?: string;
  style?: React.CSSProperties;
  transTransi?: string;
  scaleTransi?: string;
  children?: React.ReactNode;
  title: { color: string; txt: string };
}) {
  return (
    <div
      className={`${className} ${transTransi} rounded-3xl transform transition-transform absolute mt-7 mb-8 pointer-events-auto`}
      style={style}
    >
      <div
        className={`${scaleTransi} ${color} shadow-[0px_0px_50px_-20px_rgba(0,0,0,0.45)] shadow-black inset-0 rounded-3xl pointer-events-none transform transition-transform h-[87vh] w-[90vw] flex flex-col items-center origin-top p-2`}
      >
        <div className="macOS-window-titlebar">
          <div className="button"></div>
          <div className="button"></div>
          <div className="button"></div>
          <div className={`macOS-window-title ${title.color}`}>{title.txt}</div>
        </div>

        {children}
      </div>
    </div>
  );
}
