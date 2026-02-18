import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Wallet, ArrowRightLeft, Tags } from 'lucide-react';
import clsx from 'clsx';

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { name: 'Panel Principal', path: '/', icon: LayoutDashboard },
    { name: 'Cuentas', path: '/accounts', icon: Wallet },
    { name: 'Transacciones', path: '/transactions', icon: ArrowRightLeft },
    { name: 'Categorías', path: '/categories', icon: Tags },
  ];

  return (
    <aside className="w-64 bg-white border-r h-full flex flex-col">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
            C
          </div>
          <span className="font-bold text-xl tracking-tight">Finanzas_App</span>
        </Link>
      </div>

      <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Menu
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium",
                isActive
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Icon size={20} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        {/* Future settings or other bottom links could go here */}
      </div>
    </aside>
  );
};

export default Sidebar;
