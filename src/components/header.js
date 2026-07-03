import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Header = ({ siteTitle }) => (
  <header className="site-header">
    <div className="site-header-inner">
      <Link to="/" className="site-header-brand">
        <StaticImage
          src="../images/earth.png"
          alt=""
          width={26}
          height={26}
          placeholder="none"
        />
        <span>{siteTitle}</span>
      </Link>
    </div>
  </header>
)

export default Header
