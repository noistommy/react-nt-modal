import type { ComponentType, ReactNode } from 'react'

export interface ModalOptions {
  /** Allow nested modals to stack on top of each other instead of replacing. */
  useStack: boolean
  /** Close the modal when clicking the dimmed background. */
  clickToClose: boolean
  /** Close the modal when pressing the ESC key. */
  escapeToClose: boolean
  /** Pixel offset applied per stacked modal (visual "cascade" effect). */
  offset: number
}

/** Props every modal content component automatically receives. */
export interface ModalContentProps {
  modalId: number
  onClose: () => void
  /** Pre-built header (title + close button), mirrors the Vue `header` slot. */
  header: ReactNode
}

export type ModalComponent<P = Record<string, unknown>> = ComponentType<ModalContentProps & P>

export interface ShowModalArgs<P = Record<string, unknown>> {
  /** A content component, or the string 'confirm' to use the built-in Confirm dialog. */
  comp: ModalComponent<P> | 'confirm'
  /** Props forwarded to the content component (or to Confirm). */
  props?: P
  /** Per-call option overrides, merged over the provider's defaults. */
  options?: Partial<ModalOptions>
}

export interface ModalEntry {
  id: number
  comp: ModalComponent<ReactNode> | 'confirm'
  props: Record<string, unknown>
  options: ModalOptions
}

export interface ModalContextValue {
  show: <P = Record<string, unknown>>(args: ShowModalArgs<P>) => void
  /** Closes the modal with the given id. Omit the id to close the topmost modal. */
  close: (id?: number) => void
  closeAll: () => void
}

export interface ConfirmProps {
  title?: string
  description?: string
  pText?: string
  nText?: string
  /** Called with `true` when the user confirms. */
  result?: (confirmed: boolean) => void
}
