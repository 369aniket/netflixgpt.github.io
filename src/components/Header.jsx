import { logo_URL } from "../utils/links"
const Header = () => {
  return (
    <div className="absolute px-8 py-2 z-10 bg-gradient-to-b from-black">
      <img src={logo_URL} alt="Logo" className="w-2/12 "/>
    </div>
  )
}

export default Header;