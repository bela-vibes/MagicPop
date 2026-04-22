
import { Project, Language } from './types';

export const TRANSLATIONS = {
  de: {
    nav: {
      whatWeDo: "Was wir tun",
      projects: "Projekte",
      studio: "About",
      contact: "Kontakt",
      inquire: "Anfragen"
    },
    hero: {
      subline: "studio für",
      sublineBold: "räume, objekte und geschichten",
      location: "Standort Berlin",
      est: "Seit 2024"
    },
    whatWeDo: {
      title: "Was wir tun",
      subtitle: "Vision mit Handwerk verschmelzen.",
      services: [
        { title: "Set & Spatial Design", desc: "Wir gestalten Räume, die wirken. Ob Filmset, Markenwelt oder privates Interieur. Uns interessiert, wie sich ein Raum anfühlt, nicht nur wie er aussieht. Wir denken in Materialien, Licht und Proportionen und bauen daraus Atmosphären, die eine eigene Präsenz haben. Jeder Raum folgt einer klaren Idee und entwickelt daraus seine Wirkung." },
        { title: "Concept & Direction", desc: "Am Anfang steht eine Idee, die mehr ist als nur ein Bild. Wir entwickeln Konzepte und führen sie weiter, bis sie tragfähig sind. Dabei greifen Vision, Identität und Umsetzung ineinander und formen eine klare gestalterische Linie. So entstehen Arbeiten, die sich stimmig anfühlen und in sich geschlossen funktionieren." },
        { title: "Production & Execution", desc: "Gute Ideen brauchen eine saubere Umsetzung. Wir planen, organisieren und realisieren Projekte über alle Phasen hinweg. Dabei behalten wir Prozesse, Teams und Details im Blick und sorgen dafür, dass alles zusammenpasst. Am Ende geht es darum, dass alles so zusammenkommt, wie es gedacht war." }
      ]
    },
    projects: {
      title: "Projekte",
      description: "Fahre über die Liste, um mehr zu entdecken.",
      viewProject: "Projekt ansehen",
      detailLabel: "Projektdetail",
      nextProject: "Nächstes Projekt",
      details: "Details",
      featured: "Highlights",
      archive: "Archiv",
      backToProjects: "Zurück zur Übersicht"
    },
    studio: {
      title: "About Us",
      subtitle: "Analoge Handarbeit trifft auf digitale Neugier.",
      p1: "Wir sind Dennis und Bela.",
      p2: "Als Duo hinter Magic Pop entwickeln wir Ideen und setzen sie visuell um. Uns geht es darum, aus Konzepten etwas zu machen, das man sehen und spüren kann. Wir arbeiten an Art Direction, Set Design und Interiors, bauen Requisiten und realisieren Foto- und Videoproduktionen.",
      startProject: "Melde Dich"
    },
    contact: {
      title: "Lass es poppen",
      subtitle: "Schreib uns, sag hallo.",
      emailLabel: "E-Mail uns",
      followLabel: "Folge uns",
      footerNote: "Bereit, deine Ideen in etwas Magisches zu verwandeln?",
      impressum: "Impressum",
      privacy: "Datenschutz"
    }
  },
  en: {
    nav: {
      whatWeDo: "what we do",
      projects: "projects",
      studio: "about",
      contact: "contact",
      inquire: "inquire"
    },
    hero: {
      subline: "studio for",
      sublineBold: "spaces, objects and stories",
      location: "Located in Berlin",
      est: "est. 2024"
    },
    whatWeDo: {
      title: "What We Do",
      subtitle: "Merging vision with craft.",
      services: [
        { title: "Set & Spatial Design", desc: "We create spaces that have presence. Whether it is a film set, a brand environment, or a private interior, we focus on how a space feels, not just how it looks. We work with material, light, and proportion to build atmospheres that hold their own. Each space grows from a clear idea and develops its impact from there." },
        { title: "Concept & Direction", desc: "Every project starts with an idea that goes beyond the image. We develop concepts and carry them forward until they hold. Vision, identity, and execution are treated as one continuous line, shaping a clear direction. The result feels coherent and fully resolved." },
        { title: "Production & Execution", desc: "A strong idea needs a precise execution. We plan, structure, and deliver projects across all phases. Teams, processes, and details are aligned so everything connects. In the end, it's all about everything coming together as planned." }
      ]
    },
    projects: {
      title: "Projects",
      description: "Hover the list to discover more.",
      viewProject: "View Project",
      detailLabel: "Project Detail",
      nextProject: "Next Project",
      details: "Details",
      featured: "Featured",
      archive: "Archive",
      backToProjects: "Back to projects"
    },
    studio: {
      title: "About Us",
      subtitle: "Analog craftsmanship meets digital curiosity.",
      p1: "Dennis and Bela, the duo behind Magic Pop, bring a unique blend of creativity and expertise to combine creative direction and visual execution.",
      p2: "With a shared passion for storytelling and a keen eye for detail, they have transformed countless concepts into stunning visual experiences. Their combined talents span a wide range of services, including art direction, set design, interior creation, prop fabrication, and photo and video production.",
      startProject: "Get in touch"
    },
    contact: {
      title: "Let's Pop",
      subtitle: "Drop a line, say hi.",
      emailLabel: "Email Us",
      followLabel: "Follow Us",
      footerNote: "Ready to transform your ideas into something truly magical?",
      impressum: "Legal Notice",
      privacy: "Privacy Policy"
    }
  }
};

