import { useEffect, useState } from 'react'
import { useModal } from './ModalProvider.tsx'
import type { ModalEntry, ModalContentProps } from './types.ts'

const TRANSITION_MS = 250

export default function Modal({ id, comp, props, options }: ModalEntry) {
  const { close } = useModal()
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)

  const Content = comp as React.ComponentType<ModalContentProps & Record<string, unknown>>

  // mirrors onMounted -> nextTick(() => isVisible.value = true)
  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  const requestClose = () => {
    if (closing) return
    setClosing(true)
    setVisible(false)
    window.setTimeout(() => close(id), TRANSITION_MS)
  }

  useEffect(() => {
    if (!options.escapeToClose) return
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.keyCode === 27) requestClose()
    }
    window.addEventListener('keydown', handleEscapeKey)
    return () => window.removeEventListener('keydown', handleEscapeKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.escapeToClose, closing])

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    if (options.clickToClose && target.classList.contains('nt-modal-background')) {
      requestClose()
    }
  }

  const offsetStyle = {
    '--offset': `${(id % 5) * (options.offset ?? 0)}px`,
  } as React.CSSProperties

  const header = (
    <div className="modal-header">
      <div className="title">{props.title as React.ReactNode}</div>
      <div className="close-btn" onClick={requestClose}>
        <i className="xi-close" />
      </div>
    </div>
  )

  return (
    <div
      className={`nt-modal nt-modal-fade-${visible ? 'enter' : 'exit'}-active`}
      style={offsetStyle}
    >
      <div className="nt-modal-background" onClick={handleBackgroundClick} />
      <div className="nt-modal-container">
        <Content modalId={id} onClose={requestClose} header={header} {...props} />
      </div>
    </div>
  )
}
