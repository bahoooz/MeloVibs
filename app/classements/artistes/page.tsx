import ListMusicGenres from "@/components/classements/ListGenres";
import React from "react";

export default function ClassementsArtistes() {
  return (
    <div className="min-h-screen px-8 mb-40">
      <div className="mt-48 lg:mt-52 xl:mt-56">
        <ListMusicGenres
          title="artistes"
          imageRapFr={"/ClassementsMedia/artist_rap_fr_cover.jpg"}
          imagePop={"/ClassementsMedia/artist_pop_cover.jpeg"}
          imageJazz={"/ClassementsMedia/artist_jazz_cover.jpg"}
          imageRapUs={"/ClassementsMedia/artist_rap_us_cover.jpeg"}
          imageRnb={"/ClassementsMedia/artist_r&b_cover.jpg"}
          imageLatines={"/ClassementsMedia/artist_latines_cover.png"}
          imageRock={"/ClassementsMedia/artist_rock_cover.jpg"}
          imageElectro={"/ClassementsMedia/artist_electro_cover.jpg"}
          imageKpop={"/ClassementsMedia/artist_kpop_cover.webp"}
          imageAfroBeats={"/ClassementsMedia/artist_afro_beats_cover.jpg"}
          linkRapFr={"/classements/artistes/rap-fr"}
          linkPop={"/classements/artistes/pop"}
          linkJazz={"/classements/artistes/jazz"}
          linkRapUs={"/classements/artistes/rap-us"}
          linkRnb={"/classements/artistes/r&b"}
          linkLatines={"/classements/artistes/latines"}
          linkRock={"/classements/artistes/rock"}
          linkElectro={"/classements/artistes/electro"}
          linkKpop={"/classements/artistes/kpop"}
          linkAfroBeats={"/classements/artistes/afro-beats"}
          widthRapFr={747}
          heightRapFr={926}
          widthPop={4000}
          heightPop={2250}
          widthJazz={3000}
          heightJazz={3000}
          widthRapUs={1500}
          heightRapUs={844}
          widthRnb={1200}
          heightRnb={1200}
          widthLatines={1920}
          heightLatines={1270}
          widthRock={1400}
          heightRock={2101}
          widthElectro={2048}
          heightElectro={2560}
          widthKpop={1200}
          heightKpop={781}
          widthAfroBeats={744}
          heightAfroBeats={446}
        />
      </div>
    </div>
  );
}
