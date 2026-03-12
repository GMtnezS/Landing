export default function LumenValleyCard() {
  return (
    <div
      className="card opacity-80"
      style={{ borderStyle: 'dashed', borderColor: '#e8e8e8' }}
    >
      <p className="text-xs text-[#888888] uppercase tracking-widest mb-3">Coming Soon</p>
      <h2 className="text-2xl font-semibold text-[#2c5f7c]">Lumen Valley</h2>
      <p className="mt-2 text-[#333333] leading-relaxed">
        A CEU platform for healthcare professionals. Courses, quizzes, and certificates —
        built for the people keeping patients well.
      </p>
      <span className="mt-4 inline-block text-xs px-2 py-1 rounded-full bg-[#f0f7f4] text-[#7db8a0] border border-[#7db8a0]">
        In Development
      </span>
    </div>
  )
}
