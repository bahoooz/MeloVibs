import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

export default function ListMusicGenres() {
  return (
    <section className="mt-32 lg:mt-44">
      <h2 className="text-5xl mb-20 lg:mb-32 md:w-[600px] md:mx-auto lg:w-[700px] xl:w-[1200px] xl:text-center">
        Découvrez les morceaux les plus streamées par genre
      </h2>
      <div className="flex md:hidden flex-col gap-10 sm:gap-5 xl:gap-10 sm:flex-wrap sm:flex-row">
        <Link
          href="/classements/rap-fr"
          className="group relative rounded-2xl sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-13.33px)] xl:w-[calc(20%-32px)] hover:scale-[1.02] transition-all duration-200"
        >
          <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-violet-500 text-5xl font-bold z-10 text-center transition-colors duration-300">
            RAP FR
          </h4>
          <Image
            src={"/HomePageMedia/rap_cover.jpg"}
            alt="Cover Rap"
            width={1170}
            height={1755}
            className="h-[175px] xl:h-[400px] w-full object-cover rounded-2xl brightness-50 [object-position:70%_15%]"
          />
        </Link>
        <Link
          href="/classements/pop"
          className="group relative rounded-2xl sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-13.33px)] xl:w-[calc(20%-32px)] hover:scale-[1.02] transition-all duration-200"
        >
          <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-red-500 text-5xl font-bold z-10 text-center transition-colors duration-300">
            POP
          </h4>
          <Image
            src={"/HomePageMedia/pop_cover.jpg"}
            alt="Cover Pop"
            width={660}
            height={800}
            className="h-[175px] xl:h-[400px] w-full object-cover rounded-2xl brightness-50 [object-position:70%_34%]"
          />
        </Link>
        <Link
          href="/classements/jazz"
          className="group relative rounded-2xl sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-13.33px)] xl:w-[calc(20%-32px)] hover:scale-[1.02] transition-all duration-200"
        >
          <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-blue-500 text-5xl font-bold z-10 text-center transition-colors duration-300">
            JAZZ
          </h4>
          <Image
            src={"/HomePageMedia/jazz_cover.jpg"}
            alt="Cover Jazz"
            width={1507}
            height={2137}
            className="h-[175px] xl:h-[400px] w-full object-cover rounded-2xl brightness-50 [object-position:70%_8%]"
          />
        </Link>
        <Link
          href="/classements/rap-fr"
          className="group relative rounded-2xl sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-13.33px)] xl:w-[calc(20%-32px)] hover:scale-[1.02] transition-all duration-200"
        >
          <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-yellow-500 text-5xl font-bold z-10 text-center transition-colors duration-300">
            RAP US
          </h4>
          <Image
            src={"/ClassementsMedia/rap_us_cover.webp"}
            alt="Cover Rap"
            width={1170}
            height={1755}
            className="h-[175px] xl:h-[400px] w-full object-cover rounded-2xl brightness-50 [object-position:70%_15%]"
          />
        </Link>
        <Link
          href="/classements/r&b"
          className="group relative rounded-2xl sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-10px)] xl:w-[calc(20%-32px)] hover:scale-[1.02] transition-all duration-200"
        >
          <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-orange-500 text-5xl font-bold z-10 text-center transition-colors duration-300">
            R&B
          </h4>
          <Image
            src={"/HomePageMedia/r&b_cover.jpg"}
            alt="Cover R&B"
            width={744}
            height={446}
            className="h-[175px] xl:h-[400px] w-full object-cover rounded-2xl brightness-50 [object-position:70%_35%]"
          />
        </Link>
        <Link
          href="/classements/r&b"
          className="group relative rounded-2xl sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-10px)] xl:w-[calc(20%-32px)] hover:scale-[1.02] transition-all duration-200"
        >
          <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-lime-500 text-5xl font-bold z-10 text-center transition-colors duration-300">
            LATINES
          </h4>
          <Image
            src={"/ClassementsMedia/latines_cover.png"}
            alt="Cover R&B"
            width={744}
            height={446}
            className="h-[175px] xl:h-[400px] w-full object-cover rounded-2xl brightness-50 [object-position:70%_35%]"
          />
        </Link>
        <Link
          href="/classements/r&b"
          className="group relative rounded-2xl sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-10px)] xl:w-[calc(20%-32px)] hover:scale-[1.02] transition-all duration-200"
        >
          <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-cyan-500 text-5xl font-bold z-10 text-center transition-colors duration-300">
            ROCK
          </h4>
          <Image
            src={"/ClassementsMedia/rock_cover.png"}
            alt="Cover R&B"
            width={744}
            height={446}
            className="h-[175px] xl:h-[400px] w-full object-cover rounded-2xl brightness-50 [object-position:70%_20%]"
          />
        </Link>
        <Link
          href="/classements/r&b"
          className="group relative rounded-2xl sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-10px)] xl:w-[calc(20%-32px)] hover:scale-[1.02] transition-all duration-200"
        >
          <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-indigo-500 text-5xl font-bold z-10 text-center transition-colors duration-300">
            ELECTRO
          </h4>
          <Image
            src={"/ClassementsMedia/electro_cover.jpg"}
            alt="Cover R&B"
            width={744}
            height={446}
            className="h-[175px] xl:h-[400px] w-full object-cover rounded-2xl brightness-50 [object-position:70%_50%]"
          />
        </Link>
        <Link
          href="/classements/r&b"
          className="group relative rounded-2xl sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-10px)] xl:w-[calc(20%-32px)] hover:scale-[1.02] transition-all duration-200"
        >
          <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-rose-500 text-5xl font-bold z-10 text-center transition-colors duration-300">
            KPOP
          </h4>
          <Image
            src={"/ClassementsMedia/kpop_cover.webp"}
            alt="Cover R&B"
            width={744}
            height={446}
            className="h-[175px] xl:h-[400px] w-full object-cover rounded-2xl brightness-50 [object-position:70%_35%]"
          />
        </Link>
        <Link
          href="/classements/afro-beats"
          className="group relative rounded-2xl sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-10px)] xl:w-[calc(20%-32px)] hover:scale-[1.02] transition-all duration-200"
        >
          <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-fuchsia-500 text-5xl font-bold z-10 text-center transition-colors duration-300">
            AFRO BEATS
          </h4>
          <Image
            src={"/HomePageMedia/afro_beats_cover.jpg"}
            alt="Cover Afro Beats"
            width={1170}
            height={1755}
            className="h-[175px] xl:h-[400px] w-full object-cover rounded-2xl brightness-50 [object-position:70%_50%] xl:[object-position:55%_50%]"
          />
        </Link>
      </div>
      <div className="hidden md:flex gap-5 flex-col h-[820px] md:w-[600px] md:mx-auto lg:w-[700px] xl:w-[1200px]">
        <div className="flex gap-5 h-[400px] w-full">
          <Link
            href={"/classements/rap-fr"}
            className="relative h-full w-[25%] rounded-xl overflow-hidden"
          >
            <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-fuchsia-500 text-4xl font-bold z-10 text-center transition-colors duration-300">
              RAP FR
            </h4>
            <Image
              src={"/HomePageMedia/rap_cover.jpg"}
              alt="Cover Afro Beats"
              width={1170}
              height={1755}
              className="h-full object-cover brightness-50 [object-position:40%_50%] xl:[object-position:55%_50%]"
            />
          </Link>
          <div className="flex flex-col gap-5 w-[75%]">
            <div className="flex gap-5 ">
              <Link
                href={""}
                className="h-[190px] w-[60%] relative rounded-xl overflow-hidden"
              >
                <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-fuchsia-500 text-4xl font-bold z-10 text-center transition-colors duration-300">
                  POP
                </h4>
                <Image
                  src={"/ClassementsMedia/pop_cover.jpg"}
                  alt="Cover Afro Beats"
                  width={1170}
                  height={1755}
                  className="h-full object-cover rounded-2xl brightness-50 [object-position:40%_50%] xl:[object-position:55%_50%]"
                />
              </Link>
              <Link
                href={""}
                className="h-[190px] w-[40%] relative rounded-xl overflow-hidden"
              >
                <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-fuchsia-500 text-4xl font-bold z-10 text-center transition-colors duration-300">
                  R&B
                </h4>
                <Image
                  src={"/HomePageMedia/r&b_cover.jpg"}
                  alt="Cover Afro Beats"
                  width={1170}
                  height={1755}
                  className="h-full object-cover rounded-2xl brightness-50 [object-position:40%_50%] xl:[object-position:55%_50%]"
                />
              </Link>
            </div>
            <div className="flex gap-5">
              <Link
                href={""}
                className="h-[190px] w-[40%] relative rounded-xl overflow-hidden"
              >
                <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-fuchsia-500 text-4xl font-bold z-10 text-center transition-colors duration-300">
                  JAZZ
                </h4>
                <Image
                  src={"/HomePageMedia/jazz_cover.jpg"}
                  alt="Cover Afro Beats"
                  width={1170}
                  height={1755}
                  className="h-full object-cover rounded-2xl brightness-50 [object-position:40%_20%] xl:[object-position:55%_50%]"
                />
              </Link>
              <Link
                href={""}
                className="h-[190px] w-[60%] relative rounded-xl overflow-hidden"
              >
                <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-fuchsia-500 text-4xl font-bold z-10 text-center transition-colors duration-300">
                  RAP US
                </h4>
                <Image
                  src={"/ClassementsMedia/rap_us_cover.webp"}
                  alt="Cover Afro Beats"
                  width={1170}
                  height={1755}
                  className="h-full object-cover rounded-2xl brightness-50 [object-position:40%_50%] xl:[object-position:55%_50%]"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-row-reverse gap-5 h-[400px] w-full">
          <Link
            href={"/classements/rap-fr"}
            className="relative h-full w-[25%] rounded-xl overflow-hidden"
          >
            <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-fuchsia-500 text-4xl font-bold z-10 text-center transition-colors duration-300">
              ROCK
            </h4>
            <Image
              src={"/ClassementsMedia/rock_cover.png"}
              alt="Cover Afro Beats"
              width={1170}
              height={1755}
              className="h-full object-cover brightness-50 [object-position:60%_50%] xl:[object-position:55%_0%]"
            />
          </Link>
          <div className="flex flex-col gap-5 w-[75%]">
            <div className="flex gap-5 ">
              <Link
                href={""}
                className="h-[190px] w-[60%] relative rounded-xl overflow-hidden"
              >
                <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-fuchsia-500 text-4xl font-bold z-10 text-center transition-colors duration-300">
                  LATINES
                </h4>
                <Image
                  src={"/ClassementsMedia/latines_cover.png"}
                  alt="Cover Afro Beats"
                  width={1170}
                  height={1755}
                  className="h-full object-cover rounded-2xl brightness-50 [object-position:40%_50%] xl:[object-position:55%_50%]"
                />
              </Link>
              <Link
                href={""}
                className="h-[190px] w-[40%] relative rounded-xl overflow-hidden"
              >
                <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-fuchsia-500 text-4xl font-bold z-10 text-center transition-colors duration-300">
                  AFRO BEATS
                </h4>
                <Image
                  src={"/HomePageMedia/afro_beats_cover.jpg"}
                  alt="Cover Afro Beats"
                  width={1170}
                  height={1755}
                  className="h-full object-cover rounded-2xl brightness-50 [object-position:50%_50%] xl:[object-position:55%_50%]"
                />
              </Link>
            </div>
            <div className="flex gap-5">
              <Link
                href={""}
                className="h-[190px] w-[40%] relative rounded-xl overflow-hidden"
              >
                <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-fuchsia-500 text-[32px] font-bold z-10 text-center transition-colors duration-300">
                  ELECTRO
                </h4>
                <Image
                  src={"/ClassementsMedia/electro_cover.jpg"}
                  alt="Cover Afro Beats"
                  width={1170}
                  height={1755}
                  className="h-full object-cover rounded-2xl brightness-50 [object-position:40%_20%] xl:[object-position:55%_50%]"
                />
              </Link>
              <Link
                href={""}
                className="h-[190px] w-[60%] relative rounded-xl overflow-hidden"
              >
                <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-fuchsia-500 text-4xl font-bold z-10 text-center transition-colors duration-300">
                  K-POP
                </h4>
                <Image
                  src={"/ClassementsMedia/kpop_cover.webp"}
                  alt="Cover Afro Beats"
                  width={1170}
                  height={1755}
                  className="h-full object-cover rounded-2xl brightness-50 [object-position:40%_50%] xl:[object-position:55%_50%]"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
