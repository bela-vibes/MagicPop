
import React from 'react';
import { X } from 'lucide-react';

interface DatenschutzProps {
  onClose: () => void;
}

const Datenschutz: React.FC<DatenschutzProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-off-white dark:bg-magic-dark flex flex-col">
      <div className="flex-1 overflow-y-auto pt-24 md:pt-32 pb-12 animate-in">
        <div className="max-w-4xl mx-auto px-6 relative">
          <header className="mb-16 md:mb-24">
            <h1 className="font-archivo text-5xl md:text-8xl uppercase tracking-tighter leading-none mb-4">
              Datenschutz
            </h1>
            <p className="font-editorial text-2xl md:text-4xl italic opacity-60">
              Privacy Policy
            </p>
          </header>

          <div className="space-y-16 text-magic-black dark:text-off-white">
            <section>
              <h2 className="font-archivo text-2xl md:text-3xl uppercase tracking-tight mb-6">1. Datenschutz auf einen Blick</h2>
              <div className="space-y-6 opacity-80 text-lg leading-relaxed">
                <div>
                  <h3 className="font-bold mb-2">Allgemeine Hinweise</h3>
                  <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Datenerfassung auf dieser Website</h3>
                  <p><strong>Wer ist verantwortlich?</strong> Die Datenverarbeitung erfolgt durch den Websitebetreiber (siehe Abschnitt „Hinweis zur verantwortlichen Stelle“).</p>
                  <p className="mt-4"><strong>Wie erfassen wir Daten?</strong> Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z. B. per E-Mail). Andere Daten werden automatisch durch die IT-Systeme unseres Hosters erfasst (technische Daten wie Browser, Betriebssystem oder Uhrzeit des Seitenaufrufs).</p>
                  <p className="mt-4"><strong>Wofür nutzen wir die Daten?</strong> Zur fehlerfreien Bereitstellung der Website und zur Sicherheit.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-archivo text-2xl md:text-3xl uppercase tracking-tight mb-6">2. Hosting</h2>
              <div className="opacity-80 text-lg leading-relaxed space-y-4">
                <p>Wir hosten unsere Website bei Netlify. Anbieter ist die Netlify, Inc., 44 Montgomery Street, Suite 300, San Francisco, CA 94104, USA.</p>
                <p>Wenn Sie unsere Website besuchen, erfasst Netlify verschiedene Logfiles inklusive Ihrer IP-Adresse. Details zur Datenverarbeitung finden Sie in der Datenschutzerklärung von Netlify: <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer" className="hover:text-magic-pink transition-colors underline decoration-magic-pink/30 underline-offset-4">https://www.netlify.com/privacy/</a>.</p>
                <p>Die Verwendung von Netlify erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website.</p>
              </div>
            </section>

            <section>
              <h2 className="font-archivo text-2xl md:text-3xl uppercase tracking-tight mb-6">3. Allgemeine Hinweise und Pflichtinformationen</h2>
              <div className="space-y-8 opacity-80 text-lg leading-relaxed">
                <div>
                  <h3 className="font-bold mb-2">Hinweis zur verantwortlichen Stelle</h3>
                  <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                  <p className="mt-2">
                    Ruf und Lehrnickel GbR<br />
                    Jonasstr. 40, 12053 Berlin<br />
                    E-Mail: <a href="mailto:hello@magicpop.berlin" className="hover:text-magic-pink transition-colors underline decoration-magic-pink/30 underline-offset-4">hello@magicpop.berlin</a><br />
                    Vertretungsberechtigt: Dennis Ruf und Béla Lehrnickel
                  </p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Ihre Rechte</h3>
                  <p>Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen sowie ein Beschwerderecht bei der zuständigen Aufsichtsbehörde.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-archivo text-2xl md:text-3xl uppercase tracking-tight mb-6">4. Lokale Schriftarten (Google Fonts lokal)</h2>
              <div className="opacity-80 text-lg leading-relaxed space-y-4">
                <p>Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Web Fonts. Diese werden lokal auf unserem eigenen Server (gehostet durch Netlify) bereitgestellt.</p>
                <p>Eine Verbindung zu Servern von Google findet nicht statt. Somit werden keine Daten (wie Ihre IP-Adresse) an Google übertragen. Dies dient der DSGVO-konformen Bereitstellung unserer Design-Schriftarten (Archivo, Inter, Instrument Serif).</p>
              </div>
            </section>

            <section>
              <h2 className="font-archivo text-2xl md:text-3xl uppercase tracking-tight mb-6">5. Social Media (Instagram)</h2>
              <div className="opacity-80 text-lg leading-relaxed space-y-4">
                <p>Auf unserer Website sind Links zum Dienst Instagram eingebunden (Meta Platforms Ireland Limited). Wenn Sie den Instagram-Button anklicken, während Sie in Ihrem Account eingeloggt sind, kann Instagram den Besuch unserer Seite Ihrem Benutzerkonto zuordnen. Wir weisen darauf hin, dass wir keine Kenntnis vom Inhalt der übermittelten Daten erhalten.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Datenschutz;
