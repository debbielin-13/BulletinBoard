import './App.css'
import BoardShell from './components/BoardShell'

export default function App() {
  return (
    <div className="page">
      <div className="page-header">
        <h1>簡易佈告欄系統</h1>
        <p>主畫面先看公告，新增功能收合在上方，較符合實際使用情境</p>
      </div>
      <BoardShell />
    </div>
  )
}
