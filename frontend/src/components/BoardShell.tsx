import { useState } from 'react'
import type { ThemeKey, Post } from '../types'
import { themeMap } from '../data/themes'
import { initialPosts } from '../data/initialPosts'
import Composer from './Composer'
import PostCard from './PostCard'

export default function BoardShell() {
  const [theme, setTheme] = useState<ThemeKey>('office')
  const [posts, setPosts] = useState<Post[]>(initialPosts)

  const { className, title } = themeMap[theme]

  function handlePublish(post: Post) {
    setPosts(prev => [post, ...prev])
  }

  const latestPost = posts[0]
  const historyPosts = posts.slice(1)

  return (
    <section className={`board-shell ${className}`}>
      <div className="board-topbar">
        <div className="board-heading">
          <h2>{title}</h2>
          <div className="board-subtitle">最新公告會固定顯示在最上方，方便快速查看</div>
        </div>

        <div className="theme-switcher">
          <label htmlFor="themeSelect">風格</label>
          <select
            id="themeSelect"
            value={theme}
            onChange={e => setTheme(e.target.value as ThemeKey)}
          >
            <option value="office">辦公室</option>
            <option value="classroom">教室</option>
            <option value="fridge">冰箱</option>
          </select>
        </div>
      </div>

      <Composer onPublish={handlePublish} />

      <div className="sections">
        <div className="section-title">最新公告</div>
        <div className="latest-area">
          {latestPost ? (
            <PostCard post={latestPost} isLatest />
          ) : (
            <div className="empty">目前沒有公告。</div>
          )}
        </div>

        <div className="section-title">歷史訊息</div>
        <div className="history-area">
          {historyPosts.length > 0 ? (
            historyPosts.map((post, i) => <PostCard key={i} post={post} />)
          ) : (
            <div className="empty">目前沒有歷史訊息。</div>
          )}
        </div>
      </div>
    </section>
  )
}
