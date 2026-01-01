export function Layout({ children, currentPage }: { children: any, currentPage: string }) {
  return (
    <div class="min-h-screen bg-gray-50">
      {/* Header */}
      <header class="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div class="px-4 py-3 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button
              onclick="toggleSidebar()"
              class="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <i class="fas fa-bars text-gray-600"></i>
            </button>

            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <i class="fas fa-shield-alt text-white"></i>
              </div>
              <div class="hidden sm:block">
                <h1 class="text-lg font-bold text-gray-900">IA Conformité</h1>
                <p class="text-xs text-gray-500">INPT Innovation</p>
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            {/* Notifications */}
            <button class="relative p-2 rounded-lg hover:bg-gray-100">
              <i class="fas fa-bell text-gray-600"></i>
              <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User menu */}
            <div class="flex items-center space-x-3">
              <div class="hidden md:block text-right">
                <div class="text-sm font-medium text-gray-900" id="userName">Utilisateur</div>
                <div class="text-xs text-gray-500" id="userRole">Responsable Qualité</div>
              </div>
              <div class="relative">
                <button
                  id="userMenuButton"
                  onclick="toggleUserMenu()"
                  class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold hover:shadow-lg transition-shadow"
                >
                  <i class="fas fa-user"></i>
                </button>

                {/* Dropdown menu */}
                <div
                  id="userDropdown"
                  class="hidden absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                >
                  <div class="p-4 border-b border-gray-200">
                    <div class="flex items-center space-x-3">
                      <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        <i class="fas fa-user text-xl"></i>
                      </div>
                      <div class="flex-1">
                        <div class="font-medium text-gray-900" id="dropdownUserName">Utilisateur</div>
                        <div class="text-xs text-gray-500" id="dropdownUserEmail">user@example.com</div>
                      </div>
                    </div>
                  </div>

                  <div class="p-2">
                    <a href="/profil" class="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                      <i class="fas fa-user-circle w-5"></i>
                      <span>Mon profil</span>
                    </a>
                    <a href="/administration" class="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                      <i class="fas fa-cog w-5"></i>
                      <span>Paramètres</span>
                    </a>
                    <button onclick="Auth.logout()" class="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                      <i class="fas fa-sign-out-alt w-5"></i>
                      <span>Déconnexion</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div class="flex">
        {/* Sidebar */}
        <aside
          id="sidebar"
          class="w-64 bg-white border-r border-gray-200 fixed left-0 top-16 bottom-0 overflow-y-auto lg:static z-30 transition-transform duration-300"
        >
          <nav class="p-4 space-y-2">
            {/* Section Titre */}
            <div class="px-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Navigation
            </div>

            {/* Tableau de Bord */}
            <a href="/dashboard" class={`sidebar-link ${currentPage === 'dashboard' ? 'active' : ''}`}>
              <i class="fas fa-th-large w-5"></i>
              <span class="ml-3">Tableau de Bord</span>
            </a>

            {/* Assistant IA */}
            <a href="/chat" class={`sidebar-link ${currentPage === 'chat' ? 'active' : ''}`}>
              <i class="fas fa-comment-dots w-5"></i>
              <span class="ml-3">Assistant IA</span>
              <span class="ml-auto bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">IA</span>
            </a>

            {/* Analyse Documents */}
            <a href="/analyse" class={`sidebar-link ${currentPage === 'analyse' ? 'active' : ''}`}>
              <i class="fas fa-file-medical w-5"></i>
              <span class="ml-3">Analyse Documents</span>
            </a>

            {/* Non-Conformités */}
            <a href="/non-conformites" class={`sidebar-link ${currentPage === 'non-conformites' ? 'active' : ''}`}>
              <i class="fas fa-exclamation-triangle w-5"></i>
              <span class="ml-3">Non-Conformités</span>
              <span class="ml-auto bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">4</span>
            </a>

            {/* Bibliothèque */}
            <a href="/bibliotheque" class={`sidebar-link ${currentPage === 'bibliotheque' ? 'active' : ''}`}>
              <i class="fas fa-folder-open w-5"></i>
              <span class="ml-3">Bibliothèque</span>
            </a>

            {/* Collaboration */}
            <a href="/collaboration" class={`sidebar-link ${currentPage === 'collaboration' ? 'active' : ''}`}>
              <i class="fas fa-users w-5"></i>
              <span class="ml-3">Collaboration</span>
            </a>

            {/* Administration */}
            <a href="/administration" class={`sidebar-link ${currentPage === 'administration' ? 'active' : ''}`}>
              <i class="fas fa-cog w-5"></i>
              <span class="ml-3">Administration</span>
            </a>
          </nav>
        </aside>

        {/* Main content */}
        <main class="flex-1 p-6 lg:ml-0">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      <div
        id="sidebarOverlay"
        class="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden hidden"
        onclick="toggleSidebar()"
      ></div>

      <script dangerouslySetInnerHTML={{
        __html: `
          // Update user name in header
          const user = Auth.getCurrentUser();
          if (user) {
            document.getElementById('userName').textContent = user.name || user.email;
            document.getElementById('dropdownUserName').textContent = user.name || user.email;
            document.getElementById('dropdownUserEmail').textContent = user.email;
          }

          // Toggle user menu dropdown
          function toggleUserMenu() {
            const dropdown = document.getElementById('userDropdown');
            dropdown.classList.toggle('hidden');
          }

          // Close dropdown when clicking outside
          document.addEventListener('click', (event) => {
            const dropdown = document.getElementById('userDropdown');
            const button = document.getElementById('userMenuButton');
            
            if (!dropdown.contains(event.target) && !button.contains(event.target)) {
              dropdown.classList.add('hidden');
            }
          });

          // Toggle sidebar for mobile
          function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebarOverlay');
            
            if (sidebar.classList.contains('-translate-x-full')) {
              sidebar.classList.remove('-translate-x-full');
              overlay.classList.remove('hidden');
            } else {
              sidebar.classList.add('-translate-x-full');
              overlay.classList.add('hidden');
            }
          }

          // Close sidebar on mobile when clicking a link
          document.querySelectorAll('.sidebar-link').forEach(link => {
            link.addEventListener('click', () => {
              if (window.innerWidth < 1024) {
                toggleSidebar();
              }
            });
          });
        `
      }} />
    </div>
  )
}
