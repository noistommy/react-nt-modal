import { useState } from 'react'
import { useModal } from '../../src/index.js'
import type { ModalContentProps } from '../../src/index.js'
import style from './TestModal.module.scss'
const LOREM =
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error minima ea nihil, consequatur iusto tempore, odio modi et ab deleniti perferendis reprehenderit at possimus beatae consequuntur harum? Magnam, iste beatae.'

export interface TestModalProps {
  title: string
  description?: string
  pText?: string
  nText?: string
  useHeader?: boolean
  useStack?: boolean
}

export default function TestModal({
  onClose,
  header,
  title,
  description = '본문 작성',
  pText = 'Action',
  nText = 'Cancel',
  useHeader,
  useStack,
}: ModalContentProps & TestModalProps) {
  const { show } = useModal()
  const [h, setH] = useState(useHeader)

  const addModal = () => {
    show({
      comp: TestModal,
      props: {
        title: 'New Modal',
        description: LOREM,
        pText: 'Save',
        useHeader: h,
        useStack,
      },
      options: { useStack },
    })
  }

  const addConfirm = () => {
    show({
      comp: 'confirm',
      props: {
        title: '확인',
        description: '모달 컴펌 테스트 입니까?',
        pText: '확인',
        result: (ok: boolean) => console.log('confirm result:', ok),
      },
    })
  }

  return (
    <div className={`${style.modal} modal`}>
      {useHeader ? header : (
        <div className="title h5 p-5">{title}(user custom title)</div>
      )}
      <div className={`${style.modalContents} modalContents modal-contents`}>
        <div className={`${style.contents} contents`}>
          <div>{description}</div>
          <hr />
          <div className="be flex gap-2 pt-5">
            <label className="be-switch slide inside round">
              <input type="checkbox" checked={h} onChange={() => setH(!h)} />
              <span className="switch"></span>
            </label>
            <label>{h ? 'Use' : 'No'} Header</label>
            <div className={`${style.btnSetAdd} btnSet add btn-set add`}>
              <button className="be-button red compact" onClick={addModal} disabled={!useStack}>New Modal</button>
            </div>
          </div>
        </div>
      </div>
      <div className={`${style.modalFooter} modalFooter modal-footer`}>
        <div className={`${style.btnSet} btnSet`}>
          <button className="nt-button text" onClick={onClose}>{nText}</button>
          <button className="nt-button primary" onClick={addConfirm}>{pText}</button>
        </div>
      </div>
    </div>
  )
}
