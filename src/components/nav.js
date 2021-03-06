import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link, NavLink } from 'react-router-dom'
import AuthenticationButton from '../components/authbtn'
import logo from '../SFWLogo.svg'
import { useAuth0 } from '@auth0/auth0-react'
import { FeedbackFish } from '@feedback-fish/react'
import FAQIndex from '../pages/FAQ'

const navigation = [
    { name: 'App', href: '/', requireAuth:true },
    { name: 'Profile', href:'/profile', requireAuth:true },
    { name: 'Downloads', href:'/downloads', requireAuth:true },
    { name: 'FAQ', href:'/faq', requireAuth:false},
  ]

const Nav = ()=>{
  const { isAuthenticated } = useAuth0();
    return (
        <Popover className="relative z-50">
            {({ open }) => (
              <>
                <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                  <nav
                    className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                    aria-label="Global"
                  >
                    <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                      <div className="flex items-center justify-between w-full md:w-auto">
                        <Link to="/" id="HomeBtn">
                          <span className="sr-only">Workflow</span>
                          <img
                            className="h-8 w-auto sm:h-10 inline"
                            src={logo}
                          />
                           <span className="text-blue-600 font-sans text-lg p-3 font-bold">Scan For Wallpapers</span>
                        </Link>
                        <div className="-mr-2 flex items-center md:hidden">
                          <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open main menu</span>
                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                      {navigation.map((item) => (
                        (isAuthenticated&&item.requireAuth || !item.requireAuth)&&
                        <NavLink to={item.href} className="font-medium text-gray-500 hover:text-gray-900" >
                          {item.name}
                        </NavLink>
                      ))}
                      <FeedbackFish projectId="affe5b88ca2fce">
                        <NavLink to="#" className="font-medium text-gray-500 hover:text-gray-900">Send feedback</NavLink>
                      </FeedbackFish>
                      <AuthenticationButton />

                    </div>
                  </nav>
                </div>

                <Transition
                  show={open}
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="duration-100 ease-in"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Popover.Panel
                    focus
                    static
                    className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                  >
                    <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="px-5 pt-4 flex items-center justify-between">
                        <div>
                          <img
                            className="h-8 w-auto"
                            src={logo}
                            alt=""
                          />
                          <span className="text-blue-600 font-sans">Scan For Wallpapers</span>
                        </div>
                        <div className="-mr-2">
                          <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Close main menu</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                      <div className="px-2 pt-2 pb-3 space-y-1">
                      {navigation.map((item) => (
                        (isAuthenticated && item.requireAuth || !item.requireAuth)&&
                        <NavLink to={item.href} className="block font-medium text-gray-500 my-2 hover:text-gray-900" activeClassName="text-blue-500">
                          {item.name}
                        </NavLink>
                      ))}
                      <AuthenticationButton />
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
    )
}

export default Nav;