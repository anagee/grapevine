export const metadata = {
    title: "Terms of Service | Grapevine Trends",
    description: "The terms that govern your use of Grapevine Trends.",
  };
  
  export default function TermsPage() {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12 prose prose-gray">
        <h1>Terms of Service</h1>
        <p><em>Last updated: {new Date().toLocaleDateString()}</em></p>
  
        <h2>Agreement</h2>
        <p>
          By accessing or using <strong>Grapevine Trends</strong> (“Service”), you agree to these Terms.
          If you do not agree, do not use the Service.
        </p>
  
        <h2>Use of the Service</h2>
        <ul>
          <li>You’ll comply with all applicable laws and third-party platform policies (e.g., TikTok, Instagram, YouTube).</li>
          <li>You won’t reverse engineer, abuse rate limits, or use the Service for unlawful purposes.</li>
          <li>You’re responsible for any content you input or generate.</li>
        </ul>
  
        <h2>Accounts & Access</h2>
        <p>You are responsible for maintaining the confidentiality of credentials and activities under your account.</p>
  
        <h2>Content & Intellectual Property</h2>
        <p>
          We and our licensors retain all rights to the Service. You retain rights to your content.
          You grant us a license to process your content to operate the Service.
        </p>
  
        <h2>Third-Party Services</h2>
        <p>
          The Service integrates with third-party APIs. Their terms and privacy policies govern your use of those services.
        </p>
  
        <h2>Disclaimers</h2>
        <p>
          The Service is provided “as is” without warranties. We do not guarantee accuracy, availability, or fitness
          for a particular purpose.
        </p>
  
        <h2>Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, we are not liable for indirect, incidental, or consequential damages.
        </p>
  
        <h2>Termination</h2>
        <p>We may suspend or terminate access for any reason, including violations of these Terms.</p>
  
        <h2>Governing Law</h2>
        <p>These Terms are governed by the laws of your jurisdiction (set your country/state here).</p>
  
        <h2>Contact</h2>
        <p>
          Questions? Email <a href="mailto:playfulparlour@gmail.com">playfulparlour@gmail.com</a>.
        </p>
      </main>
    );
  }