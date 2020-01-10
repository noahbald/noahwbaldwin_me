import React from 'react'
import { Link } from 'react-router-dom'

import Footer from '../components/footer'
import Card from '../components/card'
import FeatureList, {FeatureListItem} from '../components/feature-list'

import isProtocol from '../services/isProtocol'

import './projects.css'

/**
 * Renders `FeatureList` for `Projects`
 * @param {*} props 
 */
function ProjectList(props) {
  const { skeleton, data } = props

  // Return skeleton template is lazy loading is indicated
  if (skeleton) {
    return (
      <section id="project-list">
        <h2 className="highlight-secondary">
          Projects
        </h2>
        <FeatureList skeleton />
      </section>
    )
  }
  if (!skeleton && !data) {
    throw 'Failed to load project data'
  }
  return (
    <section id="project-list">
      <h2 className="highlight-secondary">
        Projects
      </h2>
      <FeatureList>
        {data.map((item) => {
          return (
            <FeatureListItem
              key={item.uid}
              src={item.src}
              to={item.href}
            >
              <h4>
                <strong>{item.title}</strong>
              </h4>
              <p>{item.subtitle}</p>
              <p
                style={{
                  color: '#858898'
                }}
              >{item.type}</p>
              <p
                style={{
                  position: 'absolute',
                  bottom: 32,
                  left: 32,
                }}
              >{item.metadata.year}</p>
              <p
                style = {{
                  position: 'absolute',
                  bottom: 32,
                  right: 32,
                }}
              >{item.metadata.topics.join(', ')}</p>
            </FeatureListItem>
          )
        })}
      </FeatureList>
    </section>
  )
}

/**
 * Renders `/projects` page content
 * @example
 * <Projects />
 */
export default class Projects extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      data: undefined,
    }
    this.loadData()
  }

  /**
   * Lazily load project data
   */
  async loadData() {
    try {
      const dataImport = await import('../data/projects.json')
      this.setState({
        loading: false,
        data: dataImport.default,
      })
    } catch(e) {
      this.setState({
        loading: false,
        data: null,
      })
    }
  }

  render() {
    const { loading, data } = this.state
    return (
      <>
        <ProjectList skeleton={loading} data={data} />
        <Footer homeButton />
      </>
    )
  }
}