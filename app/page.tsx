import { HeroSection } from '@/components/HeroSection'
import { CareerTimeline } from '@/components/CareerTimeline'
import { DreamsSection } from '@/components/DreamsSection'
import { BlogSection } from '@/components/BlogSection'
import { ContactSection } from '@/components/ContactSection'
import { SectionDivider } from '@/components/SectionDivider'
import { personalData } from '@/data/personal'

export default function Home() {
  return (
    <>
      <HeroSection name={personalData.name} tagline={personalData.tagline} />
      <SectionDivider variant="wave" />
      <CareerTimeline steps={personalData.career} />
      <SectionDivider variant="curve" flip />
      <DreamsSection dreams={personalData.dreams} />
      <BlogSection />
      <ContactSection email={personalData.email} socials={personalData.socials} />
    </>
  )
}
