import React, { createRef, useEffect, useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import './page.scss'

interface PageProps extends React.PropsWithChildren {}

const Page: React.FC<PageProps> = () => {
  const location = useLocation()
  const outlet = useOutlet()
  const [refs, setRefs] = useState<Record<string, React.LegacyRef<HTMLDivElement>>>({})

  useEffect(() => {
    const newRefs = { ...refs }
    if (!newRefs[location.pathname]) {
      newRefs[location.pathname] = createRef<HTMLDivElement>()
      setRefs(newRefs)
    }
  }, [location.pathname])

  return (
    <SwitchTransition>
      <CSSTransition
        key={location.pathname}
        timeout={500}
        classNames="page-"
        nodeRef={refs[location.pathname] as React.Ref<HTMLDivElement>}
        unmountOnExit
      >
        {() => (
          <main
            key={location.pathname}
            ref={refs[location.pathname]}
            className="page"
          >
            <div
              className="page__inner"
            >
              {outlet}
            </div>
          </main>
        )}
      </CSSTransition>
    </SwitchTransition>
  )
}
export default Page
