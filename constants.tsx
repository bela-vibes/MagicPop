
import { Project, Language } from './types';

export const CONTACT_EMAIL = "hello@magicpop.berlin";
export const CONTACT_PHONE = "+49 157 524 644 65";

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
      sublineBold1: "marken, räume und",
      sublineBold2: "geschichten",
      location: "Standort Berlin",
      est: "Seit 2024"
    },
    whatWeDo: {
      title: "Was wir tun",
      subtitle: "Vision mit Handwerk verschmelzen.",
      services: [
        { title: "Set & Spatial Design", subline: "Räume, die man erlebt.", desc: "Wir gestalten Sets, Interiors und temporäre Räume: ob Filmset, Markenwelt oder privates Interieur. Von radikalen Transformationen bis zu fein abgestimmten Details gestalten wir eine klare visuelle Welt mit Charakter. Material, Licht und Farbe greifen ineinander und schaffen echte Erlebnisse." },
        { title: "Concept & Direction", subline: "Ideen, die Projekte tragen.", desc: "Wir arbeiten uns tief in jede Thematik ein, ob Räume, Produkte, Gestaltung oder kreatives Marketing. Wir entwickeln visuelle Strategien und Lösungen, die ästhetisch überzeugen, funktionieren und zur jeweiligen Nische passen. Unsere Konzeption ist der Teil, der Qualität, Wirkung und Umsetzung bestimmt." },
        { title: "Production & Execution", subline: "Genau umgesetzt.", desc: "Wir planen, organisieren und realisieren Projekte über alle Phasen hinweg. Dabei behalten wir Qualität, Budget und Zeit im Blick und sorgen dafür, dass alle Stränge zusammenführen. So werden aus Ideen reale Ergebnisse, die genauso funktionieren wie sie gedacht sind." }
      ]
    },
    projects: {
      title: "Projekte",
      description: "Was wir gebaut, gestaltet und umgesetzt haben.",
      viewProject: "Projekt ansehen",
      detailLabel: "Projektdetail",
      nextProject: "Nächstes Projekt",
      details: "Details",
      featured: "Alle Projekte",
      archive: "Archiv",
      backToProjects: "Zurück zur Übersicht"
    },
    studio: {
      title: "About Us",
      subtitle: "Analoge Handarbeit trifft auf digitale Neugier.",
      p1: "Magic Pop ist ein Berliner Studio an der Schnittstelle von Interior, Set Design und Creative Production. Wir arbeiten mit Brands, gestalten Räume und lieben Projekte mit Anspruch.",
      p2: "Unsere Arbeit beginnt mit einer Idee und endet erst, wenn sie vollständig erlebbar ist. Dabei verbinden wir räumliches Denken, visuelle Klarheit und ein starkes Gespür für Atmosphäre zu Ergebnissen, die Marken auf ein neues Level heben. Gegründet von Dennis und Béla, vereint Magic Pop handwerkliche Präzision mit technischem Verständnis und konzeptioneller Stärke. Was uns verbindet, ist der Anspruch, aus Räumen funktionierende Welten zu entwickeln.",
      startProject: "Anfrage senden"
    },
    contact: {
      title: "Lass es poppen",
      subtitle: "Schreib uns, sag hallo.",
      emailLabel: "E-Mail uns",
      followLabel: "Folge uns",
      footerNote: "Für Marken, Räume und Geschichten",
      replyTime: "Antwort innerhalb von 48h",
      location: "Berlin & europaweit",
      cta: "Anfrage senden",
      processTitle: "Unser Prozess",
      process: [
        { step: "01", title: "Anfrage senden", desc: "Sag uns, was du im Kopf hast." },
        { step: "02", title: "Kostenloses Erstgespräch", desc: "Wir finden heraus, ob es passt." },
        { step: "03", title: "Konzept & Umsetzung", desc: "Wir machen die Magic wahr." }
      ],
      trustTitle: "Menschen und Marken die uns vertrauen",
      footerNoteSmall: "Kostenloses Erstgespräch",
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
      sublineBold1: "brands, spaces and",
      sublineBold2: "stories",
      location: "Located in Berlin",
      est: "est. 2024"
    },
    whatWeDo: {
      title: "What We Do",
      subtitle: "Merging vision with craft.",
      services: [
        { title: "Set & Spatial Design", subline: "Spaces to experience", desc: "We design sets, interiors, and temporary spaces—whether film sets, brand environments, or private interiors. From radical transformations to finely tuned details, we create a distinct visual world with character. Materials, light, and color intertwine to create authentic experiences." },
        { title: "Concept & Direction", subline: "Ideas that drive projects.", desc: "We delve deeply into every subject, whether it involves spaces, products, design, or creative marketing. We develop visual strategies and solutions that are aesthetically compelling, effective, and tailored to each specific niche. Our conceptual approach is what determines the quality, impact, and execution of our work." },
        { title: "Production & Execution", subline: "Exactly as planned.", desc: "We plan, organize, and execute projects through every phase. Throughout the process, we keep a close eye on quality, budget, and timeline, ensuring that all elements come together seamlessly. This transforms ideas into tangible results that work exactly as intended." }
      ]
    },
    projects: {
      title: "Projects",
      description: "What we’ve built, designed, and brought to life.",
      viewProject: "View Project",
      detailLabel: "Project Detail",
      nextProject: "Next Project",
      details: "Details",
      featured: "All",
      archive: "Archive",
      backToProjects: "Back to projects"
    },
    studio: {
      title: "About Us",
      subtitle: "Analog craftsmanship meets digital curiosity.",
      p1: "Magic Pop is a Berlin-based studio at the intersection of interior design, set design, and creative production. We collaborate with brands, design spaces, and love challenging projects.",
      p2: "Our work begins with an idea and doesn’t end until it has been fully realized. We combine spatial thinking, visual clarity, and a strong sense of atmosphere to create results that elevate brands to a new level. Founded by Dennis and Béla, Magic Pop combines artisanal precision with technical expertise and conceptual strength. What unites us is our commitment to transforming spaces into functional worlds.",
      startProject: "Send request"
    },
    contact: {
      title: "Let's Pop",
      subtitle: "Drop a line, say hi.",
      emailLabel: "Email Us",
      followLabel: "Follow Us",
      footerNote: "For brands, spaces and stories",
      replyTime: "Reply within 48h",
      location: "Berlin & Europe-wide",
      cta: "Send Inquiry",
      processTitle: "Our Process",
      process: [
        { step: "01", title: "Send Inquiry", desc: "Tell us what's on your mind." },
        { step: "02", title: "Free consultation", desc: "We find out if we're a match." },
        { step: "03", title: "Concept & Execution", desc: "We make the magic happen." }
      ],
      trustTitle: "People and brands who trust us",
      footerNoteSmall: "Free Consultation",
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
    category: { de: "Interior", en: "Interior" },
    description: {
      de: "Eine Wohnung als Zeitkapsel, irgendwo zwischen DDR Alltag und Space Age.\n\nAm Anfang stand ein glatter weißer Neubau. Der Wunsch war keine simple Referenz, sondern ein echtes Eintauchen in die 70er. Wir wollten den Räumen nicht einfach einen Stil geben, sondern eine Geschichte, die vorher noch nicht da war. Dafür haben wir mit authentischen Materialien wie Holz, Stein und Glas gearbeitet. Gleichzeitig entstand ein klares Farbsystem, das sich durch die gesamte Wohnung zieht. Alles greift ineinander, ohne beliebig zu wirken.\n\nMöbel und Objekte haben wir in enger Zusammenarbeit mit dem Kunden recherchiert und zusammengetragen. Ergänzt wurde das Ganze durch maßgefertigte Einbauten wie Bett und Badezimmerschränke. Für Details wie Bilderrahmen haben wir eigene Lösungen entwickelt und sie im Stil der Zeit neu produzieren lassen. Palmen im Innenraum und auf dem Balkon setzen bewusste Akzente. Am Ende wirkt die Wohnung nicht nur eingerichtet, sondern wie ein Ort, der schon lange existiert. Authentisch, aber trotzdem stylisch und gemütlich. Gestaltet, aber gelebt.\n\nFotografie: Maike Piorr",
      en: "An apartment as a time capsule, somewhere between everyday GDR life and the space age.\n\nIt all started with a sleek, white new building. The request wasn’t just a simple reference, but a genuine immersion in the ’70s. We didn’t want to simply give the rooms a style, but a story that hadn’t been there before. To achieve this, we worked with authentic materials like wood, stone, and glass. At the same time, we developed a clear color scheme that runs throughout the entire apartment. Everything interlocks seamlessly, without feeling arbitrary.\n\nWe researched and curated furniture and objects in close collaboration with the client. The whole was complemented by custom-made built-ins such as the bed and bathroom cabinets. For details like picture frames, we developed our own solutions and had them reproduced in the style of the era. Palm trees inside and on the balcony add deliberate accents. In the end, the apartment doesn’t just look furnished; it feels like a place that has existed for a long time. Authentic, yet stylish and cozy. Designed, yet lived in.\n\nPhotography: Maike Piorr"
    },
    year: "2025",
    image: "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_800/v1777292150/IMG_8177_qrohh0.jpg",
    gallery: ["https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775468829/060625_SonyMusic-0112_144dpi_SCREEN_ug76wg.jpg",
              "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775653742/060625_SonyMusic-0324_144dpi_SCREEN_uk7ozb.jpg",
              "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775468820/060625_SonyMusic-0005_144dpi_SCREEN_onbmjr.jpg",
              "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775468828/250606_SonyMusic_0830_144dpi_SCREEN_qz2sno.jpg",
              "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775468823/060625_SonyMusic-0541_144dpi_SCREEN_ozg3xe.jpg",
              "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775468826/060625_SonyMusic-0623_144dpi_SCREEN_mwepyt.jpg",
              "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775468826/060625_SonyMusic-0684_144dpi_SCREEN_fzxc4j.jpg",
              "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775653597/060625_SonyMusic-0312_144dpi_SCREEN_zj5gqc.jpg",
              "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775719332/060625_SonyMusic-0714_144dpi_SCREEN_fkwwv1.jpg",
              "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_1400/v1775468824/060625_SonyMusic-0559_144dpi_SCREEN_ycg5r1.jpg"
              
              ],
    color: "bg-orange-500"
  },
  {
  id: 2,
  slug: "loqi", // Gefixt: Gerade Anführungszeichen
  title: { de: "LOQI", en: "LOQI" },
  category: { de: "Brands", en: "Brands" },
  description: {
    de: "Taschen mit Persönlichkeit.\n\nFür LOQI haben wir Bildwelten für das Produktsortiment entwickelt und umgesetzt. Jede Tasche bringt eine eigene Persönlichkeit mit, die wir nicht überformen wollten, sondern sichtbar machen. Statt eines einheitlichen Looks haben wir mit wiederkehrenden Prinzipien gearbeitet. Klare Sets, die sich an die jeweiligen Designs anpassen. Materialität, Farbe und Kontext greifen ineinander und geben jeder Szene ihren eigenen Charme und folgen trotzdem einer einheitlichen Ästhetik.\n\nDas Ergebnis ist eine Bildsprache, die flexibel bleibt. Neue Produkte, neue Kontexte, neue Saisons – die Welt, die wir gebaut haben, wächst mit.",
    en: "Bags with personality.\n\nFor LOQI, we developed and implemented visual concepts for the product range. Each bag has its own personality, which we didn’t want to overshadow, but rather bring to the forefront. Instead of a uniform look, we worked with recurring principles. Clean sets that adapt to the respective designs. Materiality, color, and context intertwine, giving each scene its own charm while still adhering to a consistent aesthetic.\n\nThe result is a visual language that remains flexible. New products, new contexts, new seasons—the world we’ve built grows with them."
  },
  year: "2025", // Gefixt: Gerade Anführungszeichen
  image: "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_800/v1775379704/LOQI_Rolex_Shanghai_1_gfmomc.jpg",
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
    category: { de: "Culture", en: "Culture" },
    description: {
      de: "Ein Zimmer erzählt seine Geschichten.\n\nFür unsere Fotoserie entwickelten wir eine visuelle Welt, die Momente erzählen, die man nicht ganz greifen kann. Diese Bilder entführen in eine filmische Ästhetik, inspiriert von Americana und fangen einzelne Szenen in einem Hotelzimmer ein, bei denen offen bleibt, was vorher oder nachher passiert ist.\n\nMit jedem Bild wird eine eigene Welt aufgemacht. Inspiriert von Old Hollywood-Glamour, surrealer Lichtsetzung und fantastischen Charakteren entstanden insgesamt 25 verschiedene Motive. Für jede Geschichte haben wir Farbwelt, Kostüm und Hair & Make-up neu gedacht. Die Sets wurden real gebaut, die Beleuchtung auf jede Szene abgestimmt, Requisiten – darunter auch naturgetreue Tiernachbildungen – selbst angefertigt. In der Post haben wir alles zusammengezogen und den Bildern ihren finalen Look gegeben.",
      en: "A room tells its stories.\n\nFor our photo series, we developed a visual world that captures moments you can’t quite grasp. These images transport the viewer into a cinematic aesthetic inspired by Americana, capturing individual scenes in a hotel room where it remains unclear what happened before or after.\n\nEach image opens up a world of its own. Inspired by Old Hollywood glamour, surreal lighting, and fantastical characters, a total of 25 different motifs were created. For each story, we reimagined the color palette, costumes, and hair & makeup. The sets were built from scratch, the lighting tailored to each scene, and props—including lifelike animal replicas—handcrafted. In post-production, we brought everything together and gave the images their final look."
    },
    year: "2017",
    image: "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_800/v1773247550/02_-_Fisch_q9rvsk.jpg",
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
    category: { de: "Brands", en: "Brands" },
    description: {
    de: "Monochrome Klarheit.\n\nFür eine neue Kampagne von Momox haben wir die Produktion umgesetzt und die Bildwelt räumlich gebaut. Ausgangspunkt war das Momox-Blau und ein reduzierter, monochromer Look, die sich als verbindende Elemente durch alle Motive ziehen.\n\nDas Ziel lag darin, für jede Kategorie eigenständige Still-Life-Settings zu entwickeln, die einzeln funktionieren und gleichzeitig Teil eines größeren Ganzen bleiben. Dazu gehörte auch die gezielte Entwicklung und Auswahl von Requisiten, um den Fokus klar auf Produkt und Kategorie zu lenken.\n\nAgentur: I LIKE VISUALS",
    en: "Monochromatic clarity.\n\nFor a new Momox campaign, we handled production and built the visual world spatially. The starting point was Momox blue and a minimalist, monochromatic look, which serve as connecting elements running through all motifs.\n\nThe goal was to develop distinct still-life settings for each category that function individually while remaining part of a larger whole. This also involved the deliberate development and selection of props to clearly direct the focus toward the product and category.\n\nAgency: I LIKE VISUALS"
    },
    year: "2025",
    image: "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_800/v1775553750/250120_FL_Alle_Momox_ILV_3_i4phy8.jpg",
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
    category: { de: "Brands", en: "Brands" },
    description: {
      de: "Juckt mich nicht!\n\nFür die Kampagne „Juckt Mich Nicht!“ von Dermapharm haben wir die kreative Produktion für einen Werbefilm umgesetzt. Im Zentrum steht eine Familie, deren Umgang mit Mückenschutz langsam ins Absurde kippt.\n\nWir haben sechs eigenständige Sets entworfen und gebaut, die zusammen mit Kostüm und Requisiten eine geschlossene Welt bilden. Jedes Set wurde wie ein eigener Charakter behandelt, mit eigener Farbwelt und eigener Intensität und verstärken so die leicht überdrehte Realität.\n\nAgentur: I LIKE VISUALS",
      en: "Juckt mich nicht!\n\nFor Dermapharm’s “Juckt Mich Nicht!” campaign, we handled the creative production of a promotional film. The story centers on a family whose approach to mosquito repellent gradually veers into the absurd.\n\nWe designed and built six distinct sets that, together with costumes and props, form a cohesive world. Each set was treated as its own character, with its own color palette and intensity, thereby reinforcing the slightly over-the-top reality.\n\nAgency: I LIKE VISUALS"
    },
    year: "2024",
    image: "https://res.cloudinary.com/dpe3jvf3e/image/upload/qf_auto,q_auto,w_800/v1775457438/Bildschirmfoto_2024-04-29_um_09.46.40.png_oggl6i.webp",
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
    category: { de: "Culture", en: "Culture" }, // Ich habe "Props" zu "Set Design" geändert (strategischer)
    description: {
      de: "Alles echt gebaut.\n\nFür das Musikvideo „Suitcase“ von Ameli in the Woods haben wir in Zusammenarbeit mit Amores Production die visuelle Umsetzung eng begleitet und mitgestaltet. Das Video bewegt sich ästhetisch zwischen späten 90ern und frühen 2000ern. Entscheidend war dabei der analoge Ansatz. Handgemachte Spezialeffekte wie mechanisch pochende Herzen, Zombie-Make-up und projizierte Hintergründe wurden für die Produktion entwickelt und umgesetzt.\n\nDurch enge Koproduktion mit Amores Production und der Band konnten wir die gemeinsame Vision zum Leben erwecken. Leicht überzeichnet, aber bewusst gesetzt, entstand ein tolles Ergebnis, das Nostalgie an die alten MTV-Zeiten aufleben lässt.\n\nBand: Ameli in the Woods & Produktion: Amores Production",
      en: "All built from scratch.\n\nFor the music video “Suitcase” by Ameli in the Woods, we closely collaborated with Amores Production on the visual execution and helped shape the concept. Aesthetically, the video oscillates between the late ’90s and early 2000s. The analog approach was crucial here. Handmade special effects such as mechanically beating hearts, zombie makeup, and projected backgrounds were developed and implemented for the production.\n\nThrough close co-production with Amores Production and the band, we were able to bring our shared vision to life. Slightly exaggerated but deliberately executed, the result is fantastic, evoking nostalgia for the old MTV days.\n\nBand: Ameli in the Woods & Production: Amores Production"
    },
    year: "2023",
    image: "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_800/v1775420840/Bildschirmfoto_2026-04-05_um_22.26.25_oxn9ne.png",
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
    category: { de: "Interior", en: "Interior" },
    description: {
      de: "Ein Ort zwischen zwei Welten.\n\nFür HANA Berlin im Berlin Hilton haben wir das bestehende Interieur weiterentwickelt und an das neue Restaurantkonzept angepasst. Die Vision war ein japanisch mediterraner Ansatz, der sich auch im Raum widerspiegeln sollte. Der Ort hatte bereits eine klare Farbwelt, an die wir angeknüpft haben. Unser Ziel war es, diese Basis zu erhalten und gleichzeitig beide Einflüsse zusammenzubringen. Japanische Formsprache trifft auf mediterrane Wärme und Materialität.\n\nWir haben mit neuen Texturen, Farben und ausgewählten Elementen gearbeitet, ohne den Charakter des Raums zu verlieren. Dabei war es uns wichtig, dass sich HANA stimmig in die bestehende Location des Kunden einfügt und als Teil einer größeren gestalterischen Linie funktioniert. Lebendig, warm und klar. Gestaltet, ohne überladen zu wirken.\n\nFotografie: Steffen Sinzinger",
      en: "A place between two worlds.\n\nFor HANA Berlin at the Berlin Hilton, we further developed the existing interior and adapted it to the new restaurant concept. The vision was a Japanese-Mediterranean approach that should also be reflected in the space. The venue already had a clear color palette, which we built upon. Our goal was to preserve this foundation while bringing both influences together. Japanese design language meets Mediterranean warmth and materiality.\n\nWe worked with new textures, colors, and selected elements without losing the character of the space. It was important to us that HANA blend harmoniously into the client’s existing location and function as part of a larger design concept. Lively, warm, and clear. Designed without appearing cluttered.\n\nPhotographed by Steffen Sinzinger"
    },
    year: "2024",
    image: "https://res.cloudinary.com/dpe3jvf3e/image/upload/q_auto/f_auto/w_800/v1773296846/HANA_-_Interior_-_c_Steffen_Sinzinger_Content_Communication_-_241102_-1_uiplwp.jpg",
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
    category: { de: "Culture", en: "Culture" },
    description: {
      de: "Durch Abwesenheit erzählen.\n\nFür den Kurzfilm Endspiel haben wir dystopische Sets gestaltet, die nicht durch Lautstärke wirken, sondern durch das, was fehlt.\n\nVerlassene Gebäude, überwucherte Straßen, Räume, in denen noch Spuren von Menschen sind – aber keine Menschen mehr. Innen wie außen haben wir Locations so behandelt, dass sie die düstere Stimmung der Geschichte unterstreichen. Im verlassenen Haus erzählen Staub, Chaos und persönliche Relikte von Leben, die hier einmal stattgefunden haben.\n\nRegie: Dre Amiro & Anna Mochow",
      en: "Telling a story through absence.\n\nFor the short film ENDSPIEL, we designed dystopian sets that make an impact not through their scale, but through what is missing.\n\nAbandoned buildings, overgrown streets, rooms where traces of people remain—but no people themselves. Both inside and out, we treated the locations in a way that underscores the story’s somber mood. In the abandoned house, dust, chaos, and personal relics tell of lives that once took place here.\n\ndirected by Dre Amiro & Anna Mochow"
    },
    year: "2024",
    image: "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_800/v1773390417/2024-magic-pop-setdesign-endspiel-hero_h41buh.jpg",
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
