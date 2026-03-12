const badges = ['React', 'Supabase', 'Auth0', 'Cloudinary', 'Vercel']

export default function LinkyCard() {
  return (
    <div className="card">
      <p className="text-xs text-[#888888] uppercase tracking-widest mb-3">Project</p>
      <h2 className="text-2xl font-semibold text-[#2c5f7c]">Linky</h2>
      <p className="mt-2 text-[#333333] leading-relaxed">
        A content planning tool for LinkedIn posts. Plan, write, and organize in
        a single timeline.
      </p>

      <div className="flex flex-wrap gap-2 mt-4">
        {badges.map((badge) => (
          <span
            key={badge}
            className="text-xs px-2 py-1 rounded-full bg-[#f0f7f4] text-[#7db8a0] border border-[#7db8a0]"
          >
            {badge}
          </span>
        ))}
      </div>

      <div className="flex gap-3 mt-6">
        <a
          href="https://gmtnezschez.com/linky"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-[#2c5f7c] text-white text-sm hover:bg-[#5a9fb8] transition-colors"
        >
          Live Demo →
        </a>
        <a
          href="https://github.com/GiselleMtnezS/Linky"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg border border-[#2c5f7c] text-[#2c5f7c] text-sm hover:bg-[#f0f7fa] transition-colors"
        >
          View Code ↗
        </a>
      </div>
    </div>
  )
}
