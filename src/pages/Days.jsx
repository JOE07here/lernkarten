import VisualSection from '../components/VisualSection.jsx'
import { days } from '../data/calendar.js'

export default function Days() {
  return (
    <VisualSection
      title="Wochentage (Days)"
      subtitle="The 7 days are all masculine (der). Tap to hear them."
      items={days}
      cols="sm:grid-cols-3 lg:grid-cols-4"
      studyHref="/study/german-a1-days"
    />
  )
}
