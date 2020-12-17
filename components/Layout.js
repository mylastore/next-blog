import Flash from '../components/Flash'
import Link from "next/link"
import Nav from "./Nav";

const Layout = ({children}) => {
  return (
    <div className="Site">
      <Nav />
      <Flash/>
      <div className="Site-content">
        {children}
      </div>
      <footer className="footer Site-footer">
        <Link href="/quote">
          <a className="noLink">Need a Custom App? Get a Quote</a>
        </Link>
      </footer>
    </div>
  )
}

export default Layout