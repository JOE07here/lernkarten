import VisualSection from '../components/VisualSection.jsx'
import { seasons } from '../data/calendar.js'

export default function Seasons() {
  return (
    <VisualSection
      title="Jahreszeiten (Seasons)"
      subtitle="The 4 seasons and the months they cover. Tap to hear them."
      items={seasons}
      cols="sm:grid-cols-2 lg:grid-cols-4"
      studyHref="/study/german-a1-seasons"
    />
  )
}
