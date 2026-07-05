import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import Modal from './Modal.tsx'
import Confirm from './Confirm.tsx'
import type { ModalContextValue, ModalEntry, ModalOptions, ShowModalArgs } from './types.ts'
import './nt-modal.scss'

const defaultModalOptions: ModalOptions = {
  useStack: true,
  clickToClose: false,
  escapeToClose: false,
  offset: 0,
}

const ModalContext = createContext<ModalContextValue | null>(null)

interface ModalProviderProps {
  children: ReactNode
  options?: Partial<ModalOptions>
}

/**
 * Wrap your app with <ModalProvider>, equivalent to
 * `app.use(NtModal, defaultOptions)` in the Vue plugin.
 *
 * <ModalProvider options={{ clickToClose: true }}>
 *   <App />
 * </ModalProvider>
 */
export function ModalProvider({ children, options = {} }: ModalProviderProps) {
  const defaultOptions: ModalOptions = { ...defaultModalOptions, ...options }
  const [modals, setModals] = useState<ModalEntry[]>([])
  const modalIndexRef = useRef(0)

  const show = useCallback(
    <P,>({ comp, props, options: modalOptions }: ShowModalArgs<P>) => {
      const mergedOptions: ModalOptions = { ...defaultOptions, ...modalOptions }
      const entry: ModalEntry = {
        id: modalIndexRef.current++,
        comp: comp as ModalEntry['comp'],
        props: (props ?? {}) as Record<string, unknown>,
        options: mergedOptions,
      }

      setModals(prev => {
        return mergedOptions.useStack ? [...prev, entry] : [entry]
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [defaultOptions]
  )

  // close(id): closes a specific modal by id.
  // (The original Vue version always pops the last item regardless of
  // the id passed in — this version closes the exact modal requested,
  // which matters once you have more than one open at a time.)
  const close = useCallback(() => {
    setModals(prev => {
      return prev.slice(0, -1)
    })
    modalIndexRef.current--
  }, [])

  const closeAll = useCallback(() => {
    setModals([])
    modalIndexRef.current = 0
  }, [])

  useEffect(() => {
    document.body.style.overflow = modals.length > 0 ? 'hidden' : ''
    return () => {
      if (modals.length === 0) document.body.style.overflow = ''
    }
  }, [modals.length])

  const contextValue: ModalContextValue = useMemo(
    () => ({ show, close, closeAll }),
    [show, close, closeAll]
  )

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {modals.length > 0 &&
        createPortal(
          <div className="nt-modals">
            {modals.map(modal =>
              modal.comp === 'confirm' ? (
                <Confirm key={modal.id} {...modal} />
              ) : (
                <Modal key={modal.id} {...modal} />
              )
            )}
          </div>,
          document.body
        )}
    </ModalContext.Provider>
  )
}

/**
 * useModal() — equivalent to `inject('$ntModal')`.
 *
 * const modal = useModal()
 * modal.show({ comp: MyComponent, props: { title: 'Hi' }, options: {} })
 */
export function useModal(): ModalContextValue {
  const ctx = useContext(ModalContext)
  if (!ctx) {
    throw new Error('useModal() must be used within a <ModalProvider>')
  }
  return ctx
}
