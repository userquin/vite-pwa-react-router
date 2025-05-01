import type { MetaFunction } from 'react-router'
import { Link } from 'react-router'

export const meta: MetaFunction = () => {
  return [
    { title: 'React Router PWA App' },
    { name: 'description', content: 'Welcome to React Router PWA!' },
  ]
}

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8', textAlign: 'center' }}>
      <h1>Welcome to PWA React Router</h1>
      <pre>{import.meta.env.VITE_BUILD_DATE}</pre>
      <Link to="/about">About</Link>
      <br />
      <Link to="/hi/Dummy">Hi Dummy</Link>
    </div>
  )
}