export const PROJECTS: Project[] = [
    {
    id: 1,
    slug: "suite-1973",
    title: { de: "Suite 1973", en: "Suite 1973" },
    category: { de: "Interior Design", en: "Interior Design" },
    description: {
      de: "Eine Wohnung als Zeitkapsel, irgendwo zwischen DDR Alltag und Space Age.\n\nAm Anfang stand ein glatter weißer Neubau. Der Wunsch war schnell klar. Keine ironische Referenz, sondern ein echtes Eintauchen in die 70er. Wir wollten dem Raum nicht einfach einen Stil geben, sondern ihm eine Geschichte hinzufügen, die vorher noch nicht da war. Dafür haben wir mit echten Materialien gearbeitet. Holz, Stein, Oberflächen mit Gewicht. Gleichzeitig entstand ein klares Farbsystem, das sich durch die gesamte Wohnung zieht. Alles greift ineinander, ohne beliebig zu wirken.\n\nViele Möbel und Objekte haben wir gemeinsam mit dem Kunden recherchiert und zusammengetragen. Ergänzt wurde das Ganze durch maßgefertigte Einbauten wie Bett und Badezimmerschränke. Für Details wie Bilderrahmen haben wir eigene Lösungen entwickelt und sie im Stil der Zeit neu produziert. Kunstpalmen im Innenraum und auf dem Balkon setzen bewusste Akzente. Am Ende wirkt die Wohnung nicht wie ein Set, sondern wie ein Ort, der schon lange existiert. Authentisch, aber trotzdem stylisch und gemütlich. Gestaltet, aber gelebt.\n\nFotografie: Maike Piorr",
      en: "An apartment as a time capsule, somewhere between everyday GDR life and the space age.\n\nIt started as a clean white new-build. The intention became clear quickly. Not an ironic reference, but a real immersion into the 70s. We did not want to simply give the space a style, but to add a sense of history that was not there before.We worked with real materials. Wood, stone, surfaces with weight. At the same time, a clear color system emerged that runs throughout the entire apartment. Everything connects without feeling arbitrary.\n\nMany of the furniture pieces and objects were researched and sourced together with the client. This was complemented by custom-built elements such as the bed and bathroom cabinets. For details like picture frames, we developed our own solutions and reinterpreted them in the spirit of the time. Artificial palm trees, placed both inside and on the balcony, create deliberate accents. In the end, the apartment does not feel like a set, but like a place that has existed for a long time. Authentic, yet still stylish and cozy. Designed, but lived in.\n\nPhotography: Maike Piorr"
    },
    year: "2025",
    image: "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775468820/060625_SonyMusic-0005_144dpi_SCREEN_onbmjr.jpg",
    gallery: ["https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775468829/060625_SonyMusic-0112_144dpi_SCREEN_ug76wg.jpg",
              "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775653742/060625_SonyMusic-0324_144dpi_SCREEN_uk7ozb.jpg",
              "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775468820/060625_SonyMusic-0005_144dpi_SCREEN_onbmjr.jpg",
              "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775468828/250606_SonyMusic_0830_144dpi_SCREEN_qz2sno.jpg",
              "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775468823/060625_SonyMusic-0541_144dpi_SCREEN_ozg3xe.jpg",
              "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775468826/060625_SonyMusic-0623_144dpi_SCREEN_mwepyt.jpg",
              "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775468826/060625_SonyMusic-0684_144dpi_SCREEN_fzxc4j.jpg",
              "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775653597/060625_SonyMusic-0312_144dpi_SCREEN_zj5gqc.jpg",
              "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775468824/060625_SonyMusic-0559_144dpi_SCREEN_ycg5r1.jpg",
              "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775719332/060625_SonyMusic-0714_144dpi_SCREEN_fkwwv1.jpg"
              ],
    color: "bg-orange-500"
  },
  {
  id: 2,
  slug: "loqi", // Gefixt: Gerade Anführungszeichen
  title: { de: "LOQI", en: "LOQI" },
  category: { de: "Fotoproduktion", en: "Photo Production" },
  description: {
    de: "Taschen mit Haltung.\n\nFür LOQI haben wir Bildwelten für eine neue Generation vielseitiger Taschen entwickelt. Jede Tasche bringt eine eigene Persönlichkeit mit, die wir nicht überformen wollten, sondern sichtbar machen. Statt eines einheitlichen Looks haben wir mit wiederkehrenden Prinzipien gearbeitet. Klare Sets, die sich an die jeweilige Tasche anpassen. Materialität, Farbe und Kontext greifen ineinander und geben jeder Szene ihren eigenen Ton, ohne die Gesamtserie zu verlieren.\n\nNeben der visuellen Konzeption lag die gesamte technische Umsetzung bei uns. So entsteht eine Serie, die flexibel bleibt und trotzdem konsistent wirkt. Die Taschen stehen im Mittelpunkt, jedes für sich, und funktionieren gleichzeitig als Teil eines größeren Ganzen.",
    en: "Bags with character.\n\nFor LOQI, we developed a visual language for a new range of versatile bags. Each piece comes with its own personality, which we chose to reveal rather than override. Instead of forcing a single look, we worked with a set of recurring principles. Clear, composed sets that adapt to each bag. Materiality, color, and context interact to give every scene its own tone, while still holding the series together.\n\nAlongside the visual concept, we handled the full technical production. The result is a series that remains flexible yet consistent. Each bag stands on its own, while contributing to a larger whole."
  },
  year: "2025", // Gefixt: Gerade Anführungszeichen
  image: "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_1600/v1775379704/LOQI_Rolex_Shanghai_1_gfmomc.jpg",
  gallery: [
    "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775379704/LOQI_Rolex_Shanghai_1_gfmomc.jpg",
    "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775379798/250807_LOQI_TravelRetail_Banner_dvuadv.jpg",
    "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775380120/Weekender_together_wloaor.jpg",
    "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775379766/250807_LOQI_TravelRetail_Katjes2_rohnmt.jpg",
    "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/v1775379932/LOQI-Coffee-Bag-Gif_hpcg8r.gif",
    "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775379984/LOQI_BKR_10_znnouz.jpg",
    "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/v1775654447/250807_LOQI_TravelRetail_Osborne_gebv2b.jpg",
    "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775380197/FuturePresent_4x5_new_kexboa.jpg",
    "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775379685/LOQI_Rolex_Shanghai_3_mpydts.jpg",
    "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775380316/LOQI_BKR_1_Kopie_small_srtze4.jpg"
    
  ],
  color: "bg-yellow-400"
},
   {
    id: 3,
    slug: "nachtzimmer",
    title: { de: "Nacht\u00ADzimmer", en: "Nacht\u00ADzimmer" },
    category: { de: "Fotoproduktion", en: "Photo Production" },
    description: {
      de: "Ein Raum erzählt seine Geschichten.\n\n„Nachtzimmer“ ist eine freie Fotoserie über Momente, die man nicht ganz greifen kann. Die Bilder spielen in einer filmischen Welt, irgendwo zwischen Americana und einem stillen Hotelzimmer. Jede Szene wirkt wie ein Ausschnitt, der mehr andeutet, als er zeigt.\n\nEs sind insgesamt 25 Motive entstanden, die jeweils für sich funktionieren und trotzdem eine gemeinsame Stimmung tragen. Inspiriert von altem Hollywood-Glamour, aber bewusst reduziert und leicht entrückt. Die Geschichten entstehen in den Bildern selbst, nicht durch Erklärung. Für jede Szene haben wir eigene Farbwelten, Kostüme sowie Haar und Make-up entwickelt. Die Sets wurden real gebaut, das Licht gezielt gesetzt und Requisiten individuell gefertigt, darunter auch Tier-Repliken.",
      en: "A room tells its stories.\n\n“Nachtzimmer” is a self-initiated photo series about moments that are hard to fully grasp. The images exist in a cinematic world, somewhere between Americana and the stillness of a hotel room. Each scene feels like a fragment, suggesting more than it reveals.\n\nThe series consists of 25 images, each standing on its own while sharing a common atmosphere. Inspired by old Hollywood glamour, yet intentionally reduced and slightly surreal. The stories live within the images themselves, not in their explanation. For each scene, we developed individual color worlds, costumes, as well as hair and makeup. The sets were built physically, lighting was carefully placed, and props were custom-made, including lifelike animal replicas."
    },
    year: "2017",
    image: "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_1600/v1773247550/02_-_Fisch_q9rvsk.jpg",
    gallery: [
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773294351/Nachtzimmer0_MagicPop2024.jpg_ylyg9j.webp",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773261659/08---Mermaid_bk4obw.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773247550/02_-_Fisch_q9rvsk.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773247550/11_-_Kedi_sienok.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773293311/07_-_Koffer_mvfu6e.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773247551/14_-_Circus_slbpcz.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773247468/benny_3_Kopie_ufsdlm.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773247509/mariamagdalena_Kopie_taojlr.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773247510/spies_Kopie_lttwm9.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773247515/lowe_2_Kopie_xqmf6g.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773247514/hexenfinal_Kopie_gn2dvb.jpg"
    ],
    color: "bg-red-600"
  },
{
    id: 8,
    slug: "momox",
    title: { de: "Momox", en: "Momox" },
    category: { de: "Videoproduktion", en: "Video Production" },
    description: {
    de: "Monochrome Klarheit, Schicht für Schicht entwickelt.\n\nFür den visuellen Auftritt von Momox haben wir die komplette Produktion umgesetzt und die Bildwelt räumlich aufgebaut. Ausgangspunkt war das neue Momox-Blau, das sich als verbindendes Element durch alle Motive zieht.\n\nDie Herausforderung lag darin, für jede Kategorie eigenständige Still-Life-Settings zu entwickeln, die klar funktionieren und gleichzeitig Teil eines größeren Ganzen bleiben. Statt Vielfalt zu inszenieren, haben wir innerhalb einer reduzierten Farbwelt gearbeitet und Tiefe über Material, Form und Komposition erzeugt. Neben der Produktion haben wir das Set Design vollständig entwickelt und umgesetzt. Dazu gehörte auch die gezielte Entwicklung und Auswahl von Requisiten. Ob Controller, Brillen oder andere Objekte, jedes Element wurde bewusst eingesetzt oder eigens gestaltet, um den Fokus klar auf Produkt und Kategorie zu lenken.\n\nAgentur: I LIKE VISUALS",
    en: "Monochrome clarity, built layer by layer.\n\nFor Momox, we executed the full production and built the visual world in space. The starting point was the new Momox blue, which acts as a unifying element across all images.\n\nThe challenge was to create distinct still life settings for each category while keeping them part of a cohesive whole. Rather than staging variety, we worked within a reduced color palette, building depth through material, shape, and composition. Alongside the production, we developed and executed the full set design. This also included creating and selecting props. From controllers to glasses and other objects, each element was carefully chosen or custom-made to clearly frame the product and its category.\n\nAgency: I LIKE VISUALS"
    },
    year: "2025",
    image: "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/v1775553750/250120_FL_Alle_Momox_ILV_3_i4phy8.jpg",
    gallery: [
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775472374/250120_4Arms_Momox_ILV_anpivr.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775472375/250120_DVD_Momox_ILV_qayaha.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/video/upload/q_auto/f_auto/v1775552395/YTDown.com_YouTube_Media_H4JC6hoojk4_001_1080p_makei5.mp4",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775552774/250120_buch_Momox_ILV_occ6il.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775552774/250120_vinyl_Momox_ILV_sbkdil.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775553750/250120_FL_Alle_Momox_ILV_3_i4phy8.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775552774/250120_game_Momox_ILV_pspj2v.jpg"
      
    ],
    color: "bg-orange-500"
  },
 
 
  {
    id: 6,
    slug: "bite-away",
    title: { de: "Bite Away", en: "Bite Away" },
    category: { de: "Set Design", en: "Set Design" },
    description: {
      de: "Juckt Mich Nicht!\n\nFür die Kampagne „Juckt Mich Nicht!“ von Dermapharm haben wir das Set Design für einen Werbefilm entwickelt und umgesetzt. Im Zentrum steht eine Familie, deren Umgang mit Mückenschutz langsam ins Absurde kippt.\n\nWir haben sechs eigenständige Sets entworfen und gebaut, die zusammen eine geschlossene Welt bilden. Räume, die auf den ersten Blick vertraut wirken, sich aber leicht verschieben. Jede Szene folgt ihrer eigenen Logik, ohne beliebig zu werden. Gedreht wurde innerhalb von zwei Tagen. Jedes Set wurde wie ein eigener Charakter behandelt, mit eigener Farbwelt und eigener Intensität. Kostüme und Requisiten greifen ineinander und verstärken die leicht überdrehte Realität.\n\nAgentur: I LIKE VISUALS",
      en: "Juckt Mich Nicht!\n\nFor Dermapharm’s “Juckt Mich Nicht!” campaign (eng. „Don't Bother Me!”), we developed and executed the set design for a commercial centered around a family whose approach to mosquito protection slowly drifts into the absurd.\n\nWe designed and built six distinct sets that together form a coherent world. Spaces that feel familiar at first, yet slightly off. Each scene follows its own logic without becoming arbitrary.The shoot was completed over two days. Each set was treated as a character, with its own color palette and level of intensity. Costumes and props interact, reinforcing the slightly heightened reality.\n\nAgency: I LIKE VISUALS"
    },
    year: "2024",
    image: "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/v1775457438/Bildschirmfoto_2024-04-29_um_09.46.40.png_oggl6i.webp",
    gallery: ["https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775457439/Bildschirmfoto_2024-04-29_um_09.47.07.png_o0xgqk.webp",
             "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775457437/Bildschirmfoto_2024-04-29_um_09.46.10.png_ql21ep.webp",
             "https://res.cloudinary.com/dpe3jvf3e/video/upload/v1775458767/YTDown.com_YouTube_bite-away-Insektenstich-Juckt-mich-nicht_Media_1s06Wkf_Q6U_001_1080p_g96cmk.mp4",
             "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775457440/Bildschirmfoto_2024-04-29_um_09.46.26.png_fcivma.webp"],
    videoPosters: {"https://res.cloudinary.com/dpe3jvf3e/video/upload/v1775458767/YTDown.com_YouTube_bite-away-Insektenstich-Juckt-mich-nicht_Media_1s06Wkf_Q6U_001_1080p_g96cmk.mp4": "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/v1775457438/Bildschirmfoto_2024-04-29_um_09.46.40.png_oggl6i.webp"},
    color: "bg-yellow-400"
  },
     {
    id: 5,
    slug: "suitcase",
    title: { de: "Suitcase", en: "Suitcase" },
    category: { de: "Set Design", en: "Set Design" }, // Ich habe "Props" zu "Set Design" geändert (strategischer)
    description: {
      de: "Alles echt gebaut.\n\nFür das Musikvideo „Suitcase“ von Ameli in the Woods haben wir in Zusammenarbeit mit Amores Production die visuelle Umsetzung eng begleitet und mitgestaltet.\n\nDas Video bewegt sich zwischen späten 90ern und frühen 2000ern und greift die rohe, leicht unheimliche Ästhetik dieser Zeit auf. Entscheidend war dabei der analoge Ansatz. Effekte wie Zombie-Make-up, mechanische Herzen und projizierte Hintergründe wurden physisch umgesetzt und direkt am Set entwickelt. Wir haben an vielen Ebenen der Umsetzung mitgearbeitet, von der Gestaltung der Szenen über Requisiten und Kostüm bis hin zur Arbeit am Licht. Statt einzelne Gewerke zu trennen, entstand so ein durchgehender visueller Zusammenhang. Das Licht und die Farbwelt greifen die Referenzen der Zeit auf und führen sie weiter. Leicht überzeichnet, aber bewusst gesetzt. So entsteht ein Look, der vertraut wirkt und gleichzeitig eine eigene Stimmung entwickelt.\n\nBand: Ameli in the Woods & Produktion: Amores Production",
      en: "Everything built for real.\n\nFor the music video “Suitcase” by Ameli in the Woods, we collaborated closely with Amores Production and contributed across the visual execution.\n\nThe video draws from the late 90s and early 2000s, capturing the raw and slightly eerie aesthetic of that era. A key aspect was the analog approach. Effects such as zombie makeup, mechanical hearts, and projected backgrounds were created physically and developed on set. We were involved across multiple layers of the process, from shaping the scenes to props, costume, and lighting. Rather than separating disciplines, the work was approached as one continuous visual system. Lighting and color build on the references of the time while pushing them slightly further. The result is a look that feels familiar, yet carries its own atmosphere.\n\nBand: Ameli in the Woods & Production: Amores Production"
    },
    year: "2023",
    image: "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775420840/Bildschirmfoto_2026-04-05_um_22.26.25_oxn9ne.png",
    gallery: ["https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775420863/Bildschirmfoto_2026-04-05_um_22.26.13_kgvhnw.png",
              "https://res.cloudinary.com/dpe3jvf3e/image/upload/v1775457660/ezgif-1bdb65971b5e9ce5_xb4jej.gif",
              "https://res.cloudinary.com/dpe3jvf3e/video/upload/v1773394785/2023-magic-pop-production-set-design-props-suitcase-ameli-in-the-woods-amores-production_ike2mz.mp4"],
     videoPosters: {"https://res.cloudinary.com/dpe3jvf3e/video/upload/v1773394785/2023-magic-pop-production-set-design-props-suitcase-ameli-in-the-woods-amores-production_ike2mz.mp4": "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775421343/Bildschirmfoto_2026-04-05_um_22.35.29_l9wxuf.png"},
    color: "bg-magic-blue"
  },
  {
    id: 4,
    slug: "hana",
    title: { de: "HANA", en: "HANA" },
    category: { de: "Interior Design", en: "Interior Design" },
    description: {
      de: "Ein Ort zwischen zwei Welten.\n\nFür HANA Berlin im Berlin Hilton haben wir das bestehende Interieur weiterentwickelt und an das neue Restaurantkonzept angepasst. Ausgangspunkt war ein japanisch mediterraner Ansatz, der sich auch im Raum widerspiegeln sollte. Der Ort hatte bereits eine klare Farbwelt, an die wir bewusst angeknüpft haben. Unser Ziel war es, diese Basis zu erhalten und gleichzeitig beide Einflüsse zusammenzubringen. Japanische Ruhe und Reduktion treffen auf mediterrane Wärme und Materialität.\n\nWir haben mit neuen Texturen, Farben und ausgewählten Elementen gearbeitet, ohne den Charakter des Raums zu verlieren. Dabei war es uns wichtig, dass sich das HANA stimmig in die bestehenden Locations des Kunden einfügt und als Teil einer größeren gestalterischen Linie funktioniert. So ist ein Raum entstanden, der sich vertraut anfühlt und gleichzeitig eine eigene Atmosphäre entwickelt. Ruhig, warm und klar. Gestaltet, ohne überladen zu wirken.\n\nFotografiert von Steffen Sinzinger",
      en: "A space between two worlds.\n\nFor HANA Berlin at the Berlin Hilton, we further developed the existing interior and aligned it with the new restaurant concept. The starting point was a Japanese Mediterranean fusion, which we wanted to translate into the space. The location already came with a defined color palette, which we chose to build on rather than replace. Our goal was to bring both influences together within that framework. Japanese calm and reduction meet Mediterranean warmth and materiality.\n\nWe introduced new textures, colors, and selected elements while preserving the character of the space. It was important that HANA feels consistent with the client’s other locations and works as part of a larger design language. The result is a space that feels familiar, yet distinct. Calm, warm, and clear. Designed without feeling overloaded.\n\nPhotographed by Steffen Sinzinger"
    },
    year: "2024",
    image: "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773296846/HANA_-_Interior_-_c_Steffen_Sinzinger_Content_Communication_-_241102_-1_uiplwp.jpg",
    gallery: [
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773296846/HANA_-_Exterior_-_c_Steffen_Sinzinger_Content_Communication_-_241102_-1_dtaliv.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773297077/HANA_-_Interior_-_Detail_-_c_Steffen_Sinzinger_Content_Communication_-_241102_-13_vsmruo.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773296846/HANA_-_Interior_-_c_Steffen_Sinzinger_Content_Communication_-_241102_-1_uiplwp.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773296852/HANA_-_Interior_-_Detail_-_c_Steffen_Sinzinger_Content_Communication_-_241102_-19_mikqon.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773296849/HANA_-_Interior_-_Detail_-_c_Steffen_Sinzinger_Content_Communication_-_241102_-3_mrjnhd.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773296849/HANA_-_Interior_-_c_Steffen_Sinzinger_Content_Communication_-_241102_-10_zjrcsr.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773296848/HANA_-_Interior_-_c_Steffen_Sinzinger_Content_Communication_-_241102_-3_zrias3.jpg"
    ],
    color: "bg-pink-400"
  },
   {
    id: 7,
    slug: "endspiel",
    title: { de: "ENDSPIEL", en: "ENDSPIEL" },
    category: { de: "Set Design", en: "Set Design" },
    description: {
      de: "Für den Kurzfilm Endspiel erschuf MagicPOP eine dystopische Welt, die das Publikum tief in den Überlebenskampf des Protagonisten hineinzieht.\n\nDas visuelle Design spielt eine zentrale Rolle dabei, die Atmosphäre von Isolation, Verfall und der Suche nach Hoffnung greifbar zu machen. Von der verlassenen Stadt, in der leere Gebäude und überwucherte Straßen den wirtschaftlichen Niedergang widerspiegeln, bis hin zum dunklen Wald, der zugleich Zuflucht und Bedrohung darstellt – jedes Detail ist so gestaltet, dass die Isolation und Spannung spürbar werden.\n\nBesonderes Augenmerk wurde auf das Szenenbild gelegt: Im verlassenen Haus verschmelzen Staub, Chaos und persönliche Relikte zu einem beklemmenden Setting, das auf längst vergangene Leben hindeutet. Jedes zerbrochene Fenster und jede verlassene Ecke vertieft die unheimliche Atmosphäre.\n\ndirected by Dre Amiro & Anna Mochow",
      en: "For the short film Endspiel, MagicPOP created a dystopian world that draws the audience deep into the protagonist's struggle for survival.\n\nThe visual design plays a central role in making the atmosphere of isolation, decay, and the search for hope tangible. From the abandoned city, where empty buildings and overgrown streets reflect the economic downfall, to the dark forest, which serves as both a refuge and a threat—every detail is crafted to make the isolation and tension noticeable.\n\nSpecial attention was given to interior design: In the abandoned house, dust, chaos, and personal relics merge into an oppressive setting that hints at lives long gone. Every broken window and every deserted corner deepens the eerie atmosphere.\n\ndirected by Dre Amiro & Anna Mochow"
    },
    year: "2024",
    image: "https://res.cloudinary.com/dpe3jvf3e/image/upload/v1773390417/2024-magic-pop-setdesign-endspiel-hero_h41buh.jpg",
    gallery: [
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773390422/2024-magic-pop-setdesign-endspiel-interior-3_gauhkz.png",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773390419/2024-magic-pop-setdesign-endspiel-outdoor_lzri8u.png",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773390422/2024-magic-pop-setdesign-endspiel-art-direction_txo5vw.png",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773390421/2024-magic-pop-setdesign-endspiel-interior_o0htej.png",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773390418/2024-magic-pop-setdesign-endspiel-interior-4_gfeidc.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1773390421/2024-magic-pop-setdesign-endspiel-interior-2_iv6y1h.png"
    ],
    color: "bg-zinc-900"
  }

];
