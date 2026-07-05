import { useEffect, useState } from 'react'
import { useModal } from './ModalProvider.tsx'
import type { ConfirmProps, ModalOptions } from './types.ts'

const TRANSITION_MS = 500

interface ConfirmComponentProps {
  id: number
  props: ConfirmProps
  options: ModalOptions
}

export default function Confirm({ id, props, options }: ConfirmComponentProps) {
  const { close, closeAll } = useModal()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  const dismiss = (afterClose: () => void) => {
    setVisible(false)
    window.setTimeout(() => {
      afterClose()
    }, TRANSITION_MS)
  }

  const handleCancel = () => {
    dismiss(() => close(id))
  }

  const handleConfirm = () => {
    props.result?.(true)
    dismiss(closeAll)
  }

  const offsetStyle = {
    '--offset': `${(id % 5) * (options?.offset ?? 20)}px`,
  } as React.CSSProperties

  return (
    <div
      className={`nt-confirm nt-modal-fade-${visible ? 'enter' : 'exit'}-active`}
      style={offsetStyle}
    >
      <div className="nt-modal-background" />
      <div className="nt-modal-container">
        <div className="modal confirm">
          <div className="modal-header">
            <div className="title">{props.title}</div>
            <div className="close-btn" onClick={handleCancel}>
              <i className="xi-close" />
            </div>
          </div>
          <div className="modal-contents">
            <div className="contents">
              <div>{props.description}</div>
            </div>
          </div>
          <div className="modal-footer align-right">
            <button className="nt-button text" onClick={handleCancel}>
              {props.nText || 'Cancel'}
            </button>
            <button className="nt-button primary" onClick={handleConfirm}>
              {props.pText || 'Confirm'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
