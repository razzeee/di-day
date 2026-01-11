import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!consent) {
      alert("Bitte akzeptiere die Datenschutzerklärung.");
      return;
    }

    setStatus("loading");

    // Simulate API call - replace with actual newsletter signup
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setConsent(false);
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950 dark:to-accent-950 rounded-2xl p-8">
      <h3 className="text-2xl font-display font-bold mb-4">
        Newsletter abonnieren
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Erhalte monatliche Updates zu neuen Wechselrezepten und digitaler
        Unabhängigkeit.
      </p>

      {status === "success" ? (
        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-lg">
          ✓ Erfolgreich angemeldet! Bitte bestätige deine E-Mail-Adresse.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              E-Mail-Adresse
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              placeholder="deine@email.de"
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label
              htmlFor="consent"
              className="text-sm text-gray-600 dark:text-gray-400"
            >
              Ich habe die{" "}
              <a
                href="/datenschutz"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                Datenschutzerklärung
              </a>{" "}
              gelesen und akzeptiere sie.
            </label>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {status === "loading" ? "Wird gesendet..." : "Abonnieren"}
          </button>
        </form>
      )}
    </div>
  );
}
