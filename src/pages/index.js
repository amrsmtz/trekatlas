import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const IndexPage = () => (
  <Layout>
    <div className={styles.hero}>
      <StaticImage
        src="../images/earth.png"
        loading="eager"
        width={80}
        quality={95}
        formats={["auto", "webp", "avif"]}
        alt=""
      />
      <h1>
        Welcome to <b>TrekAtlas!</b>
      </h1>
      <p className={styles.tagline}>
        Sharpen your world knowledge, one capital at a time.
      </p>
    </div>
    <div className={styles.gameGrid}>
      <Link to="/guess-the-capital/" className={styles.gameCard}>
        <span className={styles.gameEmoji} aria-hidden="true">🗺️</span>
        <h2>Guess the Capital</h2>
        <p>Endless practice — take your time and learn as you go.</p>
      </Link>
      <Link to="/guess-the-capital-score/" className={styles.gameCard}>
        <span className={styles.gameEmoji} aria-hidden="true">🏆</span>
        <h2>Challenge Mode</h2>
        <p>10 rounds, one score. How well do you know the world?</p>
      </Link>
    </div>
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
