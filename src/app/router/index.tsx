
import { Route, Routes } from 'react-router-dom'
import PublicLayout from '../../layouts/PublicLayout'

function Home() {
  return <h1>eTraining</h1>
}

function Trainings() {
  return <h1>Trainings</h1>
}

function ConstructionSafety() {
  return <h1>Construction-Site Safety Training</h1>
}

function About() {
  return <h1>About eTraining</h1>
}

function HowItWorks() {
  return <h1>How It Works</h1>
}

function VRExperience() {
  return <h1>VR Experience</h1>
}

function Contact() {
  return <h1>Contact</h1>
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/trainings" element={<Trainings />} />
        <Route
          path="/trainings/construction-safety"
          element={<ConstructionSafety />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/vr-experience" element={<VRExperience />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}

