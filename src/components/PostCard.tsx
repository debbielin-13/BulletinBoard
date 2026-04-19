import type { Post } from '../types'

interface Props {
  post: Post
  isLatest?: boolean
}

export default function PostCard({ post, isLatest = false }: Props) {
  return (
    <article className={isLatest ? 'latest-card' : 'history-card'}>
      <div className="pin">📌</div>
      <h3>{post.title}</h3>
      <div className="card-content">{post.message}</div>
      <div className="meta">
        發布人：{post.author} ｜ 發布時間：{post.time}
      </div>
    </article>
  )
}
