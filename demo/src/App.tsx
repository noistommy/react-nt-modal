import { useState, useEffect } from 'react'
import { ModalProvider, useModal } from '../../src/index.ts'
import TestModal from './TestModal.tsx'

import Cabiner from './NTCabinet/Cabinet.tsx'

function Header() {

  const themeValue = sessionStorage.getItem('theme-mode') as 'light' | 'dark' | null
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(themeValue || 'system')


  const selectTheme = (mode: 'light' | 'dark' | 'system') => {
    const html = document.documentElement;
    html.className = ''
    html.classList.add(`${mode}-mode`);
    sessionStorage.setItem('theme-mode', mode)
  }

  useEffect(() => {
    selectTheme(theme)
  }, [theme])
  return (
    <header style={{marginTop: '100px'}}>
      <div className="menu-wrapper" style = {{
        position: 'absolute',
        top: 0,
        right: 0,
      }}>
        <nav className="be flex end gap-1 p-4">
          <li>
            <div className="be-buttons">
              <div className={`be-button icon ${theme === 'light' ? 'selected' : ''}`} onClick={() => setTheme('light')}><i className="xi-sun" /></div>
              <div className={`be-button icon ${theme === 'dark' ? 'selected' : ''}`} onClick={() => setTheme('dark')}><i className="xi-moon" /></div>
              <div className={`be-button icon ${theme === 'system' ? 'selected' : ''}`} onClick={() => setTheme('system')}><i className="xi-desktop" /></div>
            </div>
          </li>
          <li>
            <div className="be-buttons">
              <div className="be-button icon">
                <i className="xi-github"></i>
                <a href="https://github.com/noistommy/react-nt-modal.git" className="link" target="_blank"></a>
              </div>
              <div className="be-button icon">
                <i className="xi-package"></i>
                <a href="https://www.npmjs.com/package/react-nt-modal" className="link" target="_blank"></a>
              </div>

            </div>
          </li>
        </nav>
      </div>
      <div className="wrapper">
        <div className="greetings">
          <div className="main-title hero bolder">
            NT Modal
          </div>
          <div className="sub-title">A simple and flexible modal component for 
            <span className="be-tag label lightblue ml-2">React</span>
          </div>
        </div>
      </div>
    </header>
  )
}

function Demo() {
  const { show } = useModal()
  const [stack, setStack] = useState(true)
  const [clickToClose, setClickToClose] = useState(true)
  const [escapeToClose, setEscapeToClose] = useState(true)
  const [title, setTitle] = useState('modal title')
  const lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus tenetur ea mollitia cupiditate accusantium earum nulla. Temporibus, expedita. Facere, consectetur. Amet iure perferendis vel ipsum, animi dolorum et ratione repellat?'
  const [description, setDescription] = useState(lorem)
  const showModal = () => {
    show({
      comp: TestModal,
      props: { title, description, pText: '확인', nText: '취소', useHeader: true, useStack: stack },
      options: { useStack: stack, clickToClose, escapeToClose },
    })
  }

  const showConfirm = () => {
    show({
      comp: 'confirm',
      props: { title: 'Confirm', description: 'Is it OK?', pText: '확인', nText: '취소', result: () => (console.log('ok!')) },
      options: { useStack: stack, clickToClose, escapeToClose },
    })
  }

  return (
    <div className="pb-10" style={{maxWidth: '780px', margin: '0 auto'}}>
      <div className="be-segment align-center">
        <button className="be-button primary" onClick={showModal}>Show Modal</button>
        <button className="be-button yellow" onClick={showConfirm}>Show Confirm</button>
      </div>

      <div className="detail mt-10">
        <div className="header">
          <div className="bold large">Base</div>
          <p><code>Modal</code> 과 <code>Confirm</code>의 구분은 show()의 param 중 comp에 의해 결정됩니다. 'confirm'으로 설정 시 지정된 confirm template이 나타나고 사용자 컴포넌트로 설정 시 해당 컴포넌트가 동적으로 적용 됩니다. </p>
          <p>confirm 실행 시 컴펌 제목, 내용, 확인, 취소 버튼 텍스트를 지정 할 수 있습니다.</p>
        </div>
        <div className="be-segment border">
          <div className="be-form">
            <div className="header mb-8">
              <div className="">직접 모달 타이틀과 설명을 입력해보세요.</div>
            </div>
            <div className="field">
              <label>Title</label>
              <div className="be-input fluid">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" />
              </div>
            </div>
            <div className="field">
              <label>Description</label>
              <div className="be-input fluid">
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="description" />
              </div>
            </div>
          </div>
          <div className="footer">
            <div className="be-button" onClick={showModal}>Open Modal</div>
            <div className="be-button" onClick={showConfirm}>Open Confirm</div>
          </div>
        </div>
      </div>
      <div className="detail mt-10">
        <div className="header">
          <div className="bold large">Use stack</div>
          <p><code>useStack: true</code> 시 이중 모달을 허용합니다. 모달 내부에서 다른 모달을 호출 할 수 있습니다. 허용 하지 않을 경우 마지막에 실행한 모달만 표시됩니다. </p>
        </div>
        <div className="be-segment border">
          <div className="contents">
            <label className="be-checkbox">
              <input type="checkbox" checked={stack} onChange={(e) => setStack(e.target.checked)} /> useStack (nested modal)
            </label>
          </div>
          <div className="footer">
            <div className="be-button" onClick={showModal}>Open Modal</div>
          </div>
        </div>
      </div>
      <div className="detail mt-10">
        <div className="header">
          <div className="bold large">Click to close</div>
          <p>모달 영역 밖(dimmed 영역)을 클릭하여 창을 닫을 수 있도록 설정합니다.</p>
        </div>
        <div className="be-segment border">
          <div className="contents">
            <label className="be-checkbox">
              <input type="checkbox" checked={clickToClose} onChange={(e) => setClickToClose(e.target.checked)} /> clickToClose
            </label>
          </div>
          <div className="footer">
            <div className="be-button" onClick={showModal}>Open Modal</div>
          </div>
        </div>
      </div>
      <div className="detail mt-10">
        <div className="header">
          <div className="bold large">Press ESC to close</div>
          <p><span className="be-tag kbd esc">ESC</span> 로 창을 닫을 수 있도록 설정합니다.</p>
        </div>
        <div className="be-segment border">
          <div className="contents">
            <label className="be-checkbox">
              <input type="checkbox" checked={escapeToClose} onChange={(e) => setEscapeToClose(e.target.checked)} /> escapeToClose
            </label>
          </div>
          <div className="footer">
            <div className="be-button" onClick={showModal}>Open Modal</div>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default function App() {
  return (
    <ModalProvider options={{ useStack: true, clickToClose: false, escapeToClose: false }}>
      <Header />
      <Demo />
      <Cabiner />
    </ModalProvider>
  )
}
