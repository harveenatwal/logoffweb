export const runtime = "edge";

import { createClient } from "@/lib/supabase/server";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {
  decodeSessionData,
  getChallengeRules,
  getSessionDetails,
} from "./utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ShareButton from "./share";

import "./styles.css";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarPublicUrl } from "@/lib/supabaseUtils";
import { Metadata } from "next";

const DownloadAppButton = ({ id }: { id: string }) => (
  <a
    href={`https://logoffapp.onelink.me/mmwN?af_xp=custom&pid=challenge&c=challenge&deep_link_value=https://logoffapp.com/join/${id}`}
    className="inline-flex items-center bg-black text-white py-3 px-6 font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
  >
    <svg
      className="h-5 w-5 mr-2"
      fill="currentColor"
      viewBox="0 0 814 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"></path>
    </svg>
    Download the app to join
  </a>
);

type Props = {
  params: Promise<{ id: string }>;
  // searchParams: { [key: string]: string | string[] | undefined }; // Not used here but available
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const challengeId = (await params).id;
  const supabase = await createClient();

  // Fetch only the data needed for metadata to be efficient
  const { data: challenge, error } = await supabase
    .from("challenges")
    .select(
      `
      name,
      host_profile:profiles (
        full_name
      )
    `
    )
    .eq("id", challengeId)
    .single();

  if (error || !challenge) {
    // Handle case where challenge is not found or an error occurs
    console.error(
      `Error fetching challenge ${challengeId} for metadata:`,
      error
    );
    return {
      title: "Challenge Not Found | Logoff",
      description:
        "The challenge you are looking for could not be found. Explore other challenges on Logoff.",
    };
  }

  // Use actual field names from your tables
  const challengeName = challenge.name || "This Challenge"; // Fallback if name is null
  const hostName = challenge.host_profile?.full_name || "A Logoff User"; // Fallback

  const pageTitle = `${challengeName} by ${hostName} | Logoff`;
  const pageDescription = `You're invited to join '${challengeName}', hosted by ${hostName} on Logoff. Master screen time, unlock deeper focus, and achieve your goals together.`;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `/join/${challengeId}`, // Canonical URL for this page
      siteName: "Logoff",
      images: [
        {
          url: "https://cdn.logoffapp.com/opengraph.png",
          width: 1200,
          height: 600,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
  };
}

const JoinPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const challengeId = (await params).id;
  const supabase = await createClient();

  const {
    data: challenge,
    error,
    status,
  } = await supabase
    .from("challenges")
    .select("*, host_profile:profiles (*)")
    .eq("id", challengeId)
    .single();

  if ((error && status !== 406) || !challenge) {
    notFound();
  }

  const session = decodeSessionData(challenge.session_data);
  const sessionDetails = getSessionDetails(session);
  const rules = getChallengeRules(challenge, session);

  const initials = challenge.host_profile?.full_name
    ?.split(" ")
    ?.map((word: string) => word[0])
    ?.join("")
    ?.toUpperCase();

  const avatarUrl = getAvatarPublicUrl(
    supabase,
    challenge.host_profile?.avatar_url
  );

  return (
    <div className="min-h-screen flex flex-col light-background">
      <Header light />
      <main className="flex-1 flex pt-20 justify-center">
        <div className="container mx-auto px-6">
          {/* --- Navigation --- */}
          <nav className="border-b border-gray-200 mb-12">
            {/* ... (rest of your nav code) ... */}
            <div className="flex justify-between items-center max-w-7xl mx-auto">
              <div className="flex space-x-4 sm:space-x-6 text-sm py-4 text-secondary-light font-medium">
                <a href="#about">About</a>
                <a href="#challenge">Blocking rule</a>
                <a href="#how-it-works">How it works</a>
                <a href="#faq">FAQ</a>
              </div>
              <div>
                <ShareButton />
              </div>
            </div>
          </nav>

          {/* --- Main Content Area --- */}
          <div className="flex flex-col md:flex-row gap-12 sm:gap-24">
            {/* --- Left Column (Sticky Info) --- */}
            <div className="w-full md:w-2/5 text-center md:text-left">
              <div className="sticky top-28">
                <h1 className="text-5xl font-serif font-medium text-center text-primary-light mb-8">
                  {challenge.name} {/* Use state data */}
                </h1>
                <div className="flex justify-center items-center text-sm text-tertiary-light mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center flex-col">
                      <div>{new Date(challenge.start_date).toDateString()}</div>
                      <div>
                        {new Date(challenge.start_date).toLocaleTimeString()}
                      </div>
                    </div>
                    <div>→</div>
                    <div className="flex items-center justify-center flex-col">
                      <div>{new Date(challenge.end_date).toDateString()}</div>
                      <div>
                        {new Date(challenge.end_date).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Image placeholder */}
              </div>
            </div>

            {/* --- Right Column (Details) --- */}
            <div className="w-full md:w-3/5 relative flex flex-col gap-8">
              {/* --- About Section --- */}
              <div
                id="about"
                className="flex flex-col gap-2 text-center items-center"
              >
                <Avatar className="size-20">
                  {avatarUrl && <AvatarImage src={avatarUrl} alt={initials} />}
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="text-secondary-light font-serif text-xl">
                  Hosted by
                </div>
                <div className="text-primary-light font-serif text-xl">
                  {challenge.host_profile?.full_name}
                </div>{" "}
                {/* Placeholder Host */}
                <div className="text-secondary-light mt-1">
                  {challenge.description} {/* Use state data */}
                </div>
                <div className="mt-4 flex items-center justify-center">
                  <div>
                    <DownloadAppButton id={challengeId} />
                  </div>
                  {/* Participant count display (use state if fetched) */}
                  {/* {participantCount > 0 && <div>{participantCount} joined</div>} */}
                </div>
              </div>

              {/* --- Blocking Rule Section --- */}
              <div
                id="challenge"
                className="border-t border-gray-200 pt-8 flex flex-col gap-6"
              >
                <div className="text-primary-light font-serif text-xl">
                  Blocking rule
                </div>
                <div>
                  <div className="text-sm text-secondary-light">
                    {sessionDetails.description} {/* Use derived data */}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {/* Use derived data */}
                  {Array.from(rules).map(([key, value]) => (
                    <div key={key}>
                      <div className="text-xs text-tertiary-light">{key}</div>
                      <div className="text-sm text-primary-light">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* --- How it Works Section --- */}
              <div
                id="how-it-works"
                className="border-t border-gray-200 pt-8 flex flex-col gap-6"
              >
                {/* ... (static content) ... */}
                <div className="text-primary-light font-serif text-xl">
                  How challenges work on Logoff
                </div>
                <div className="text-secondary-light">
                  When you join a Logoff Challenge, the same app blocking rule
                  get applied to your phone as everyone else in the challenge,
                  all at the same time. It helps everyone stay focused together,
                  knowing you&apos;re all following the same rules during the
                  challenge period!
                </div>
              </div>

              {/* --- FAQ Section --- */}
              <div
                id="faq"
                className="border-t border-gray-200 pt-8 flex flex-col gap-6"
              >
                <div className="text-primary-light font-serif text-xl">
                  Frequently asked questions
                </div>
                {/* Using ShadCN Accordion */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      Is this challenge free to join?
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes! This challenge is completely free to join.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      How do I join a challenge?
                    </AccordionTrigger>
                    <AccordionContent>
                      Download the app and follow the prompts to join a
                      challenge.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How does the app help?</AccordionTrigger>
                    <AccordionContent>
                      Logoff provides tools to block apps, track your progress,
                      and connect with others in the challenge.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div>
                  <DownloadAppButton id={challengeId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer light />
    </div>
  );
};

export default JoinPage;
