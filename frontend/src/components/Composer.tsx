import { useState } from 'react'
import type { Post } from '../types'
import { createPost } from '../api'

interface Props {
  onPublish: (post: Post) => void
}

export default function Composer({ onPublish }: Props) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [author, setAuthor] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handlePublish() {
    if (!title.trim() || !message.trim() || !author.trim()) {
      alert('請把文字、訊息、發布人都填寫完整。')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const post = await createPost({
        title: title.trim(),
        message: message.trim(),
        author: author.trim(),
      })
      onPublish(post)
      setTitle('')
      setMessage('')
      setAuthor('')
      setOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : '發布失敗，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="composer-wrap">
      <button
        className="toggle-btn"
        type="button"
        onClick={() => setOpen(o => !o)}
      >
        {open ? '收合張貼區' : '＋ 張貼公告'}
      </button>

      <div className={`composer-panel${open ? ' open' : ''}`}>
        <div className="composer-grid">
          <div className="composer-main">
            <div className="field">
              <label htmlFor="titleInput">文字</label>
              <input
                id="titleInput"
                type="text"
                placeholder="例如：停車場施工通知"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="messageInput">訊息</label>
              <textarea
                id="messageInput"
                placeholder="請輸入公告內容"
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </div>
          </div>

          <div className="composer-side">
            <div className="field">
              <label htmlFor="authorInput">發布人</label>
              <input
                id="authorInput"
                type="text"
                placeholder="例如：總務組"
                value={author}
                onChange={e => setAuthor(e.target.value)}
              />
            </div>
            <button
              className="publish-btn"
              type="button"
              onClick={handlePublish}
              disabled={loading}
            >
              {loading ? '發布中…' : '發布公告'}
            </button>
            {error && <p className="hint" style={{ color: 'red' }}>{error}</p>}
            <p className="hint">
              建議先填標題，再補內容。<br />
              發布後會自動成為最新公告。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
