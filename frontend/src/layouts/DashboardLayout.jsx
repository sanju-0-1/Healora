import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import Breadcrumbs from '../components/common/Breadcrumbs';

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto overflow-x-hidden">
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
