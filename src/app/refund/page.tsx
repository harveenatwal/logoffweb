import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import "@/app/purple-body.css";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col space-background text-white">
      <Header />

      <main className="flex-1 py-12 md:py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Refund Policy
            </h1>
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{
                __html: `
              <p><strong>Last Updated:</strong> 06/15/2025</p>
              
              <p>We understand that things don't always go as planned. All payments, including in-app purchases, are processed through the App Store, and we don't have access to your payment details. This means we are unable to issue refunds directly.</p>
              
              <p>If you believe you need a refund for any purchases, including in-app purchases, you can request one from the App Store by following these steps:</p>
              <ol role="list">
                <li>Open the <strong>App Store</strong> app on your device.</li>
                <li>Tap your profile icon at the top right.</li>
                <li>Select <strong>Purchase History</strong> and find your Timmy, previously named Logoff and FocusPledge, purchase or in-app purchase.</li>
                <li>Tap <strong>Report a Problem</strong> and choose the reason for your refund request.</li>
                <li>Follow the on-screen instructions to submit your request.</li>
              </ol>
              <p>For further assistance, you can also visit <a target="_new" href="https://reportaproblem.apple.com">Apple's refund page</a>.</p>
              
              <h2>If Your Refund is Refused</h2>
              <p>In some cases, Apple may refuse a refund request if:</p>
              <ul role="list">
                <li>The purchase or in-app purchase doesn't meet their refund criteria (e.g., too much time has passed since the purchase).</li>
                <li>The app or in-app features have been extensively used.</li>
                <li>The reason for the refund doesn't align with Apple's policies (e.g., accidental purchases might be eligible, but dissatisfaction with app functionality may not).</li>
              </ul>
              <p>If Apple refuses your refund, unfortunately, we cannot offer further assistance, as refunds are entirely managed by Apple. We recommend contacting Apple Support for more information if your request is declined.</p>
              
              <h2>Contact Us</h2>
              <p>If you have any questions or concerns about this policy, please contact us at <a href="mailto:support@timm.so">support@timm.so</a>.</p>
              
            `,
              }}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Add basic metadata
export const metadata = {
  title: "Refund Policy - Timmy",
  description: "Read the Refund Policy for the Timmy application and website.",
};
