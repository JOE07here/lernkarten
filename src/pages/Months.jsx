import VisualSection from '../components/VisualSection.jsx'
import { months } from '../data/calendar.js'

export default function Months() {
  return (
    <VisualSection
      title="Monate (Months)"
      subtitle="The 12 months, with a seasonal picture for each. Tap to hear them."
      items={months}
      cols="sm:grid-cols-3 lg:grid-cols-4"
      studyHref="/study/german-a1-months"
    />
  )
}
