import React from "react";

export default function GreenEffectGlobalStats() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 -bottom-[300px] sm:-bottom-[350px] xl:-bottom-[450px] -z-10">
      <div className="flex gap-[400px] sm:gap-[600px] md:gap-[800px] lg:gap-[1000px] xl:gap-[1400px]">
        <div className="flex gap-14 xl:gap-20 -rotate-[20deg] sm:-rotate-[30deg] md:-rotate-[40deg] lg:-rotate-[50deg] xl:-rotate-[60deg]">
          <div className="w-8 lg:w-10 xl:w-12 lg h-[700px] sm:h-[800px] xl:h-[900px] bg-greenColorSecondary rounded-full"></div>
          <div className="w-8 lg:w-10 xl:w-12 h-[700px] sm:h-[800px] xl:h-[900px] bg-greenColorSecondary rounded-full"></div>
        </div>
        <div className="flex gap-14 xl:gap-20 rotate-[20deg] sm:rotate-[30deg] md:rotate-[40deg] lg:rotate-[50deg] xl:rotate-[60deg]">
          <div className="w-8 lg:w-10 xl:w-12 h-[700px] sm:h-[800px] xl:h-[900px] bg-greenColorSecondary rounded-full"></div>
          <div className="w-8 lg:w-10 xl:w-12 h-[700px] sm:h-[800px] xl:h-[900px] bg-greenColorSecondary rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
