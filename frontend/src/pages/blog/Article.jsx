import { useParams, Link } from 'react-router-dom'
import { getPostBySlug, blogPosts } from '../../data/blog'

export default function Article() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl">Article not found</h1>
        <Link to="/blog" className="mt-4 inline-block text-gold">← Back to blog</Link>
      </section>
    )
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2)

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-sm uppercase tracking-widest text-gold">{post.category}</p>
      <h1 className="mt-3 font-display text-3xl font-semibold md:text-5xl">{post.title}</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((t) => (
          <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-mist">{t}</span>
        ))}
      </div>
      <p className="mt-8 text-lg leading-relaxed text-mist">{post.content}</p>

      {related.length > 0 && (
        <div className="mt-16 border-t border-white/10 pt-8">
          <h2 className="font-display text-lg font-semibold text-gold">Related articles</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {related.map((r) => (
              <Link key={r.slug} to={`/blog/${r.slug}`} className="rounded-full border border-white/10 px-4 py-2 text-sm hover:border-gold hover:text-gold">
                {r.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
