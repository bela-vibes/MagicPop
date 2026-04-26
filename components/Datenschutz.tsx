import React from 'react';

interface DatenschutzProps {
  onClose: () => void;
}

const Datenschutz: React.FC<DatenschutzProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[200] bg-off-white dark:bg-magic-dark flex flex-col">
      <div className="flex-1 overflow-y-auto pt-24 md:pt-32 pb-24 animate-in">
        <div className="max-w-4xl mx-auto px-6 relative">
          <header className="mb-16 md:mb-24">
            <h1 className="font-archivo text-5xl md:text-8xl uppercase tracking-tighter leading-none mb-4 text-magic-black dark:text-off-white">
              Datenschutz
            </h1>
            <p className="font-editorial text-2xl md:text-4xl italic opacity-60 text-magic-black dark:text-off-white">
              Privacy Policy
            </p>
          </header>

          <div className="space-y-16 text-magic-black dark:text-off-white">
            {/* Sektion 1 */}
            <section>
              <h2 className="font-archivo text-2xl md:text-3xl uppercase tracking-tight mb-6">1. Datenschutz auf einen Blick</h2>
              <div className="space-y-6 opacity-80 text-lg leading-relaxed">
                <div>
                  <h3 className="font-bold mb-2 text-xl">Allgemeine Hinweise</h3>
                  <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-xl">Datenerfassung auf dieser Website</h3>
                  <p><strong>Wer ist verantwortlich?</strong> Die Datenverarbeitung erfolgt durch den Websitebetreiber (siehe Abschnitt „Hinweis zur verantwortlichen Stelle“).</p>
                  <p className="mt-4"><strong>Wie erfassen wir Daten?</strong> Ihre Daten werden erhoben, indem Sie uns diese mitteilen oder automatisch durch die IT-Systeme unserer Hoster erfasst werden (z. B. IP-Adresse, Browser oder Uhrzeit des Seitenaufrufs). Wir nutzen zudem eine SSL-Verschlüsselung, um den Schutz Ihrer übertragenen Daten zu gewährleisten.</p>
                </div>
              </div>
            </section>

            {/* Sektion 2 - Erweitert um Web Analytics */}
            <section>
              <h2 className="font-archivo text-2xl md:text-3xl uppercase tracking-tight mb-6">2. Hosting & Analysedienste</h2>
              <div className="opacity-80 text-lg leading-relaxed space-y-8">
                <div>
                  <h3 className="font-bold mb-2 text-xl">Vercel (Hosting & Analytics)</h3>
                  <p>Wir hosten unsere Website bei Vercel. Anbieter ist die Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.</p>
                  <p>Neben dem technischen Hosting nutzen wir folgende Dienste von Vercel:</p>
                  
                  <ul className="list-disc pl-6 mt-4 space-y-4">
                    <li>
                      <strong>Vercel Speed Insights:</strong> Zur statistischen Auswertung der Ladezeiten unserer Website. Dies hilft uns, die technische Performance stetig zu optimieren.
                    </li>
                    <li>
                      <strong>Vercel Web Analytics:</strong> Zur Analyse der Besucherströme auf unserer Website. Wir können so nachvollziehen, welche Inhalte besonders relevant sind.
                    </li>
                  </ul>

                  <p className="mt-6">
                    Beide Dienste werden **ohne den Einsatz von Cookies** betrieben. Die Erfassung der Daten erfolgt anonymisiert (z. B. durch Hashing der IP-Adresse), sodass keine Rückschlüsse auf einzelne Personen gezogen werden können. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Berechtigtes Interesse an der technischen Optimierung und wirtschaftlichen Gestaltung unserer Website).
                  </p>
                  <p className="mt-2">Details: <a href="https://vercel.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-magic-blue transition-colors underline underline-offset-4">https://vercel.com/privacy</a></p>
                </div>
    
                <div>
                  <h3 className="font-bold mb-2 text-xl">Cloudinary</h3>
                  <p>Zur Optimierung und Auslieferung von Bildern sowie Video-Inhalten nutzen wir Cloudinary. Anbieter ist die Cloudinary Ltd., 3400 Central Expressway, Suite 110, Santa Clara, CA 95051, USA.</p>
                  <p>Dies dient der schnellen und stabilen Darstellung unserer Projekte gemäß Art. 6 Abs. 1 lit. f DSGVO.</p>
                  <p className="mt-2">Details: <a href="https://cloudinary.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-magic-blue transition-colors underline underline-offset-4">https://cloudinary.com/privacy</a></p>
                </div>

                <div className="pt-4 border-t border-magic-black/10 dark:border-off-white/10">
                  <p className="text-sm italic">
                    Hinweis zur Datenübertragung: Vercel ist unter dem EU-U.S. Data Privacy Framework zertifiziert. Die Datenübertragung erfolgt zudem auf Grundlage von Standardvertragsklauseln der EU-Kommission. Wir haben mit den Anbietern Verträge über Auftragsverarbeitung (AVV) gemäß Art. 28 DSGVO abgeschlossen.
                  </p>
                </div>
              </div>
            </section>

            {/* Sektion 3 */}
            <section>
              <h2 className="font-archivo text-2xl md:text-3xl uppercase tracking-tight mb-6">3. Verantwortliche Stelle</h2>
              <div className="space-y-8 opacity-80 text-lg leading-relaxed">
                <div>
                  <h3 className="font-bold mb-2 text-xl">Ansprechpartner</h3>
                  <p className="mt-4 p-6 bg-magic-black/5 dark:bg-off-white/5 rounded-sm inline-block min-w-[300px]">
                    <strong>Ruf und Lehrnickel GbR</strong><br />
                    Jonasstr. 40, 12053 Berlin<br />
                    E-Mail: <a href="mailto:hello@magicpop.berlin" className="hover:text-magic-blue transition-colors underline underline-offset-4">hello@magicpop.berlin</a><br />
                    Vertretungsberechtigt: Dennis Ruf und Béla Lehrnickel
                  </p>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-xl">Ihre Rechte</h3>
                  <p>Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten sowie ein Recht auf Berichtigung oder Löschung dieser Daten.</p>
                </div>
              </div>
            </section>

            {/* Sektion 4 & 5 */}
            <section>
              <h2 className="font-archivo text-2xl md:text-3xl uppercase tracking-tight mb-6">4. Lokale Schriftarten</h2>
              <div className="opacity-80 text-lg leading-relaxed space-y-4">
                <p>Diese Seite nutzt Web Fonts, die <strong>lokal</strong> auf unserem eigenen Webspace bereitgestellt werden. Eine Verbindung zu Servern von Google findet nicht statt.</p>
              </div>
            </section>

            <section>
              <h2 className="font-archivo text-2xl md:text-3xl uppercase tracking-tight mb-6">5. Social Media</h2>
              <div className="opacity-80 text-lg leading-relaxed space-y-4">
                <p>Links zu Instagram (Meta Platforms Ireland Limited). Instagram kann den Besuch unserer Seite Ihrem Benutzerkonto zuordnen, falls Sie dort eingeloggt sind.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Datenschutz;
