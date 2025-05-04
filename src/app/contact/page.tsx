import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
 
export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col space-background text-white">
      <Header />

      <main className="flex-1 py-12 md:py-16">
        <div className="container max-w-2xl mx-auto px-4">
          <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Contact Us</h1>
            <div className="prose prose-lg max-w-none">
              <p>If you have any questions, feedback, or need assistance, please don&apos;t hesitate to reach out. You can contact us via email at <a href="mailto:support@focuspledge.com">support@focuspledge.com</a>.</p>
              <p>We strive to respond to all inquiries within 24-48 hours.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const metadata = {
  title: "Contact Us - Logoff",
  description: "Contact the Logoff team for support, questions, and feedback.",
};