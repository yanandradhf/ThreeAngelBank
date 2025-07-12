import RightContent from "../../components/RightContent"
import LeftContent from "./LeftContent"

const HeroContainer = () => {
  return (
    <div className="grid h-screen grid-cols-1 lg:grid-cols-2">
      <LeftContent />
      <RightContent />
    </div>
  )
}

export default HeroContainer
