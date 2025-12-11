import {useDarkModeStore} from "../store/useDarkModeStore"
import Logo from '../assets/logo.png';


const LogoSection = () => {
    const isDarkMode = useDarkModeStore((state) => state.isDarkMode)

    return (
        <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center rounded-lg">
                <img src={Logo} alt="Etiopikar Logo" className="h-20 w-auto object-contain" />
                </div>
                <div className="flex flex-col">
                <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Etiopikar
                </span>
                <span className={`text-xs font-medium tracking-wide ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Experience the difference
                </span>
                </div>
            </div>
    )
}

export default LogoSection