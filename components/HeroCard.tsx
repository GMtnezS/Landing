import Image from 'next/image'

export default function HeroCard() {
  return (
    <div className="card text-center flex flex-col items-center gap-2">
      <Image
        src="/flowing_water_.svg"
        alt="GMtnezS logo"
        width={200}
        height={200}
        priority
      />
      <div>
        <h1 className="text-4xl font-semibold text-[#2c5f7c] tracking-tight">
          Giselle Martinez-Sanchez
        </h1>
        <p className="m-3 text-lg font-light text-[#2c5f7c] leading-relaxed">
          I strive towards the intersection of technology and human wellbeing.
        </p>
        <p className="m-2 mb-6 text-sm text-[#888888] tracking-widest uppercase">
          Full-Stack Engineer · TypeScript · React · Node.js · AWS
        </p>
      </div>

      <hr className="w-full border-[#e8e8e8]" />

      <div className="flex gap-6">
        <a
          href="https://linkedin.com/in/giselle-martinez-sanchez-97843a152"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#5a9fb8] text-sm hover:text-[#2c5f7c] transition-colors"
        >
          LinkedIn ↗
        </a>
        <a
          href="https://github.com/GiselleMtnezS"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#5a9fb8] text-sm hover:text-[#2c5f7c] transition-colors"
        >
          GitHub ↗
        </a>
        <a
          href="/giselle_martinez-sanchez_resume_2026.pdf"
          download
          className="text-[#5a9fb8] text-sm hover:text-[#2c5f7c] transition-colors"
        >
          Resume ↓
        </a>
      </div>
    </div>
  )
}
