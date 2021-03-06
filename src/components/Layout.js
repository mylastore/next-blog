import Flash from '../components/Flash'
import Link from "next/link"
import Nav from "./Nav"
import {APP_NAME} from "../config";

const d = new Date();
const currentYear = d.getFullYear();

const Layout = ({children}) => {
  return (
    <div className="Site">
      <Nav/>
      <Flash/>
      <div className="Site-content">
        {children}
      </div>
      <footer className="Site-footer">
        <div className={'footer'}>
          <Link href="/quote">
            <a className={'noLink'}>Need a Custom App?</a>
          </Link>
          <p>
            © {currentYear} - {APP_NAME}- <Link href="/privacy"><a className={'noLink'}>Privacy Policy</a></Link>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
