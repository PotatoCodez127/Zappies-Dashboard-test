export function VideoSection() {
  return (
    <section className="relative bg-gradient-to-b from-black to-gray-950/50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">See it in action</h2>
          <p className="mt-3 text-gray-400">
            Watch how our AI qualifies high-value leads in real-time
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-900/20 to-blue-900/20 p-1 shadow-2xl shadow-violet-500/20">
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
            {/* Placeholder for video - replace with actual video embed */}
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-950/50 to-blue-950/50">
              <div className="group relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/20">
                <div className="absolute inset-0 rounded-full bg-violet-500/50 opacity-50 blur-xl transition-all duration-300 group-hover:opacity-80" />
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative ml-1 text-white"
                >
                  <path
                    d="M6.98353 4.2185C5.4831 3.25301 3.5 4.33148 3.5 6.10189V17.8981C3.5 19.6685 5.4831 20.747 6.98353 19.7815L17.6521 12.8834C19.0496 11.9877 19.0496 10.0123 17.6521 9.11658L6.98353 4.2185Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
