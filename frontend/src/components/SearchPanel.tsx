import { useState } from 'react'
import type { Post } from '../types'
import { searchPosts } from '../api'
import PostCard from './PostCard'

export default function SearchPanel() {
  const [query, setQuery] = useState('')
  // results: null 代表尚未搜尋；[] 代表有搜尋但無結果
  const [results, setResults] = useState<Post[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const q = query.trim()
    if (!q) {
      setResults(null)
      setError(null)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const posts = await searchPosts(q)
      setResults(posts)
    } catch (err) {
      setError(err instanceof Error ? err.message : '搜尋失敗')
    } finally {
      setLoading(false)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setQuery(value)
    if (value === '') {
      setResults(null)
      setError(null)
    }
  }

  return (
    <section className="search-panel">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="搜尋公告標題或內容…"
          value={query}
          onChange={handleChange}
        />
        <button className="search-btn" type="submit" disabled={loading}>
          {loading ? '搜尋中…' : '搜尋'}
        </button>
      </form>

      {loading ? (
        <div className="empty">搜尋中…</div>
      ) : error ? (
        <div className="empty">搜尋失敗：{error}</div>
      ) : results !== null ? (
        results.length > 0 ? (
          <div className="search-results">
            {results.map((post, i) => <PostCard key={i} post={post} />)}
          </div>
        ) : (
          <div className="empty">目前沒有符合的公告。</div>
        )
      ) : null}
    </section>
  )
}
