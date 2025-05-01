import { Link, useParams } from 'react-router'

const date = import.meta.env.VITE_BUILD_DATE

export default function Hi() {
  const params = useParams<'name'>()

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8', textAlign: 'center' }}>
      <h1>Hi React Router PWA</h1>
      <div>
        <strong>/hi</strong>
        {' '}
        route, built at:
        {date}
      </div>
      <p>
        Hi:
        {params.name}
      </p>
      <br />
      <Link to="/">Go Home</Link>
    </div>
  )
}
