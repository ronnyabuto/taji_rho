import type { BlogPost } from "../../lib/types"
import { generateSEOMetadata } from "../../components/seo-head"
import PostPageClient from "./PostPageClient"

// Simulated blog posts data
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Art of Digital Minimalism",
    excerpt:
      "In a world saturated with digital noise, the pursuit of simplicity becomes not just a preference, but a necessity for mental clarity and creative focus.",
    content: `In a world saturated with digital noise, the pursuit of simplicity becomes not just a preference, but a necessity for mental clarity and creative focus.

The concept of digital minimalism isn't merely about using fewer apps or spending less time online. It's about being intentional with our digital choices, curating our technological environment with the same care we might apply to arranging a beautiful living space.

When we strip away the unnecessary, what remains is clarity. The mind, no longer fragmented by constant notifications and digital clutter, can focus on what truly matters. This is the essence of digital minimalism—not deprivation, but liberation.

Consider the difference between a cluttered desk and a clean one. The clean desk doesn't just look better; it functions better. Our minds work similarly. When we reduce digital clutter, we create space for deeper thinking, more meaningful connections, and genuine creativity.

The path to digital minimalism begins with awareness. Notice how different apps and digital tools make you feel. Do they add value to your life, or do they merely consume your attention? This awareness is the first step toward a more intentional digital existence.

In embracing digital minimalism, we don't reject technology—we choose it more carefully. We become curators of our own digital experience, selecting only those tools and platforms that align with our values and support our goals.

The result is not just a cleaner digital life, but a richer, more focused existence where technology serves us, rather than the other way around.`,
    createdAt: new Date("2024-01-15"),
    readTime: 8,
    author: "Taji Rho",
    published: true,
    tags: ["minimalism", "technology", "productivity"],
  },
  {
    id: "2",
    title: "Thoughts on the Future of Human Connection",
    excerpt:
      "As technology advances, we find ourselves at a crossroads between digital convenience and authentic human interaction.",
    content: `As technology advances, we find ourselves at a crossroads between digital convenience and authentic human interaction.

The paradox of our time is that we are more connected than ever, yet many feel increasingly isolated. We can reach anyone, anywhere, at any time—but do we truly connect?

Digital communication has given us unprecedented reach, but it has also introduced new barriers to genuine understanding. The nuances of human expression—the pause before speaking, the warmth in someone's eyes, the comfort of physical presence—these elements of connection are often lost in translation through screens.

Yet technology is not inherently the enemy of human connection. The tools themselves are neutral; it's how we use them that determines their impact on our relationships and our humanity.

The future of human connection lies not in choosing between digital and physical interaction, but in learning to use technology in ways that enhance rather than replace authentic human experiences. This means being present when we're with others, using technology to facilitate rather than substitute for real connection, and remembering that behind every screen is a human being with their own hopes, fears, and dreams.

Perhaps the most profound connections happen when we're vulnerable, when we share not just our successes but our struggles, not just our thoughts but our feelings. This kind of authentic sharing can happen through any medium, but it requires intention, courage, and genuine care for the other person.

As we move forward, the challenge is to remain human in an increasingly digital world—to use our tools wisely while never forgetting that our greatest need is not for more efficient communication, but for deeper understanding and genuine love.`,
    createdAt: new Date("2024-01-12"),
    readTime: 12,
    author: "Taji Rho",
    published: true,
    tags: ["technology", "relationships", "society"],
  },
  {
    id: "3",
    title: "The Philosophy of Anonymous Expression",
    excerpt:
      "When we remove the weight of identity from our words, what remains is the pure essence of thought and feeling.",
    content: `When we remove the weight of identity from our words, what remains is the pure essence of thought and feeling.

Anonymity in expression is not about hiding—it's about revealing. When we write without the burden of reputation, social expectations, or personal branding, we can explore ideas more freely, express emotions more honestly, and connect with others on a deeper level.

In our age of personal brands and curated online personas, anonymous expression offers something rare: authenticity without consequence. It creates a space where ideas can be judged on their merit rather than their source, where vulnerability is possible without fear of judgment.

This freedom comes with responsibility. Without the accountability that comes with identity, we must hold ourselves to even higher standards of honesty, kindness, and thoughtfulness. Anonymous expression at its best is not careless but careful—more considered, not less.

The beauty of anonymous writing lies in its universality. When we read words without knowing their author, we're more likely to see ourselves in them, to find common ground with experiences that might otherwise seem foreign. The anonymous voice becomes everyone's voice and no one's voice simultaneously.

In a world where everything is tracked, recorded, and attributed, choosing anonymity is itself a radical act. It's a declaration that some thoughts are worth sharing simply because they're true, not because they'll enhance our reputation or advance our careers.

Perhaps this is the highest form of expression: words offered freely to the world, with no expectation of credit or recognition, given simply because they might help someone else feel less alone in their thoughts and experiences.`,
    createdAt: new Date("2024-01-10"),
    readTime: 6,
    author: "Taji Rho",
    published: true,
    tags: ["philosophy", "writing", "identity"],
  },
]

interface PostPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: PostPageProps) {
  const resolvedParams = await params
  const post = blogPosts.find((p) => p.id === resolvedParams.id)

  if (!post) {
    return generateSEOMetadata({
      title: "Post Not Found",
      description: "The requested post could not be found.",
      path: `/post/${resolvedParams.id}`,
    })
  }

  return generateSEOMetadata({
    post,
    path: `/post/${post.id}`,
  })
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params
  return <PostPageClient params={resolvedParams} />
}
