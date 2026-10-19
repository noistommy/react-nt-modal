import NTLogo from './img/nt-profile.svg'
import Frog from './img/frog-profile.svg'
import VBeui from './img/be-ui-vue.svg'
import RBeui from './img/be-ui-react.svg'
import Souple from './img/souple-icon.svg'

export const PROFILE = {
  homepage: 'https://nt-cabinet.vercel.app/',
  linkedin: 'https://www.linkedin.com/in/minyoung-kim-noistommy',
  email: 'mailto:noistommy@gmail.com'
}

export const DS = { logo: Frog, name: 'Frog UI', link: 'https://frog-ui-css.vercel.app', current: false }
export const BEUI = [
  { logo: VBeui, name: 'BEUI - Vue', link: 'https://beui.vercel.app', current: false },
  { logo: RBeui, name: 'BEUI - React', link: 'https://react-be-ui.vercel.app', current: false }
]
export const REACT_MODULES = [
  { logo: NTLogo, name: 'NT Modal', link: 'https://noistommy.github.io/react-nt-modal', current: true },
  { logo: NTLogo, name: 'NT Toast', link: 'https://noistommy.github.io/react-nt-toast', current: false },
  { logo: NTLogo, name: 'NT Tooltip', link: 'https://noistommy.github.io/nt-tooltip', current: false },
  { logo: Souple, name: 'Souple', link: 'https://noistommy.github.io/souple', current: false }
]
export const VUE_MODULES = [
  { logo: NTLogo, name: 'NT Modal', link: 'https://noistommy.github.io/vue-nt-modal', current: false },
  { logo: NTLogo, name: 'NT Toast', link: 'https://noistommy.github.io/vue-nt-toast', current: false },
  { logo: NTLogo, name: 'NT Tooltip', link: 'https://noistommy.github.io/vue-nt-tooltip', current: false },
]

