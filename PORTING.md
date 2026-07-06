# react-nt-modal

`vue-nt-modal`(https://github.com/noistommy/vue-nt-modal)을 React + TypeScript로 그대로 포팅한 버전입니다.
동일한 클래스명(`nt-modal`, `nt-modal-container`, `nt-button` 등)과 CSS 구조를 사용하므로
기존 `nt-modal.scss` 스타일이나 커스텀 테마를 그대로 재사용할 수 있습니다.

## 설치

```
npm install react react-dom
npm install -D typescript @types/react @types/react-dom
```
(별도 런타임 의존성 없음 — mitt 이벤트버스는 React Context/state로 대체했습니다)

CSS를 번들러 없이 TS로만 typecheck 하는 경우, `src/env.d.ts`의
`declare module '*.css'` 선언이 필요합니다 (Vite/CRA 등 대부분의 번들러는 이미 자체 제공하므로 중복이어도 무해합니다).

## 사용법

### 1. Provider로 감싸기 (Vue의 `app.use(NtModal, options)`에 대응)

```jsx
import { ModalProvider } from './react-nt-modal/src'

export default function App() {
  return (
    <ModalProvider options={{ useStack: true, clickToClose: false, escapeToClose: false, offset: 20 }}>
      <YourApp />
    </ModalProvider>
  )
}
```

### 2. 모달 열기 (`inject('$ntModal')` → `useModal()`)

```tsx
import { useModal, type ModalContentProps } from './react-nt-modal/src'
import MyModalContent, { type MyModalContentProps } from './MyModalContent'

function SomeComponent() {
  const { show } = useModal()

  const open = () => {
    show<MyModalContentProps>({
      comp: MyModalContent,     // 컴포넌트 or 'confirm'
      props: { title: '제목' }, // 컨텐츠 컴포넌트에 전달될 props (타입 체크됨)
      options: { clickToClose: true }, // 이 모달만의 옵션 (선택)
    })
  }

  return <button onClick={open}>Open</button>
}
```

### 3. 컨텐츠 컴포넌트에서 닫기 (Vue의 `$emit('close')` → `onClose` prop)

```tsx
import type { ModalContentProps } from './react-nt-modal/src'

export interface MyModalContentProps {
  title: string
  useHeader?: boolean
}

function MyModalContent({
  onClose,
  header,
  useHeader,
  title,
}: ModalContentProps & MyModalContentProps) {
  return (
    <div className="modal">
      {useHeader && header /* NtModal이 자동 생성한 title + close 버튼 */}
      <div className="modal-contents">...</div>
      <div className="modal-footer">
        <button className="nt-button text" onClick={onClose}>취소</button>
      </div>
    </div>
  )
}
```

`ModalContentProps`는 모든 컨텐츠 컴포넌트가 자동으로 받는 `modalId`, `onClose`, `header`를
정의합니다. 여기에 자신의 컴포넌트 전용 props 타입을 `&`로 합쳐서 사용하세요.

## Vue → React 매핑

| vue-nt-modal | react-nt-modal | 비고 |
|---|---|---|
| `app.use(NtModal, options)` | `<ModalProvider options={...}>` | 전역 설정 |
| `inject('$ntModal')` | `useModal()` | show / close / closeAll |
| `mitt` 이벤트버스 | React Context + `useState` | 별도 의존성 제거 |
| `<teleport to="body">` | `createPortal(..., document.body)` | 동일 동작 |
| `<component :is="compContents">` | `<Content {...props} />` (JSX에서 컴포넌트를 변수로 렌더) | |
| `<slot name="header">` | `header` prop (JSX 엘리먼트) | 컨텐츠 컴포넌트가 `useHeader` 조건에 따라 직접 렌더 |
| `$emit('close')` | `onClose` prop (콜백) | |
| `modal-id` prop | `modalId` prop | |
| `<transition name="fade">` | CSS 클래스 토글(`nt-modal-fade-enter-active` / `-exit-active`) + `setTimeout`으로 unmount 지연 | React엔 내장 트랜지션 컴포넌트가 없어 수동 구현 |
| `useStack` (스택형 중첩 모달) | 동일 | 배열에 push vs 단일 교체 |
| `clickToClose` / `escapeToClose` | 동일 | |
| `offset` (스택 시 카드 밀림 효과) | 동일 (`--offset` CSS 변수) | |
| `NtConfirm.vue` | `Confirm.jsx` | 내장 확인창, `comp: 'confirm'`로 호출 |

## 원본과 달라진 점 (개선)

- **`close(id)` 동작**: 원본은 `id` 인자를 받지만 실제로는 항상 배열의 마지막 요소를 pop합니다(스택이 아닌 경우 문제 없지만, 특정 모달만 골라 닫고 싶을 때는 의도대로 동작하지 않음). React 버전은 `id`로 정확히 해당 모달만 제거합니다. 인자 없이 호출하면 원본과 동일하게 마지막 모달을 닫습니다.
- **닫힘 트랜지션**: 원본은 Vue의 `<transition>`이 언마운트를 자동으로 지연시켜주지만, React에는 그런 기능이 없어 `setTimeout`으로 애니메이션 시간(500ms)만큼 실제 제거를 지연시켰습니다.

## 파일 구조

```
react-nt-modal/
├── tsconfig.json           # 권장 컴파일러 옵션 (strict 포함)
├── package.json
├── src/
│   ├── types.ts            # ModalOptions, ModalContentProps, ShowModalArgs 등 공용 타입
│   ├── ModalProvider.tsx   # Context, Portal 컨테이너, useModal 훅
│   ├── Modal.tsx           # 개별 모달 래퍼 (transition, ESC, click-outside, offset)
│   ├── Confirm.tsx         # 내장 confirm 다이얼로그
│   ├── nt-modal.css        # 원본 scss를 포팅한 스타일
│   ├── env.d.ts            # `*.css` 모듈 선언 (번들러 없이 typecheck 시 필요)
│   └── index.ts            # barrel export (타입 re-export 포함)
└── example/
    ├── App.tsx             # 데모 (원본 HelloWorld.vue 대응)
    └── TestModal.tsx       # 예시 컨텐츠 컴포넌트 (원본 TestModal.vue 대응)
```

`npx tsc --noEmit`로 타입 오류 없이 컴파일되는 것을 확인했습니다.