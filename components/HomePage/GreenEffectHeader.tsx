import React from "react";

export default function GreenEffectHeader() {
  return (
    <div className="absolute top-[355px] sm:top-[320px] md:top-[280px] lg:top-[250px] xl:-top-[50px] -translate-x-1/2 left-1/2 -z-10">
      <div className="flex opacity-10 gap-[320px] sm:gap-[750px] md:gap-[900px] lg:gap-[1200px] xl:gap-[1350px]">
        <div className="flex gap-14 xl:gap-20 rotate-[18deg] sm:rotate-[25deg] lg:rotate-[35deg] xl:rotate-[60deg]">
          <div className="w-8 lg:w-10 xl:w-16 h-[800px] sm:h-[1200px] md:h-[1500px] bg-greenColorSecondary rounded-full"></div>
          <div className="w-8 lg:w-10 xl:w-16 h-[800px] sm:h-[1200px] md:h-[1500px] bg-greenColorSecondary rounded-full"></div>
        </div>
        <div className="flex gap-14 xl:gap-20 -rotate-[18deg] sm:-rotate-[25deg] lg:-rotate-[35deg] xl:-rotate-[60deg]">
          <div className="w-8 lg:w-10 xl:w-16 h-[800px] sm:h-[1200px] md:h-[1500px] bg-greenColorSecondary rounded-full"></div>
          <div className="w-8 lg:w-10 xl:w-16 h-[800px] sm:h-[1200px] md:h-[1500px] bg-greenColorSecondary rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
