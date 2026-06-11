import Achievements from "@/components/Achievements";
import AddMissionForm from "@/components/AddMissionForm";
import DeploymentWorkflow from "@/components/DeploymentWorkflow";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LaunchCrewSignup from "@/components/LaunchCrewSignup";
import RecentMissions from "@/components/RecentMissions";
import StatsGrid from "@/components/StatsGrid";
import { SAMPLE_MISSIONS } from "@/lib/missions";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <StatsGrid missions={SAMPLE_MISSIONS} />
      <RecentMissions missions={SAMPLE_MISSIONS} />
      <Achievements />
      <AddMissionForm />
      <DeploymentWorkflow />
      <LaunchCrewSignup />
      <Footer />
    </>
  );
}
