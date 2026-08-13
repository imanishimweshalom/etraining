
import { Link } from 'react-router-dom'

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Trainings', href: '/trainings' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'VR Experience', href: '/vr-experience' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

function Navbar() {
  return (
    <header>
      <nav>
        <Link to="/">
          <strong>eTraining</strong>
        </Link>

        <div>
          {navigation.map((item) => (
            <Link key={item.href} to={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Get Started</Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar

