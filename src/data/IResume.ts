interface IResume {
  metadata: Record<string, any>
  record: {
    intro: string
    items: {
      title: string
      image: string
      imageAlt: string
      uid: string
      contents: {
        body: string
        icon: string
        title: string
        uid: string
      }[]
    }[]
  }
}
export default IResume
