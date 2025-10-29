interface FeatureSectionProps {
  title: string
  description: string
  imageSide: "left" | "right"
  imageUrl?: string
  gradient?: boolean
}

export function FeatureSection({ title, description, imageSide, imageUrl, gradient = false }: FeatureSectionProps) {
  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className={`grid items-center gap-12 lg:grid-cols-2 ${imageSide === "right" ? "lg:grid-flow-dense" : ""}`}>
          {/* Text Content */}
          <div className={imageSide === "right" ? "lg:col-start-1" : ""}>
            <h2 className="mb-6 text-balance text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">{title}</h2>
            <p className="text-pretty text-lg leading-relaxed text-gray-400 md:text-xl">{description}</p>
          </div>

          {/* Image */}
          <div className={imageSide === "right" ? "lg:col-start-2" : ""}>
            <div
              className={`relative overflow-hidden rounded-2xl border border-white/10 ${
                gradient ? "bg-gradient-to-br from-violet-900/30 to-blue-900/30 p-1" : "bg-white/5"
              }`}
            >
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-violet-950/30 to-blue-950/30">
                {imageUrl ? (
                  <img
                    src={imageUrl || "/ai-chatbot-interface-dashboard-with-whatsapp-messa.jpg"}
                    alt={title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-sm text-gray-500">Feature Image Placeholder</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
