import HeroSlider from '../components/HeroSlider'
import AnnouncementSection from '../components/AnnouncementSection'
import AboutSection from '../components/AboutSection'
import JourneySection from '../components/JourneySection'
import AreasOfWorkSection from '../components/AreasOfWorkSection'
import ImpactMissionSection from '../components/ImpactMissionSection'
import EngagementSection from '../components/EngagementSection'
import GallerySection from '../components/GallerySection'
import ContactSection from '../components/ContactSection'

export default function Home() {
  return (
    <div className="w-full">
      {/* 1. Home / Hero Slider */}
      <HeroSlider />

      {/* 2. Curated Event Announcement (Om Darshan Dandiya Utsav) */}
      <AnnouncementSection />

      {/* 3. About Om Charitable Trust */}
      <AboutSection />

      {/* 3. Our Journey */}
      <JourneySection />

      {/* 4. Where We Serve (Areas of Work) */}
      <AreasOfWorkSection />

      {/* 5. Impact / Mission */}
      <ImpactMissionSection />

      {/* 6. Be a Part of the Change & Forms (Volunteer / Donate) */}
      <EngagementSection />

      {/* 7. Gallery */}
      <GallerySection />

      {/* 8. Contact Us & Location */}
      <ContactSection />
    </div>
  )
}
