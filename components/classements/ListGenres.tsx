import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ListMusicGenresProps {
  title: string,
  imageRapFr: string;
  imagePop: string;
  imageJazz: string;
  imageRapUs: string;
  imageRnb: string;
  imageLatines: string;
  imageRock: string;
  imageElectro: string;
  imageKpop: string;
  imageAfroBeats: string;
  linkRapFr: string;
  linkPop: string;
  linkJazz: string;
  linkRapUs: string;
  linkRnb: string;
  linkLatines: string;
  linkRock: string;
  linkElectro: string;
  linkKpop: string;
  linkAfroBeats: string;
  widthRapFr: number;
  heightRapFr: number;
  widthPop: number;
  heightPop: number;
  widthJazz: number;
  heightJazz: number;
  widthRapUs: number;
  heightRapUs: number;
  widthRnb: number;
  heightRnb: number;
  widthLatines: number;
  heightLatines: number;
  widthRock: number;
  heightRock: number;
  widthElectro: number;
  heightElectro: number;
  widthKpop: number;
  heightKpop: number;
  widthAfroBeats: number;
  heightAfroBeats: number;
}

export default function ListMusicGenres({
  title,
  imageRapFr,
  widthRapFr,
  heightRapFr,
  linkRapFr,
  imagePop,
  widthPop,
  heightPop,
  linkPop,
  imageJazz,
  widthJazz,
  heightJazz,
  linkJazz,
  imageRapUs,
  widthRapUs,
  heightRapUs,
  linkRapUs,
  imageRnb,
  widthRnb,
  heightRnb,
  linkRnb,
  imageLatines,
  widthLatines,
  heightLatines,
  linkLatines,
  imageRock,
  widthRock,
  heightRock,
  linkRock,
  imageElectro,
  widthElectro,
  heightElectro,
  linkElectro,
  imageKpop,
  widthKpop,
  heightKpop,
  linkKpop,
  imageAfroBeats,
  widthAfroBeats,
  heightAfroBeats,
  linkAfroBeats,
}: ListMusicGenresProps) {
  return (
    <section className="mt-32 lg:mt-44">
      <h2 className="text-5xl mb-20 lg:mb-32 md:w-[600px] md:mx-auto lg:w-[700px] xl:w-[1200px] xl:text-center">
        Découvrez les {title} les plus streamés par genre
      </h2>
      <div className="flex md:hidden flex-col gap-10 sm:gap-5 xl:gap-10 sm:flex-wrap sm:flex-row">
        <Link
          href={linkRapFr}
          className="group relative rounded-2xl sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-13.33px)] xl:w-[calc(20%-32px)] hover:scale-[1.02] transition-all duration-200"
        >
          <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-violet-500 text-5xl font-bold z-10 text-center transition-colors duration-300">
            RAP FR
          </h4>
          <Image
            src={imageRapFr}
            alt="Cover Rap"
            width={widthRapFr}
            height={heightRapFr}
            className="h-[175px] xl:h-[400px] w-full object-cover rounded-2xl brightness-50 [object-position:70%_15%]"
          />
        </Link>
        <Link
          href={linkPop}
          className="group relative rounded-2xl sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-13.33px)] xl:w-[calc(20%-32px)] hover:scale-[1.02] transition-all duration-200"
        >
          <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-red-500 text-5xl font-bold z-10 text-center transition-colors duration-300">
            POP
          </h4>
          <Image
            src={imagePop}
            alt="Cover Pop"
            width={widthPop}
            height={heightPop}
            className="h-[175px] xl:h-[400px] w-full object-cover rounded-2xl brightness-50 [object-position:70%_34%]"
          />
        </Link>
        <Link
          href={linkJazz}
          className="group relative rounded-2xl sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-13.33px)] xl:w-[calc(20%-32px)] hover:scale-[1.02] transition-all duration-200"
        >
          <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-blue-500 text-5xl font-bold z-10 text-center transition-colors duration-300">
            JAZZ
          </h4>
          <Image
            src={imageJazz}
            alt="Cover Jazz"
            width={widthJazz}
            height={heightJazz}
            className="h-[175px] xl:h-[400px] w-full object-cover rounded-2xl brightness-50 [object-position:70%_20%] sm:[object-position:70%_10%]"
          />
        </Link>
        <Link
          href={linkRapUs}
          className="group relative rounded-2xl sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-13.33px)] xl:w-[calc(20%-32px)] hover:scale-[1.02] transition-all duration-200"
        >
          <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-yellow-500 text-5xl font-bold z-10 text-center transition-colors duration-300">
            RAP US
          </h4>
          <Image
            src={imageRapUs}
            alt="Cover Rap"
            width={widthRapUs}
            height={heightRapUs}
            className="h-[175px] xl:h-[400px] w-full object-cover rounded-2xl brightness-50 [object-position:70%_15%]"
          />
        </Link>
        <Link
          href={linkRnb}
          className="group relative rounded-2xl sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-10px)] xl:w-[calc(20%-32px)] hover:scale-[1.02] transition-all duration-200"
        >
          <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-orange-500 text-5xl font-bold z-10 text-center transition-colors duration-300">
            R&B
          </h4>
          <Image
            src={imageRnb}
            alt="Cover R&B"
            width={widthRnb}
            height={heightRnb}
            className="h-[175px] xl:h-[400px] w-full object-cover rounded-2xl brightness-50 [object-position:70%_35%]"
          />
        </Link>
        <Link
          href={linkLatines}
          className="group relative rounded-2xl sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-10px)] xl:w-[calc(20%-32px)] hover:scale-[1.02] transition-all duration-200"
        >
          <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-lime-500 text-5xl font-bold z-10 text-center transition-colors duration-300">
            LATINES
          </h4>
          <Image
            src={imageLatines}
            alt="Cover R&B"
            width={widthLatines}
            height={heightLatines}
            className="h-[175px] xl:h-[400px] w-full object-cover rounded-2xl brightness-50 [object-position:70%_35%]"
          />
        </Link>
        <Link
          href={linkRock}
          className="group relative rounded-2xl sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-10px)] xl:w-[calc(20%-32px)] hover:scale-[1.02] transition-all duration-200"
        >
          <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-cyan-500 text-5xl font-bold z-10 text-center transition-colors duration-300">
            ROCK
          </h4>
          <Image
            src={imageRock}
            alt="Cover R&B"
            width={widthRock}
            height={heightRock}
            className="h-[175px] xl:h-[400px] w-full object-cover rounded-2xl brightness-50 [object-position:70%_15%]"
          />
        </Link>
        <Link
          href={linkElectro}
          className="group relative rounded-2xl sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-10px)] xl:w-[calc(20%-32px)] hover:scale-[1.02] transition-all duration-200"
        >
          <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-indigo-500 text-5xl font-bold z-10 text-center transition-colors duration-300">
            ELECTRO
          </h4>
          <Image
            src={imageElectro}
            alt="Cover R&B"
            width={widthElectro}
            height={heightElectro}
            className="h-[175px] xl:h-[400px] w-full object-cover rounded-2xl brightness-50 [object-position:70%_40%]"
          />
        </Link>
        <Link
          href={linkKpop}
          className="group relative rounded-2xl sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-10px)] xl:w-[calc(20%-32px)] hover:scale-[1.02] transition-all duration-200"
        >
          <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-rose-500 text-5xl font-bold z-10 text-center transition-colors duration-300">
            K-POP
          </h4>
          <Image
            src={imageKpop}
            alt="Cover R&B"
            width={widthKpop}
            height={heightKpop}
            className="h-[175px] xl:h-[400px] w-full object-cover rounded-2xl brightness-50 [object-position:70%_25%]"
          />
        </Link>
        <Link
          href={linkAfroBeats}
          className="group relative rounded-2xl sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-10px)] xl:w-[calc(20%-32px)] hover:scale-[1.02] transition-all duration-200"
        >
          <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-fuchsia-500 text-5xl font-bold z-10 text-center transition-colors duration-300">
            AFRO BEATS
          </h4>
          <Image
            src={imageAfroBeats}
            alt="Cover Afro Beats"
            width={widthAfroBeats}
            height={heightAfroBeats}
            className="h-[175px] xl:h-[400px] w-full object-cover rounded-2xl brightness-50 [object-position:70%_10%] xl:[object-position:55%_50%]"
          />
        </Link>
      </div>
      <div className="hidden md:flex gap-5 xl:gap-6 flex-col h-[820px] lg:h-[920px] xl:h-[1020px] md:w-[600px] md:mx-auto lg:w-[700px] xl:w-[1200px]">
        <div className="flex gap-5 xl:gap-6 h-[400px] lg:h-[450px] xl:h-[497px] w-full">
          <Link
            href={linkRapFr}
            className="relative h-full w-[25%] rounded-xl overflow-hidden group hover:scale-[1.02] transition-all duration-200"
          >
            <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-violet-500 text-4xl xl:text-5xl xl:w-full font-bold z-10 text-center transition-colors duration-300">
              RAP FR
            </h4>
            <Image
              src={imageRapFr}
              alt="Cover Afro Beats"
              width={widthRapFr}
              height={heightRapFr}
              className="h-full object-cover brightness-50 [object-position:40%_50%] xl:[object-position:55%_50%]"
            />
          </Link>
          <div className="flex flex-col gap-5 xl:gap-6 w-[75%]">
            <div className="flex gap-5 xl:gap-6">
              <Link
                href={linkPop}
                className="h-[190px] lg:h-[215px] xl:h-[237px] w-[60%] lg:w-[70%] relative rounded-xl overflow-hidden group hover:scale-[1.02] transition-all duration-200"
              >
                <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-red-500 text-4xl xl:text-5xl xl:w-full font-bold z-10 text-center transition-colors duration-300">
                  POP
                </h4>
                <Image
                  src={imagePop}
                  alt="Cover Afro Beats"
                  width={widthPop}
                  height={heightPop}
                  className="h-full object-cover rounded-2xl brightness-50 [object-position:40%_50%] xl:[object-position:55%_35%]"
                />
              </Link>
              <Link
                href={linkRnb}
                className="h-[190px] lg:h-[215px] xl:h-[237px] w-[40%] lg:w-[30%] relative rounded-xl overflow-hidden group hover:scale-[1.02] transition-all duration-200"
              >
                <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-blue-500 text-4xl xl:text-5xl xl:w-full font-bold z-10 text-center transition-colors duration-300">
                  R&B
                </h4>
                <Image
                  src={imageRnb}
                  alt="Cover Afro Beats"
                  width={widthRnb}
                  height={heightRnb}
                  className="h-full object-cover rounded-2xl brightness-50 [object-position:40%_50%] xl:[object-position:55%_50%]"
                />
              </Link>
            </div>
            <div className="flex gap-5 xl:gap-6">
              <Link
                href={linkJazz}
                className="h-[190px] lg:h-[215px] xl:h-[237px] w-[40%] lg:w-[30%] relative rounded-xl overflow-hidden group hover:scale-[1.02] transition-all duration-200"
              >
                <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-yellow-500 text-4xl xl:text-5xl xl:w-full font-bold z-10 text-center transition-colors duration-300">
                  JAZZ
                </h4>
                <Image
                  src={imageJazz}
                  alt="Cover Afro Beats"
                  width={widthJazz}
                  height={heightJazz}
                  className="h-full object-cover rounded-2xl brightness-50 [object-position:40%_20%] xl:[object-position:55%_20%]"
                />
              </Link>
              <Link
                href={linkRapUs}
                className="h-[190px] lg:h-[215px] xl:h-[237px] w-[60%] lg:w-[70%] relative rounded-xl overflow-hidden group hover:scale-[1.02] transition-all duration-200"
              >
                <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-orange-500 text-4xl xl:text-5xl xl:w-full font-bold z-10 text-center transition-colors duration-300">
                  RAP US
                </h4>
                <Image
                  src={imageRapUs}
                  alt="Cover Afro Beats"
                  width={widthRapUs}
                  height={heightRapUs}
                  className="h-full object-cover rounded-2xl brightness-50 [object-position:40%_50%] xl:[object-position:55%_25%]"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-row-reverse gap-5 xl:gap-6 h-[400px] lg:h-[450px] xl:h-[497px] w-full">
          <Link
            href={linkRock}
            className="relative h-full w-[25%] rounded-xl overflow-hidden group hover:scale-[1.02] transition-all duration-200"
          >
            <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-lime-500 text-4xl xl:text-5xl xl:w-full font-bold z-10 text-center transition-colors duration-300">
              ROCK
            </h4>
            <Image
              src={imageRock}
              alt="Cover Afro Beats"
              width={widthRock}
              height={heightRock}
              className="h-full object-cover brightness-50 [object-position:60%_50%] xl:[object-position:55%_0%]"
            />
          </Link>
          <div className="flex flex-col gap-5 xl:gap-6 w-[75%]">
            <div className="flex gap-5 xl:gap-6">
              <Link
                href={linkLatines}
                className="h-[190px] lg:h-[215px] xl:h-[237px] w-[60%] lg:w-[70%] relative rounded-xl overflow-hidden group hover:scale-[1.02] transition-all duration-200"
              >
                <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-cyan-500 text-4xl xl:text-5xl xl:w-full font-bold z-10 text-center transition-colors duration-300">
                  LATINES
                </h4>
                <Image
                  src={imageLatines}
                  alt="Cover Afro Beats"
                  width={widthLatines}
                  height={heightLatines}
                  className="h-full object-cover rounded-2xl brightness-50 [object-position:40%_50%] xl:[object-position:55%_50%]"
                />
              </Link>
              <Link
                href={linkAfroBeats}
                className="h-[190px] lg:h-[215px] xl:h-[237px] w-[40%] lg:w-[30%] relative rounded-xl overflow-hidden group hover:scale-[1.02] transition-all duration-200"
              >
                <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-indigo-500 text-4xl xl:text-5xl xl:w-full font-bold z-10 text-center transition-colors duration-300">
                  AFRO BEATS
                </h4>
                <Image
                  src={imageAfroBeats}
                  alt="Cover Afro Beats"
                  width={widthAfroBeats}
                  height={heightAfroBeats}
                  className="h-full object-cover rounded-2xl brightness-50 [object-position:50%_50%] xl:[object-position:55%_50%]"
                />
              </Link>
            </div>
            <div className="flex gap-5 xl:gap-6">
              <Link
                href={linkElectro}
                className="h-[190px] lg:h-[215px] xl:h-[237px] w-[40%] lg:w-[30%] relative rounded-xl overflow-hidden group hover:scale-[1.02] transition-all duration-200"
              >
                <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-rose-500 text-[32px] lg:text-[28px] xl:text-5xl xl:w-full font-bold z-10 text-center transition-colors duration-300">
                  ELECTRO
                </h4>
                <Image
                  src={imageElectro}
                  alt="Cover Afro Beats"
                  width={widthElectro}
                  height={heightElectro}
                  className="h-full object-cover rounded-2xl brightness-50 [object-position:40%_20%] xl:[object-position:55%_50%]"
                />
              </Link>
              <Link
                href={linkKpop}
                className="h-[190px] lg:h-[215px] xl:h-[237px] w-[60%] lg:w-[70%] relative rounded-xl overflow-hidden group hover:scale-[1.02] transition-all duration-200"
              >
                <h4 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-greenColorSecondary group-hover:text-fuchsia-500 text-4xl xl:text-5xl xl:w-full font-bold z-10 text-center transition-colors duration-300">
                  K-POP
                </h4>
                <Image
                  src={imageKpop}
                  alt="Cover Afro Beats"
                  width={widthKpop}
                  height={heightKpop}
                  className="h-full object-cover rounded-2xl brightness-50 [object-position:40%_50%] xl:[object-position:55%_25%]"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
