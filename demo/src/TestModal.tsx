import { useModal } from '../../src/index.js'
import type { ModalContentProps } from '../../src/index.js'
import style from './TestModal.module.scss'
const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio quis velit vulputate luctus.'

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

  const addModal = () => {
    show({
      comp: TestModal,
      props: {
        title: '모달 테스트',
        description: '모달 테스트 입니다.',
        pText: '저장',
        useHeader: true,
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
      options: {},
    })
  }

  return (
    <div className={`${style.modal} modal`}>
      {useHeader && header}

      <div className={`${style.modalContents} modalContents modal-contents`}>
        <div className={`${style.contents} contents`}>
          {!useHeader && (
            <>
              <div className="h3 title">{title}</div>
              <div className="close-btn" onClick={onClose}>
                <i className="xi-close" />
              </div>
            </>
          )}
          <div>{description}</div>
          <div>{LOREM}</div>
        </div>
      </div>

      <div className={`${style.modalFooter} modalFooter modal-footer`}>
        {useStack && (
          <div className={`${style.btnSetAdd} btnSet add btn-set add`}>
            <button className="nt-button" onClick={addModal}>New</button>
          </div>
        )}
        <div className={`${style.btnSet} btnSet`}>
          <button className="nt-button text" onClick={onClose}>{nText}</button>
          <button className="nt-button primary" onClick={addConfirm}>{pText}</button>
        </div>
      </div>
    </div>
  )
}
