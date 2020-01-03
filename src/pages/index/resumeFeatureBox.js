import uuid from '../../services/uid'

import reactSVG from './resumeMedia/react.svg'
import materialSVG from './resumeMedia/material-design.svg'

const experience = `{"title":"Skills","image":"https://picsum.photos/512/512","uid":"${uuid()}","contents":[{"uid":"${uuid()}","icon":"${reactSVG}","title":"React","body":"I can work with you and your next team's project in React, or quickly pick up your team's preferred framework."},{"uid":"${uuid()}","icon":"${materialSVG}","title":"User Experience & Design","body":"Let me create human focused experiences for your next project"}]}`
const skills = `{"title":"Education","image":"https://picsum.photos/512/512","uid":"${uuid()}","contents":[{"uid":"${uuid()}","icon":"${reactSVG}","title":"Software B.E at Monash","body":"I can work with you and your next team's project in React, or quickly pick up your team's preferred framework."},{"uid":"${uuid()}","icon":"${materialSVG}","title":"VCE at St Leonard's","body":"Let me create human focused experiences for your next project"}]}`
const education = `{"title":"Experience","image":"https://picsum.photos/512/512","uid":"${uuid()}","contents":[{"uid":"${uuid()}","icon":"${reactSVG}","title":"Deloitte Vacationer","body":"I can work with you and your next team's project in React, or quickly pick up your team's preferred framework."},{"uid":"${uuid()}","icon":"${materialSVG}","title":"Monash eSolutions","body":"Let me create human focused experiences for your next project"}]}`
const resumeContent = JSON.parse(`[${experience},${skills},${education}]`)

export default resumeContent
