import { PROFILE, DS, BEUI, REACT_MODULES, VUE_MODULES } from './moduleData.ts'
import NTLogo from './img/nt-profile.svg'

function Drawer ({
  logo = '',
  name = '',
  link = '',
  current = false
}) {
  return (
    <a className="item p-1" href={link} target="_blank" style={current ? {pointerEvents: 'none'} : {}}>
      {logo && (<img src={logo} alt={`${logo}'s logo`} style={{width: '20px'}} /> )}
      <div className="item-title ml-4">{name}</div>
      <div className="btn-set">
        <div className="be-button icon compact">
          {current ? 'current' : <i className="xi-link"></i>}
        </div>
      </div>
    </a>
  )
}

function Cabinet () {
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
                <a className="link" href={PROFILE.email} target="_blank"></a>
              </div>
              <div className="be-button compact icon">
                <i className="xi-linkedin" />
                <a className="link" href={PROFILE.linkedin} target="_blank"></a>
              </div>
              <div className="be-button compact icon">
                <i className="xi-home" />
                <a className="link" href={PROFILE.homepage} target="_blank"></a>
              </div>
            </div>
          </div>
        </div>
        <p>Hello! I'm noistommy!! <br /> Thanks for checking out my work. Please take a look at my other work as well. Thank you!</p>
        <div className="be-grid">
          <div className="column span-4 span-xs-12 pr-10">
            <h5 className="header gray-txt-40">Design system</h5>
            <div className="be-list">
              <Drawer logo={DS.logo} name={DS.name} link={DS.link} current={DS.current} />
            </div>
            <h5 className="header gray-txt-40">UI Components</h5>
            <div className="be-list">
              {BEUI.map(item => <Drawer key={item.name} logo={item.logo} name={item.name} link={item.link} current={item.current} />)}
            </div>
          </div>
          <div className="column span-4 span-xs-12 pr-10">
            <h5 className="header gray-txt-40">Modules by react</h5>
            <div className="be-list">
              {REACT_MODULES.map(item => <Drawer key={item.name} logo={item.logo} name={item.name} link={item.link} current={item.current} />)}
            </div>
          </div>
          <div className="column span-4 span-xs-12 pr-10">
            <h5 className="header gray-txt-40">Modules by vue</h5>
            <div className="be-list">
              {VUE_MODULES.map(item => <Drawer key={item.name} logo={item.logo} name={item.name} link={item.link} current={item.current} />)}
            </div>
          </div>
        </div>
      </div>
      <hr className="be hr" />
      <div className="copylight mt-4 be-tags attached">
        <span className="be-tag label deepblue">Copyright</span>
        <span className="be-tag label primary-light">© {new Date().getFullYear()} Kim Minyoung</span>
        <span className="be-tag pointing left secondary">noistommy</span>
      </div>
    </footer>
  )
}

export default Cabinet