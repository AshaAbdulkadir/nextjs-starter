import AddMissionForm from "@/components/AddMissionForm";
import DeploymentWorkflow from "@/components/DeploymentWorkflow";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LaunchCrewSignup from "@/components/LaunchCrewSignup";
import RecentMissions from "@/components/RecentMissions";
import StatsGrid from "@/components/StatsGrid";
import { SAMPLE_MISSIONS } from "@/lib/missions";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsGrid missions={SAMPLE_MISSIONS} />
      <RecentMissions missions={SAMPLE_MISSIONS} />
      <AddMissionForm />
      <DeploymentWorkflow />
      <LaunchCrewSignup />
      <Footer />
    </>
  );
}
