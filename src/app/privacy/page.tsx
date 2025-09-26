export const metadata = {
    title: "Privacy Policy | Grapevine Trends",
    description: "How Grapevine Trends collects, uses, and protects data.",
  };
  
  export default function PrivacyPage() {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12 prose prose-gray">
        <h1>Privacy Policy</h1>
        <p><em>Last updated: {new Date().toLocaleDateString()}</em></p>
  
        <p>
          This Privacy Policy explains how <strong>Grapevine Trends</strong> (“we”, “our”, “us”)
          collects, uses, and shares information when you use our website and services.
        </p>
  
        <h2>Information We Collect</h2>
        <ul>
          <li>Account/contact info you provide (e.g., name, email).</li>
          <li>Usage data (pages viewed, actions, basic device info).</li>
          <li>Content you submit (e.g., search queries, captions to generate).</li>
          <li>Third-party platform data you authorize us to access (e.g., YouTube/TikTok/Instagram metadata).</li>
        </ul>
  
        <h2>How We Use Information</h2>
        <ul>
          <li>Provide and improve features like trend discovery and content ideas.</li>
          <li>Operate, maintain, and secure the service.</li>
          <li>Comply with legal obligations and platform policies.</li>
        </ul>
  
        <h2>Legal Basis (EEA/UK)</h2>
        <p>We process data on the basis of contract, legitimate interests, and consent (where required).</p>
  
        <h2>Sharing</h2>
        <p>
          We may share data with service providers (e.g., Firebase, analytics), and when required by law.
          We do not sell personal information.
        </p>
  
        <h2>Data Retention</h2>
        <p>We retain data only as long as necessary for the purposes above, then delete or anonymize it.</p>
  
        <h2>International Transfers</h2>
        <p>We may transfer data internationally, including to the U.S., using appropriate safeguards.</p>
  
        <h2>Your Rights</h2>
        <ul>
          <li>Access, correct, or delete your data.</li>
          <li>Object or restrict certain processing.</li>
          <li>Data portability, where applicable.</li>
        </ul>
  
        <h2>Security</h2>
        <p>We use technical and organizational measures to protect your information.</p>
  
        <h2>Children</h2>
        <p>Our service is not directed to children under 13 (or 16 in the EEA).</p>
  
        <h2>Contact</h2>
        <p>
          Questions? Email us at <a href="mailto:playfulparlour@gmail.com">playfulparlour@gmail.com</a>.<br/>
          Postal: Your Company/Studio Name, Mailing Address, City, Country.
        </p>
  
        <h2>Changes</h2>
        <p>We may update this Policy. We’ll post the new date at the top when we do.</p>
      </main>
    );
  }