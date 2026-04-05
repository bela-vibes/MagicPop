
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
      title: "About Us",
      subtitle: "Analoge Handarbeit trifft auf digitale Neugier.",
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
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/v1773390419/2024-magic-pop-setdesign-endspiel-outdoor_lzri8u.png",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/v1773390422/2024-magic-pop-setdesign-endspiel-art-direction_txo5vw.png",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/v1773390421/2024-magic-pop-setdesign-endspiel-interior-2_iv6y1h.png",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/v1773390418/2024-magic-pop-setdesign-endspiel-interior-4_gfeidc.jpg",
      "https://res.cloudinary.com/dpe3jvf3e/image/upload/v1773390421/2024-magic-pop-setdesign-endspiel-interior_o0htej.png",
    ],
    color: "bg-zinc-900"
  },
   {
    id: 4,
    slug: "suitcase",
    title: { de: "Suitcase", en: "Suitcase" },
    category: { de: "Set Design", en: "Set Design" }, // Ich habe "Props" zu "Set Design" geändert (strategischer)
    description: {
      de: "Tauche ein in die unheimliche Welt des Musikvideos zu \"Suitcase\" von Ameli in the Woods.\n\nInspiriert von der Ästhetik der späten 90er bis frühen 2000er Jahre, ist dieses Video eine Hommage an den einzigartigen Charme dieser Ära. Zum Leben erweckt von Amores Productions. Spezialeffekte wie Zombie-Make-up, mechanisch schlagende Herzen und projizierte Hintergründe wurden alle analog und ohne CGI hergestellt.\n\nDie nostalgische Ästhetik wurde durch ein farbenfroh gestaltetes Beleuchtungskonzept und eine auffälliges Colorgrading noch verstärkt. Das Musikvideo ist eine Reise in die Vergangenheit und fängt die Essenz der MTV-Ära ein. Es wurde mit 17 talentierten Menschen und viel Kreativität umgesetzt.\n\nBand: Ameli and the Woods & Produktion: Amores Production",
      en: "Step into the eerie world of the music video for \"Suitcase\" by Ameli in the Woods.\n\nInspired by the late 90s to early 2000s aesthetic, this video is a homage to that era’s unique charm. Brought to life by Amores Productions. Special effects like zombie makeup, mechanically beating hearts, and projected backgrounds were all crafted analog, without any CGI.\n\nThe aesthetic nostalgia is further enhanced by a colourful designed lighting concept and eye-popping color grading. This music video is a journey back in time, capturing the essence of a bygone era with authenticity and artistic precision by 17 talented people.\n\nBand: Ameli and the Woods & Production: Amores Production"
    },
    year: "2023",
    image: "https://res.cloudinary.com/dpe3jvf3e/video/upload/v1773394785/2023-magic-pop-production-set-design-props-suitcase-ameli-in-the-woods-amores-production_ike2mz.mp4",
    gallery: ["https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200"],
    color: "bg-yellow-400"
  },
 {
  id: 5,
  slug: "loqi", // Gefixt: Gerade Anführungszeichen
  title: { de: "LOQI", en: "LOQI" },
  category: { de: "Fotoproduktion", en: "Photo Production" },
  description: {
    de: "Objects, composed.\n\nFür LOQI entwickeln wir Bildwelten, die sich nicht aufdrängen und genau dadurch wirken. Statt Produkte zu inszenieren, schaffen wir Situationen, in denen sie selbstverständlich erscheinen und eine eigene Präsenz entfalten. Am Anfang steht für uns nicht das Bild, sondern das Gefühl. Materialität, Farbe und Kontext greifen ineinander und formen Kompositionen, die ruhig sind, aber nie statisch. Reduktion verstehen wir nicht als Verzicht, sondern als Entscheidung für Klarheit.\n\nDie Produktionen für LOQI entstehen vollständig inhouse. Von der Konzeption über Set Design und Props bis zur fotografischen Umsetzung. Als Duo arbeiten wir nah am Objekt, mit einem präzisen Blick für Balance und Details.\n\nSo entstehen Serien, die konsistent bleiben und gleichzeitig Raum für Eigenständigkeit lassen. Jede Tasche wird Teil eines größeren Ganzen und bleibt dennoch ein Objekt für sich.",
    en: "Objects, composed.\n\nFor LOQI, we create visual worlds that do not demand attention — and therefore hold it. Rather than staging products, we build situations in which they appear naturally and develop their own presence. Our process begins with a feeling, not an image. Materiality, color, and context interact to form compositions that are calm, yet never static. For us, reduction is not about less, but about clarity.\n\nAll productions for LOQI are realized fully inhouse, from concept to set design and props through to photography. Working as a duo allows for a close, precise approach, guided by a shared sensitivity for balance and detail.\n\nThe result is a body of work that remains cohesive while allowing for individuality. Each bag becomes part of a larger whole, yet stands on its own."
  },
  year: "2025", // Gefixt: Gerade Anführungszeichen
  image: "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_1600/v1775379704/LOQI_Rolex_Shanghai_1_gfmomc.jpg",
  gallery: [
    "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_1600/v1775379798/250807_LOQI_TravelRetail_Banner_dvuadv.jpg",
    "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_1600/v1775379704/LOQI_Rolex_Shanghai_1_gfmomc.jpg",
    "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_1600/v1775380120/Weekender_together_wloaor.jpg",
    "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_1600/v1775379766/250807_LOQI_TravelRetail_Katjes2_rohnmt.jpg",
    "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_1600/v1775379932/LOQI-Coffee-Bag-Gif_hpcg8r.gif",
    "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_1600/v1775379984/LOQI_BKR_10_znnouz.jpg",
    "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_1600/v1775379767/250807_LOQI_TravelRetail_Osborne_gebv2b.jpg",
    "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_1600/v1775380197/FuturePresent_4x5_new_kexboa.jpg",
    "https://res.cloudinary.com/dpe3jvf3e/image/upload/f_auto,q_auto,w_1600/v1775379685/LOQI_Rolex_Shanghai_3_mpydts.jpg"
    
  ],
  color: "bg-magic-pink"
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
