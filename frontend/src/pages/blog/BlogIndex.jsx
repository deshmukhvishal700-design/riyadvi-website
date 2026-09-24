import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { blogPosts } from '../../data/blog'

export default function BlogIndex() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const categories = useMemo(() => ['All', ...new Set(blogPosts.map((p) => p.category))], [])
  const featured = blogPosts.find((p) => p.featured)

  const filtered = blogPosts.filter((p) => {
    const matchesCategory = category === 'All' || p.category === category
    const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  })

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="font-display text-3xl font-semibold md:text-5xl">Insights</h1>

      {featured && (
        <Link
          to={`/blog/${featured.slug}`}
          className="mt-10 block rounded-2xl border border-gold/30 bg-graphite p-8 transition hover:border-gold"
        >
          <p className="text-xs uppercase tracking-widest text-gold">Featured — {featured.category}</p>
          <h2 className="mt-3 font-display text-2xl font-semibold">{featured.title}</h2>
          <p className="mt-2 text-mist">{featured.excerpt}</p>
        </Link>
      )}

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-lg border border-white/10 bg-graphite px-4 py-2 text-sm text-paper placeholder:text-mist/60 focus:border-gold focus:outline-none"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-4 py-1.5 text-xs ${
                category === c ? 'border-gold text-gold' : 'border-white/10 text-mist hover:border-white/30'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group rounded-2xl border border-white/10 bg-graphite p-6 transition hover:border-gold"
          >
            <p className="text-xs uppercase tracking-wider text-mist">{post.category}</p>
            <h2 className="mt-2 font-display text-lg font-semibold group-hover:text-gold">{post.title}</h2>
            <p className="mt-2 text-sm text-mist">{post.excerpt}</p>
          </Link>
        ))}
        {filtered.length === 0 && <p className="text-mist">No articles match your search.</p>}
      </div>
    </section>
  )
}
