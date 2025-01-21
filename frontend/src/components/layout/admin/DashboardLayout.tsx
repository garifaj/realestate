import BookingsReportSection from './BookingsReportSection'
import DashboardCards from './DashboardCards'
import MessagesReportSection from './MessagesReportSection'

const DashboardLayout = () => {
  return (
    <div className="container-fluid">
      <DashboardCards/>
      <BookingsReportSection/>
      <MessagesReportSection/>
    </div>
  )
}

export default DashboardLayout
