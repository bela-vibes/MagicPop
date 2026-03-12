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
                  <p className="mt-4"><strong>Wie erfassen wir Daten?</strong> Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z. B. per E-Mail). Andere Daten werden automatisch durch die IT-Systeme unserer Hoster erfasst (technische Daten wie IP-Adresse, Browser oder Uhrzeit des Seitenaufrufs).</p>
                  <p className="mt-4"><strong>Wofür nutzen wir die Daten?</strong> Zur fehlerfreien Bereitstellung der Website und zur Sicherheit.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-archivo text-2xl md:text-3xl uppercase tracking-tight mb-6">2. Hosting & Content Delivery Networks</h2>
              <div className="opacity-80 text-lg leading-relaxed space-y-6">
                <div>
                  <h3 className="font-bold mb-2 text-xl">Vercel</h3>
                  <p>Wir hosten unsere Website bei Vercel. Anbieter ist die Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.</p>
                  <p>Wenn Sie unsere Website besuchen, erfasst Vercel verschiedene Logfiles inklusive Ihrer IP-Adresse. Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website.</p>
                  <p className="mt-2">Details: <a href="https://vercel.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-magic-blue transition-colors underline underline-offset-4">https://vercel.com/privacy</a></p>
                </div>
                
                <div>
                  <h3 className="font-bold mb-2 text-xl">Cloudinary</h3>
                  <p>Zur Optimierung und Auslieferung von Bildern nutzen wir Cloudinary. Anbieter ist die Cloudinary Ltd., 3400 Central Expressway, Suite 110, Santa Clara, CA 95051, USA.</p>
                  <p>Bilder werden direkt von den Cloudinary-Servern geladen, wobei Ihre IP-Adresse übertragen wird. Dies dient der schnellen und optimierten Darstellung unserer Projekte gemäß Art. 6 Abs. 1 lit. f DSGVO.</p>
                  <p className="mt-2">Details: <a href="https://cloudinary.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-magic-blue transition-colors underline underline-offset-4">https://cloudinary.com/privacy</a></p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-archivo text-2xl md:text-3xl uppercase tracking-tight mb-6">3. Verantwortliche Stelle</h2>
              <div className="space-y-8 opacity-80 text-lg leading-relaxed">
                <div>
                  <h3 className="font-bold mb-2 text-xl">Hinweis zur verantwortlichen Stelle</h3>
                  <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                  <p className="mt-4 p-6 bg-magic-black/5 dark:bg-off-white/5 rounded-sm inline-block min-w-[300px]">
                    <strong>Ruf und Lehrnickel GbR</strong><br />
                    Jonasstr. 40, 12053 Berlin<br />
                    E-Mail: <a href="mailto:hello@magicpop.berlin" className="hover:text-magic-blue transition-colors underline underline-offset-4">hello@magicpop.berlin</a><br />
                    Vertretungsberechtigt: Dennis Ruf und Béla Lehrnickel
                  </p>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-xl">Ihre Rechte</h3>
                  <p>Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen sowie ein Beschwerderecht bei der zuständigen Aufsichtsbehörde.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-archivo text-2xl md:text-3xl uppercase tracking-tight mb-6">4. Lokale Schriftarten</h2>
              <div className="opacity-80 text-lg leading-relaxed space-y-4">
                <p>Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten Web Fonts. Diese werden <strong>lokal</strong> auf unserem eigenen Webspace bereitgestellt.</p>
                <p>Eine Verbindung zu Servern von Google findet nicht statt. Somit werden keine Daten an Google übertragen. Dies dient der DSGVO-konformen Bereitstellung unserer Design-Schriftarten (Archivo, Inter, Instrument Serif).</p>
              </div>
            </section>

            <section>
              <h2 className="font-archivo text-2xl md:text-3xl uppercase tracking-tight mb-6">5. Social Media (Instagram)</h2>
              <div className="opacity-80 text-lg leading-relaxed space-y-4">
                <p>Auf unserer Website sind Links zum Dienst Instagram eingebunden (Meta Platforms Ireland Limited). Wenn Sie einen Instagram-Button anklicken, während Sie eingeloggt sind, kann Instagram den Besuch Ihrem Konto zuordnen. Wir erhalten keine Kenntnis vom Inhalt der übermittelten Daten.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Datenschutz;
