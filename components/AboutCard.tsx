import Image from 'next/image'

export default function AboutCard() {
  return (
    <div className="card flex flex-col md:flex-row gap-6 items-start">
      <Image
        src="/gmtnezs.jpg"
        alt="Giselle Martinez-Sanchez"
        width={112}
        height={112}
        className="rounded-full object-cover shrink-0 mx-auto md:mx-0"
        style={{ width: '112px', height: '112px' }}
      />
      <div>
        <p className="text-xs text-[#888888] uppercase tracking-widest mb-3">About</p>
        <div className="text-[#333333] leading-relaxed space-y-3">
          <p>
            The code was never the point. The value it brings to the people on the other side of
            it always was. I strive towards the intersection of technology and human wellbeing.
          </p>
          <p>
            Drawn to biomechanics and backed by my BS in Computer Science, I&apos;m building a CEU
            platform for healthcare professionals and launching an integrative healthcare center.
            (Stay posted for updates! ;D)
          </p>
          <p>
            ✦ I spent two years at OKO building document processing pipelines that gave freight
            brokers back hours they were losing to manual data entry.
          </p>
          <p>
            ✦ Three years before that, at Bryan University, I was guiding peers through
            full-stack development, some of whom went on to become Academic Consultants
            themselves!
          </p>
          <p>
            Looking back, every step was always pointing this way.
          </p>
        </div>
      </div>
    </div>
  )
}
