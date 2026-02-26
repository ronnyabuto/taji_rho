import { BackButton } from "../components/back-button"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {}
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <BackButton />
        </div>
      </header>

      {}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-slate-900 mb-6">About Taji Rho</h1>
          <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full mx-auto mb-8"></div>
        </div>

        <div className="prose prose-lg prose-slate max-w-none">
          <div className="text-slate-700 leading-relaxed space-y-6 font-light text-lg">
            <p>
              Welcome to my corner of the internet. I'm Taji Rho, and this is where I share my
              thoughts, reflections, and observations about life, technology, creativity, and the
              human experience.
            </p>

            <p>
              I believe in the power of thoughtful writing to connect us across distances and
              differences. Each post here is crafted with intention, designed to spark reflection,
              inspire conversation, or simply offer a moment of contemplation in our busy world.
            </p>

            <p>
              My writing draws from diverse experiences and perspectives, always seeking to find
              meaning in the everyday and beauty in the overlooked. Whether exploring philosophical
              questions, sharing personal insights, or examining the world around us, I aim to write
              with honesty, curiosity, and care.
            </p>

            <p>
              This space is designed to feel like reading a well-crafted book—unhurried, immersive,
              and free from the distractions that often characterize our digital lives. I hope you
              find something here that resonates with you.
            </p>

            <p>Thank you for taking the time to read and reflect alongside me.</p>
          </div>
        </div>

        {}
        <div className="mt-16 pt-8 border-t border-slate-200/60 text-center">
          <h2 className="text-2xl font-light text-slate-900 mb-6">Let's Connect</h2>
          <div className="flex items-center justify-center gap-8">
            <a
              href="mailto:hello@tajirho.com"
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              Email
            </a>
            <a
              href="/rss"
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              RSS Feed
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
