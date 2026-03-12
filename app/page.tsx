import HeroCard from '@/components/HeroCard'
import LinkyCard from '@/components/LinkyCard'
import LumenValleyCard from '@/components/LumenValleyCard'
import ContactCard from '@/components/ContactCard'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f9fa] py-16 px-4 flex flex-col gap-8 items-center">
      <HeroCard />
      <LinkyCard />
      <LumenValleyCard />
      <ContactCard />
    </main>
  )
}
