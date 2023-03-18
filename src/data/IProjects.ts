interface IProjects {
  metadata: Record<string, any>
  record: {
    externalLinks?: Record<string, string>
    href: string
    markdown: string
    metadata: {
      year: number
      topics: string[]
      client: string
      featured: boolean
    }
    src: string
    subtitle: string
    title: string
    type: string
    uid: string
  }[]
}
export default IProjects
