import ListGenres from "@/components/classements/ListGenres";
import React from "react";

export default function ClassementsMorceaux() {
  return (
    <div className="min-h-screen px-8 mb-40">
      <div className="mt-48 lg:mt-52 xl:mt-56">
        <ListGenres
          title="morceaux"
          imageRapFr={"/HomePageMedia/rap_cover.jpg"}
          imagePop={"/HomePageMedia/pop_cover.jpg"}
          imageJazz={"/HomePageMedia/jazz_cover.jpg"}
          imageRapUs={"/ClassementsMedia/cover_rap_us.png"}
          imageRnb={"/HomePageMedia/r&b_cover.jpg"}
          imageLatines={"/ClassementsMedia/latines_cover.png"}
          imageRock={"/ClassementsMedia/rock_cover.png"}
          imageElectro={"/ClassementsMedia/electro_cover.jpg"}
          imageKpop={"/ClassementsMedia/kpop_cover.webp"}
          imageAfroBeats={"/HomePageMedia/afro_beats_cover.jpg"}
          linkRapFr={"/classements/morceaux/rap-fr"}
          linkPop={"/classements/morceaux/pop"}
          linkJazz={"/classements/morceaux/jazz"}
          linkRapUs={"/classements/morceaux/rap-us"}
          linkRnb={"/classements/morceaux/r&b"}
          linkLatines={"/classements/morceaux/latines"}
          linkRock={"/classements/morceaux/rock"}
          linkElectro={"/classements/morceaux/electro"}
          linkKpop={"/classements/morceaux/kpop"}
          linkAfroBeats={"/classements/morceaux/afro-beats"}
          widthRapFr={1170}
          heightRapFr={1755}
          widthPop={660}
          heightPop={800}
          widthJazz={1507}
          heightJazz={2137}
          widthRapUs={1500}
          heightRapUs={844}
          widthRnb={640}
          heightRnb={640}
          widthLatines={1300}
          heightLatines={731}
          widthRock={640}
          heightRock={640}
          widthElectro={3600}
          heightElectro={2705}
          widthKpop={2560}
          heightKpop={1440}
          widthAfroBeats={1900}
          heightAfroBeats={1900}
        />
      </div>
    </div>
  );
}
