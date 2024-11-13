"use client";

export default function LastView() {
  return (
    <div className="w-full h-[95%] flex items-center px-8 relative">
      <video
        className="w-full h-[90%] object-cover pointer-events-auto bottom-0"
        controls
      >
        <source src="/videos/HarvestHubv1.3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
