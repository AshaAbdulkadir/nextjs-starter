import Achievements from "@/components/Achievements";
import AddMissionForm from "@/components/AddMissionForm";
import DeploymentWorkflow from "@/components/DeploymentWorkflow";
import FeaturedMission from "@/components/FeaturedMission";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LaunchCrewSignup from "@/components/LaunchCrewSignup";
import RecentMissions from "@/components/RecentMissions";
import StatsGrid from "@/components/StatsGrid";
import { getDashboardData } from "@/lib/db";

// Re-render on every request so the dashboard always shows live
// database numbers instead of a build-time snapshot.
export const dynamic = "force-dynamic";

export default async function Home() {
  const { missions, crewCount, dbConfigured } = await getDashboardData();

  return (
    <>
      <Header />
      <Hero />
      {!dbConfigured && (
        <p className="mx-auto max-w-6xl px-6 pt-6 text-xs mono text-amber-300">
          ⚠ Database not configured — showing sample data. Add DATABASE_URL to
          .env.local to go live (see README).
        </p>
      )}
      <StatsGrid missions={missions} crewCount={crewCount} />
      <FeaturedMission />
      <RecentMissions missions={missions} dbConfigured={dbConfigured} />
      <Achievements dbConnected={dbConfigured} />
      <AddMissionForm />
      <DeploymentWorkflow />
      <LaunchCrewSignup />
      <Footer />
    </>
  );
}
