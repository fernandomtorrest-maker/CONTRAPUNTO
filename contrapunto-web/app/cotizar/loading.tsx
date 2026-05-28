export default function CotizadorSkeleton() {
  return (
    <div className="min-h-screen bg-[#1b1b1b] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header skeleton */}
        <div className="mb-16">
          <div className="mb-3 h-3 w-24 animate-pulse rounded-full bg-[#8d775f]/30" />
          <div className="h-12 w-80 animate-pulse rounded-2xl bg-white/5" />
        </div>

        {/* Progress bar skeleton */}
        <div className="mb-8 flex gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-1 flex-1 rounded-full bg-white/10" />
          ))}
        </div>

        {/* Title skeleton */}
        <div className="mb-10 h-9 w-72 animate-pulse rounded-2xl bg-white/5" />

        {/* Cards skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#262626]"
            >
              <div className="h-56 animate-pulse bg-white/5" />
              <div className="p-6">
                <div className="h-7 w-36 animate-pulse rounded-xl bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
