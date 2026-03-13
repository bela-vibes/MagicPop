
import { Project, Language } from './types';

export const TRANSLATIONS = {
  de: {
    nav: {
      whatWeDo: "Was wir tun",
      projects: "Projekte",
      studio: "Studio",
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
        { title: "Set & Spatial Design", desc: "Wir gestalten Räume, die Geschichten erzählen. Von Filmsets über Markenwelten bis hin zu privaten Interieurs schaffen wir Atmosphären, die Ideen in greifbare Erlebnisse verwandeln. Jedes Detail wird bedacht – Ästhetik, Funktion und Wirkung." },
        { title: "Concept & Direction", desc: "Starke Projekte beginnen mit einer klaren Idee. Wir entwickeln Konzepte und bieten Creative Direction, die Vision, Identität und Umsetzung in Einklang bringen. Durch die Verbindung von künstlerischer Intuition und strategischem Denken formen wir stimmige und unverwechselbare Ergebnisse." },
        { title: "Production & Execution", desc: "Ideen zählen nur, wenn sie gut umgesetzt werden. Wir steuern und realisieren Projekte von Anfang bis Ende – von der Planung bis zur finalen Installation. Mit Präzision und Sorgfalt sorgen wir für Qualität, Effizienz und einen reibungslosen Prozess." }
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
      title: "Das Studio",
      subtitle: "Ein Spielplatz für neugierige Köpfe.",
      p1: "Dennis und Bela, das Duo hinter Magic Pop, bringen eine einzigartige Mischung aus Kreativität und Fachwissen ein, um Creative Direction und visuelle Umsetzung zu vereinen.",
      p2: "Mit einer gemeinsamen Leidenschaft für Storytelling und einem scharfen Auge für Details haben sie unzählige Konzepte in beeindruckende visuelle Erlebnisse verwandelt. Ihre kombinierten Talente decken ein breites Spektrum an Dienstleistungen ab, darunter Art Direction, Set Design, Interior Creation, Requisitenbau sowie Foto- und Videoproduktion.",
      startProject: "Kontakt aufnehmen"
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
      studio: "studio",
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
        { title: "Set & Spatial Design", desc: "We design spaces that tell stories. From film sets to branded environments and private interiors, we create atmospheres that translate ideas into tangible experiences. Every detail is considered — aesthetic, function, and impact." },
        { title: "Concept & Direction", desc: "Strong projects start with a clear idea. We develop concepts and provide creative direction that align vision, identity, and execution. By combining artistic intuition with strategic thinking, we shape cohesive and distinctive outcomes." },
        { title: "Production & Execution", desc: "Ideas only matter when they are realised well. We manage and execute projects end-to-end — from planning to final installation. With precision and care, we ensure quality, efficiency, and a seamless process throughout." }
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
      title: "The Studio",
      subtitle: "A playground for curious minds.",
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
    slug: "nachtzimmer",
    title: { de: "Nacht\u00ADzimmer", en: "Nacht\u00ADzimmer" },
    category: { de: "Fotoproduktion", en: "Photo Production" },
    description: {
      de: "Ein Raum erzählt seine Geschichten. Wir präsentieren „Nachtzimmer“, eine als eigenständiges Projekt entstandene Fotoserie.\n\nDiese Bilder entführen Sie in eine filmische Welt, inspiriert von der Ästhetik der Americana. Sie fangen einzelne Momente in einem Hotelzimmer ein, die den Betrachter über die Geschichte davor und danach rätseln lassen. Jede Fotografie erschafft eine einzigartige Szene, inspiriert vom zeitlosen Charme des alten Hollywood-Glamours, surrealem Licht und fantastischen Charakteren. Es entstanden 25 einzigartige Motive, von denen jedes eine komplexe Geschichte mit visueller Handwerkskunst und professioneller Ausführung erzählt.\n\nFür jede Geschichte haben wir lebendige Farbschemata, detaillierte Kostüme sowie charakteristisches Haar- und Make-up entworfen. Für jede Aufnahme bauten wir reale Kulissen, setzten atmosphärische Beleuchtung ein und erstellten maßgeschneiderte Requisiten, darunter lebensechte Tier-Repliken. Die Postproduktion verlieh den letzten Schliff und wahrte die visuelle Kohärenz sowie die narrative Wirkung.",
      en: "A room tells its stories. Introducing “Nachtzimmer,” a photo series created as an independent project.\n\nThese images transport you to a cinematic world inspired by Americana aesthetics, capturing individual moments in a hotel room that leave you wondering about the story before and after. Each photograph creates a unique scene, inspired by the timeless allure of old Hollywood glamour, surreal lighting, and fantastic characters. 25 unique motifs were created, each telling a complex story with visual craftsmanship and professional execution.\n\nFor every story, we crafted vibrant color schemes, detailed costumes, and characteristic hair and makeup. For each shot, we built real settings, employed atmospheric lighting, and created custom props, including lifelike animal replicas. The postproduction work added the final touches, maintaining visual coherence and narrative impact."
    },
    year: "2017",
    image: "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_1600/v1773247550/02_-_Fisch_q9rvsk.jpg",
    gallery: [
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/v1773294351/Nachtzimmer0_MagicPop2024.jpg_ylyg9j.webp",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_1600/v1773261659/08---Mermaid_bk4obw.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_1600/v1773247550/02_-_Fisch_q9rvsk.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_1600/v1773247550/11_-_Kedi_sienok.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_1600/v1773293311/07_-_Koffer_mvfu6e.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_1600/v1773247551/14_-_Circus_slbpcz.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_1600/v1773247468/benny_3_Kopie_ufsdlm.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_1600/v1773247509/mariamagdalena_Kopie_taojlr.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_1600/v1773247510/spies_Kopie_lttwm9.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_1600/v1773247515/lowe_2_Kopie_xqmf6g.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_1600/v1773247514/hexenfinal_Kopie_gn2dvb.jpg"
    ],
    color: "bg-orange-500"
  },
  {
    id: 2,
    slug: "hana",
    title: { de: "HANA", en: "HANA" },
    category: { de: "Innenarchitektur", en: "Interior Design" },
    description: {
      de: "Wir hatten das Vergnügen, mit dem Team hinter HANA Berlin zusammenzuarbeiten, um ihrem Interieur neues Leben einzuhauchen und es an ihr innovatives Restaurantkonzept anzupassen. \n\nInspiriert vom bestehenden Stil des Kunden, der in seinen anderen Locations deutlich wird, haben wir sichergestellt, dass sich das HANA wie eine natürliche Erweiterung seiner Markenidentität anfühlt. Durch die sorgfältige Balance zwischen moderner Ästhetik und einer warmen, einladenden Atmosphäre haben wir einen Raum geschaffen, der die Einzigartigkeit ihrer Speisekarte feiert.\n\nUnser Ansatz konzentrierte sich darauf, das Wesen des Raums zu bewahren und gleichzeitig frische Texturen, Farben und Dekorelemente einzuführen. Wir haben darauf geachtet, die Konsistenz mit dem unverwechselbaren Stil von BellBoy und The Butler zu gewährleisten, damit sich das HANA nahtlos in die Markenfamilie des Kunden einfügt. Jedes Detail, von maßgefertigten Möbeln bis hin zu kuratierten Akzenten, wurde ausgewählt, um das Restauranterlebnis zu verbessern und eine Umgebung zu schaffen, die sich sowohl neu als auch vertraut anfühlt.\n\nFotografiert von Steffen Sinzinger",
      en: "We had the pleasure of collaborating with the team behind HANA Berlin to breathe new life into their interior, aligning it with their innovative restaurant concept.\n\nDrawing inspiration from the client’s existing style, which is evident in their other venues, we ensured that HANA would feel like a natural extension of their brand identity. By carefully balancing modern aesthetics with a warm, inviting atmosphere, we crafted a space that celebrates the uniqueness of their menu.\n\nOur approach centered on preserving the essence of the space while introducing fresh textures, colors, and decor elements. We paid attention to ensure consistency with the distinctive style of BellBoy and The Butler, so that HANA feels cohesive within the client’s family of venues. Every detail, from bespoke furniture to curated accents, was selected to enhance the dining experience and create an environment that feels both new and familiar.\n\nPhotographed by Steffen Sinzinger"
    },
    year: "2023",
    image: "https://res.cloudinary.com/dpe3jvf3e/image/upload/v1773296846/HANA_-_Interior_-_c_Steffen_Sinzinger_Content_Communication_-_241102_-1_uiplwp.jpg",
    gallery: [
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/v1773296846/HANA_-_Exterior_-_c_Steffen_Sinzinger_Content_Communication_-_241102_-1_dtaliv.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/v1773297077/HANA_-_Interior_-_Detail_-_c_Steffen_Sinzinger_Content_Communication_-_241102_-13_vsmruo.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/v1773296846/HANA_-_Interior_-_c_Steffen_Sinzinger_Content_Communication_-_241102_-1_uiplwp.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/v1773296852/HANA_-_Interior_-_Detail_-_c_Steffen_Sinzinger_Content_Communication_-_241102_-19_mikqon.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/v1773296849/HANA_-_Interior_-_Detail_-_c_Steffen_Sinzinger_Content_Communication_-_241102_-3_mrjnhd.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/v1773296849/HANA_-_Interior_-_c_Steffen_Sinzinger_Content_Communication_-_241102_-10_zjrcsr.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/v1773296848/HANA_-_Interior_-_c_Steffen_Sinzinger_Content_Communication_-_241102_-3_zrias3.jpg"
    ],
    color: "bg-magic-pink"
  },
    {
    id: 3,
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
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/v1773390422/2024-magic-pop-setdesign-endspiel-interior-3_gauhkz.png",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/v1773390422/2024-magic-pop-setdesign-endspiel-art-direction_txo5vw.png",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/v1773390419/2024-magic-pop-setdesign-endspiel-outdoor_lzri8u.png",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/v1773390421/2024-magic-pop-setdesign-endspiel-interior-2_iv6y1h.png",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/v1773390421/2024-magic-pop-setdesign-endspiel-interior-2_iv6y1h.png",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/v1773390421/2024-magic-pop-setdesign-endspiel-interior_o0htej.png",
    ],
    color: "bg-zinc-900"
  },
  {
    id: 4,
    slug: "bold-moves",
    title: { de: "Mutige Schritte", en: "Bold Moves" },
    category: { de: "Kampagne", en: "Campaign" },
    description: {
      de: "Eine visuelle Kampagne für urbane Mobilitätslösungen.",
      en: "A high-octane visual campaign for urban mobility solutions."
    },
    year: "2022",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200",
    gallery: ["https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200"],
    color: "bg-yellow-400"
  },
  {
    id: 5,
    slug: "soundwave",
    title: { de: "Klangwelle", en: "Soundwave" },
    category: { de: "Audio Visuell", en: "Audio Visual" },
    description: {
      de: "Experimentelle Visualisierung von Schallwellen.",
      en: "Experimental visualization of acoustic resonance."
    },
    year: "2023",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=1200",
    gallery: ["https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=1200"],
    color: "bg-purple-500"
  },
  {
    id: 6,
    slug: "neon-nights",
    title: { de: "Neon Nächte", en: "Neon Nights" },
    category: { de: "Fotografie", en: "Photography" },
    description: {
      de: "Die nächtliche Ästhetik des modernen Tokios.",
      en: "The nocturnal aesthetics of modern Tokyo."
    },
    year: "2024",
    image: "https://images.unsplash.com/photo-1542241647-9cbbada2b309?auto=format&fit=crop&q=80&w=1200",
    gallery: ["https://images.unsplash.com/photo-1503891450247-ee5f8ec36bd6?auto=format&fit=crop&q=80&w=1200"],
    color: "bg-cyan-400"
  },
  {
    id: 7,
    slug: "raw-iron",
    title: { de: "Rohes Eisen", en: "Raw Iron" },
    category: { de: "Möbeldesign", en: "Furniture" },
    description: {
      de: "Brutalistisches Möbeldesign aus recyceltem Stahl.",
      en: "Brutalist furniture design using recycled industrial steel."
    },
    year: "2021",
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=1200",
    gallery: ["https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&q=80&w=1200"],
    color: "bg-red-600"
  }
];
