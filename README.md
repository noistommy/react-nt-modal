# react-nt-modal

![Static Badge](https://img.shields.io/badge/react-only-%234FC08D?style=for-the-badge)
![Static Badge](https://img.shields.io/badge/javascript-%23F7DF1E?style=for-the-badge)
![Static Badge](https://img.shields.io/badge/html-%23E34F26?style=for-the-badge&logo=html)
![Static Badge](https://img.shields.io/badge/sass-%23CC6699?style=for-the-badge)
![Static Badge](https://img.shields.io/badge/vite-bundler-%23646CFF?style=for-the-badge)


`react-nt-modal`은 react용 모달 시스템 모듈입니다. react에서 지원하는 `portal` 기능을 활용 하여 어플리케이션 외부에 사용자가 지정한 컴포넌트(컨텐츠)가 표시 되도록 합니다. 어플리케이션 외부에 생성하여 내부 레이어 시스템의 영향을 주지 않도록 구현하고 전역으로 동작하게 하여 사용자가 어플리케이션 어디에서든 최상위 레이어에 모달을 표시할 수 있도록 합니다. 기본적인 구조 (헤더, 닫기 버튼, 기본 버튼)를 제공하며 사용자는 모달 컨텐츠 부분만 component로 구현하여 import 시키면 됩니다. 또한 내부에 comfirm 처리가 가능한 component를 갖고 있어 간단하게 confirm 모달을 표시할수있도록 합니다.

창 닫는 기능 관련 옵션을 지정할 수 있으며 옵션에 따라 background(아무곳)를`click` 하거나 `esc`버튼으로 창을 닫을 수 있습니다. 또한 모달 내부에서 모달 호출이 가능하도록 하여 여러개의 모달을 순차적으로 열고 닫을 수 있습니다.

`vue-nt-modal`(https://github.com/noistommy/vue-nt-modal)을 React + TypeScript로 그대로 포팅한 버전입니다.
동일한 클래스명(`nt-modal`, `nt-modal-container`, `nt-button` 등)과 CSS 구조를 사용하므로
기존 `nt-modal.scss` 스타일이나 커스텀 테마를 그대로 재사용할 수 있습니다.

---

## Demo

[react-nt-modal](https://noistommy.github.io/react-nt-modal) demo page.



## Installation

```
npm install react-nt-modal
```


## Usage

### 1. Provider로 감싸기 

```jsx
import { ModalProvider } from 'react-nt-modal'

export default function App() {
  return (
    <ModalProvider options={{ useStack: true, clickToClose: false, escapeToClose: false, offset: 20 }}>
      <YourApp />
    </ModalProvider>
  )
}
```

### 2. 모달 열기

```tsx
import { useModal, type ModalContentProps } from 'react-nt-modal'
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

### 3. 컨텐츠 컴포넌트에서 닫기

```tsx
import { useModal, type ModalContentProps } from 'react-nt-modal'

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
  const { close } = useModal()

  return (
    <div className="modal">
      {useHeader && header /* NtModal이 자동 생성한 title + close 버튼 */}
      <div className="modal-contents">...</div>
      <div className="modal-footer">
        <button className="nt-button text" onClick={onClose}>취소</button>
        // or
        <button className="nt-button text" onClick={close}>취소</button>
      </div>
    </div>
  )
}
```

`ModalContentProps`는 모든 컨텐츠 컴포넌트가 자동으로 받는 `modalId`, `onClose`, `header`를
정의합니다. 여기에 자신의 컴포넌트 전용 props 타입을 `&`로 합쳐서 사용하세요.

---

## Properties

* **useStack**: _boolean_ ▶︎ `true`    
Setting use multiple modal.

* **clickToClose**: _boolean_ ▶︎ `true`    
Setting close by click on the background.

* **escapeToClose**: _boolean_ ▶︎ `true`   
Setting close by press the `ESC` button.