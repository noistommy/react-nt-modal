import NTLogo from './img/nt-profile.svg'
import Frog from './img/frog-profile.svg'
import VBeui from './img/be-ui-vue.svg'
import RBeui from './img/be-ui-react.svg'

function Cabiner () {
  return (
    <footer className="mt-10">
      
      <hr className="be hr my-10" />
      <div className="wrapper" style={{maxWidth: '780px', margin: '0 auto'}}>
        <div className="header be flex between">
          <div  className="logo">
            <div className="be flex gap-1">
              <img src={NTLogo} alt="logo" width="25px" />
              <div className="bolder large">NT Cabinet</div>
            </div>
          </div>
          <div className="contact">
            <div className="be-buttons">
              <div className="be-button compact icon">
                <i className="xi-mail" />
                <a className="link" href="mailto:noistommy@gmail.com" target="_blank"></a>
              </div>
              <div className="be-button compact icon">
                <i className="xi-linkedin" />
                <a className="link" href="https://www.linkedin.com/in/minyoung-kim-noistommy" target="_blank"></a>
              </div>
              <div className="be-button compact icon">
                <i className="xi-home" />
                <a className="link" href="/" target="_blank"></a>
              </div>
            </div>
          </div>
        </div>
        <p>Hello! I'm noistommy!! <br /> Thanks for checking out my work. Please take a look at my other work as well. Thank you!</p>
        <div className="be-grid">
          <div className="column span-4 span-xs-12 pr-10">
            <h5 className="header gray-txt-40">Design system</h5>
            <div className="be-list">
              <div className="item p-1">
                <img src={Frog} alt="logo" style={{width: '20px'}} /> 
                <div className="item-title ml-4">Frog UI</div>
                <div className="btn-set">
                  <div className="be-button icon compact">
                    <i className="xi-link"></i>
                    <a className="link" href="https://frog-ui-css.vercel.app" target="_blank"></a>
                  </div>
                </div>
              </div>
            </div>
            <h5 className="header gray-txt-40">UI Components</h5>
            <div className="be-list">
              <div className="item p-1">
                <img src={VBeui} alt="logo" style={{width: '20px'}} /> 
                <div className="item-title ml-4">BEUI - Vue</div>
                <div className="btn-set">
                  <div className="be-button icon compact">
                    <i className="xi-link"></i>
                    <a className="link" href="https://beui.vercel.app" target="_blank"></a>
                  </div>
                </div>
              </div>
              <div className="item p-1">
                <img src={RBeui} alt="logo" style={{width: '20px'}} /> 
                <div className="item-title ml-4">BEUI - React</div>
                <div className="btn-set">
                  <div className="be-button icon compact">
                    <i className="xi-link"></i>
                    <a className="link"  href="https://react-be-ui.vercel.app" target="_blank"></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column span-4 span-xs-12 pr-10">
            <h5 className="header gray-txt-40">Modules by react</h5>
            <div className="be-list">
              <div className="item p-1">
                <img src={NTLogo} alt="logo" style={{width: '20px'}} />
                <div className="item-title ml-4">NT Modal</div>
                <div className="btn-set">
                  <div className="be-button compact round">
                    Current
                  </div>
                </div>
              </div>
              <div className="item p-1">
                <img src={NTLogo} alt="logo" style={{width: '20px'}} />
                <div className="item-title ml-4">NT Toast</div>
                <div className="btn-set">
                  <div className="be-button icon compact">
                    <i className="xi-link"></i>
                    <a className="link" href="https://noistommy.github.io/react-nt-toast" target="_blank"></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column span-4 span-xs-12 pr-10">
            <h5 className="header gray-txt-40">Modules by vue</h5>
            <div className="be-list">
              <div className="item p-1">
                <img src={NTLogo} alt="logo" style={{width: '20px'}} />
                <div className="item-title ml-4">NT Modal</div>
                <div className="btn-set">
                  <div className="be-button icon compact">
                    <i className="xi-link"></i>
                    <a className="link" href="https://noistommy.github.io/vue-nt-modal" target="_blank"></a>
                  </div>
                </div>
              </div>
              <div className="item p-1">
                <img src={NTLogo} alt="logo" style={{width: '20px'}} />
                <div className="item-title ml-4">NT Toast</div>
                <div className="btn-set">
                  <div className="be-button icon compact">
                    <i className="xi-link"></i>
                    <a className="link" href="https://noistommy.github.io/vue-nt-toast" target="_blank"></a>
                  </div>
                </div>
              </div>
              <div className="item p-1">
                <img src={NTLogo} alt="logo" style={{width: '20px'}} />
                <div className="item-title ml-4">NT Tooltip</div>
                <div className="btn-set">
                  <div className="be-button icon compact">
                    <i className="xi-link"></i>
                    <a className="link" href="https://noistommy.github.io/vue-nt-tooltip" target="_blank"></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="be hr" />
      <div className="copylight mt-4 be-tags attached">
        <span className="be-tag label deepblue">Copyright</span>
        <span className="be-tag label primary-light">© 2016-present Kim Minyoung</span>
        <span className="be-tag pointing left secondary">noistommy</span>
      </div>
    </footer>
  )
}

export default Cabiner