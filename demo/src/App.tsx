import { useState, useEffect } from 'react'
import { ModalProvider, useModal } from '../../src/index.ts'
import TestModal from './TestModal.tsx'

function Header() {

  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')

  const selectTheme = (mode: 'light' | 'dark' | 'system') => {
    const html = document.documentElement;
    setTheme(mode)

    html.className = ''
    html.classList.add(`${mode}-mode`);

    sessionStorage.setItem('theme-mode', mode)
  }

  useEffect(() => {
    const saved = sessionStorage.getItem('theme-mode') as 'light' | 'dark' | 'system' | null
    if (saved) {
      selectTheme(saved)
    }
  }, [])
  return (
    <header>
      <div className="menu-wrapper">
        <nav className="be flex end gap-1 pd-2">
          <li>
            <div className="be-buttons">
              <div className={`be-button icon ${theme === 'light' ? 'selected' : ''}`} onClick={() => selectTheme('light')}><i className="xi-sun" /></div>
              <div className={`be-button icon ${theme === 'dark' ? 'selected' : ''}`} onClick={() => selectTheme('dark')}><i className="xi-moon" /></div>
              <div className={`be-button icon ${theme === 'system' ? 'selected' : ''}`} onClick={() => selectTheme('system')}><i className="xi-desktop" /></div>
            </div>
          </li>
          <li>
            <div className="be-button icon">
              <i className="xi-github"></i>
            </div>
          </li>
        </nav>
      </div>
      <div className="wrapper">
        <div className="greetings">
          <div className="main-title hero bolder">
            NT Modal
          </div>
          <div className="sub-title">A simple and flexible modal component for react</div>
        </div>
      </div>
    </header>
  )
}
function Demo() {
  const { show } = useModal()
  const [stack, setStack] = useState(true)
  const [clickToClose, setClickToClose] = useState(false)
  const [escapeToClose, setEscapeToClose] = useState(false)
  const [title, setTitle] = useState('modal title')
  const [description, setDescription] = useState('This is modal test')

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
      props: { title, description, pText: '확인', nText: '취소' },
      options: { useStack: stack, clickToClose, escapeToClose },
    })
  }

  return (
    <div>
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
            <div className="header mb-2">
              <div className="">직접 모달 타이틀과 설명을 입력해보세요.</div>
            </div>
            <div className="field">
              <label>Title</label>
              <div className="be-input">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" />
              </div>
            </div>
            <div className="field">
              <label>Description</label>
              <div className="be-input">
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="description" />
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
    <ModalProvider options={{ useStack: true, clickToClose: false, escapeToClose: false, offset: 20 }}>
      <Header />
      <Demo />
    </ModalProvider>
  )
}
