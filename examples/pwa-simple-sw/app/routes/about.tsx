import type { MetaFunction } from 'react-router'
import { Link } from 'react-router'

const date = import.meta.env.VITE_BUILD_DATE

export const meta: MetaFunction = () => {
  return [
    { title: 'About React Router PWA' },
    { name: 'description', content: 'About React Router PWA!' },
  ]
}

export default function Hi() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8', textAlign: 'center' }}>
      <h1>About React Router PWA</h1>
      <div>
        <strong>/about</strong>
        {' '}
        route, built at:
        {date}
      </div>
      <br />
      <Link to="/">Go Home</Link>
    </div>
  )
}
