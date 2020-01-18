import React from 'react'

import Footer from '../components/footer'
import FeatureList, {FeatureListItem} from '../components/feature-list'

import './projects.css'
import isProtocol from '../services/isProtocol'
import isStatic from '../services/isStatic'

/**
 * Renders `FeatureList` for `Projects`
 * @param {*} props 
 */
function ProjectList(props) {
  const { skeleton, data, history } = props

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
    console.error('Failed to load project data')
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
              to={isProtocol(item.href) ? item.href : `projects/${item.href}`}
              toTitle={item.title}
              history={history}
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
  }

  componentDidMount() {
    this.loadData()
  }

  /**
   * Lazily load project data
   */
  async loadData() {
    try {
      const dataImport = await import('../data/projects.json')
      const data = dataImport.default
      let sources = []
      for (let i = 0; i < data.length; i++) {
        let source = data[i].src
        // If external resource or already imported, don't import
        source = isProtocol(source) || isStatic(source) ? source : import(`./projects/feature-images/${source}`)
        sources.push(source)
      }
      sources = await Promise.all(sources)
      for (let i = 0; i < data.length; i++) {
        data[i].src = typeof sources[i] === 'string' ? sources[i] : sources[i].default
      }
      this.setState({
        loading: false,
        data: data,
      })
    } catch(e) {
      this.setState({
        loading: false,
        data: [
          {
            title: "Failed to get projects",
            subtitle: "Sorry, seems like something went wrong on our end",
            type: "",
            href: '',
            src: "https://via.placeholder.com/560x256?text=N/A",
            uid: "error",
            metadata: {
              year: '',
              topics: [
                ""
              ],
              "client": "",
              "featured": false,
            }
          },
        ],
      })
    }
  }

  render() {
    const { loading, data } = this.state
    const { history } = this.props
    return (
      <>
        <ProjectList skeleton={loading} data={data} history={history} />
        <Footer homeButton />
      </>
    )
  }
}