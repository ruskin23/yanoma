import { useAuth } from "../routers/AuthContext";

function NavBar() {
    const { logout } = useAuth();

    const handleLogout = () => logout();

    return (
        <nav className="bg-stone-800 border-b border-stone-700 px-4 py-3 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <button 
                    className="px-4 py-2 text-stone-200 rounded hover:bg-stone-700 transition-colors"
                >
                    Dashboard
                </button>

                <div className="ml-auto">
                    <button 
                        className="px-4 py-2 border border-stone-400 text-stone-200 rounded hover:bg-stone-700 transition-colors text-sm font-medium"
                        onClick={handleLogout}
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default NavBar