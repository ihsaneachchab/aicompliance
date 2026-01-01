import { Layout } from '../components/layout'

export function AdministrationPage() {
  return (
    <Layout currentPage="administration">
      <div class="space-y-6">
        {/* Page header */}
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Administration</h1>
          <p class="text-gray-600">Configuration et gestion des utilisateurs</p>
        </div>

        {/* Tabs */}
        <div class="card">
          <div class="border-b border-gray-200">
            <nav class="flex space-x-8">
              <button 
                id="usersTab" 
                class="py-4 px-1 border-b-2 border-blue-600 font-medium text-sm text-blue-600"
                onclick="switchTab('users')"
              >
                <i class="fas fa-users mr-2"></i>
                Utilisateurs
              </button>
              <button 
                id="rolesTab" 
                class="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700"
                onclick="switchTab('roles')"
              >
                <i class="fas fa-shield-alt mr-2"></i>
                Rôles & Permissions
              </button>
              <button 
                id="configTab" 
                class="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700"
                onclick="switchTab('config')"
              >
                <i class="fas fa-cog mr-2"></i>
                Configuration
              </button>
            </nav>
          </div>
        </div>

        {/* Users Tab Content */}
        <div id="usersContent">
          <div class="card">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-gray-900">Gestion des utilisateurs</h2>
              <button class="btn btn-primary" onclick="addNewUser()">
                <i class="fas fa-plus mr-2"></i>
                Nouvel utilisateur
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-200">
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">Utilisateur</th>
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">Rôle</th>
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">Statut</th>
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">Dernière connexion</th>
                    <th class="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* User 1 */}
                  <tr class="border-b border-gray-100 hover:bg-gray-50">
                    <td class="py-3 px-4">
                      <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span class="font-semibold text-blue-600">MD</span>
                        </div>
                        <div>
                          <div class="font-medium text-gray-900">Marie Dupont</div>
                          <div class="text-sm text-gray-500">Responsable Qualité</div>
                        </div>
                      </div>
                    </td>
                    <td class="py-3 px-4 text-sm text-gray-600">marie.dupont@entreprise.fr</td>
                    <td class="py-3 px-4">
                      <span class="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                        Admin
                      </span>
                    </td>
                    <td class="py-3 px-4">
                      <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        <i class="fas fa-circle mr-1" style="font-size: 6px;"></i>
                        Actif
                      </span>
                    </td>
                    <td class="py-3 px-4 text-sm text-gray-600">2024-05-16</td>
                    <td class="py-3 px-4 text-right">
                      <button class="text-blue-600 hover:text-blue-700 mr-3" onclick="editUser('MD')">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button class="text-red-600 hover:text-red-700" onclick="deleteUser('MD')">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>

                  {/* User 2 */}
                  <tr class="border-b border-gray-100 hover:bg-gray-50">
                    <td class="py-3 px-4">
                      <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span class="font-semibold text-green-600">JM</span>
                        </div>
                        <div>
                          <div class="font-medium text-gray-900">Jean Martin</div>
                          <div class="text-sm text-gray-500">Auditeur</div>
                        </div>
                      </div>
                    </td>
                    <td class="py-3 px-4 text-sm text-gray-600">jean.martin@entreprise.fr</td>
                    <td class="py-3 px-4">
                      <span class="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        Audit
                      </span>
                    </td>
                    <td class="py-3 px-4">
                      <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        <i class="fas fa-circle mr-1" style="font-size: 6px;"></i>
                        Actif
                      </span>
                    </td>
                    <td class="py-3 px-4 text-sm text-gray-600">2024-03-17</td>
                    <td class="py-3 px-4 text-right">
                      <button class="text-blue-600 hover:text-blue-700 mr-3" onclick="editUser('JM')">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button class="text-red-600 hover:text-red-700" onclick="deleteUser('JM')">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>

                  {/* User 3 */}
                  <tr class="border-b border-gray-100 hover:bg-gray-50">
                    <td class="py-3 px-4">
                      <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                          <span class="font-semibold text-yellow-600">SB</span>
                        </div>
                        <div>
                          <div class="font-medium text-gray-900">Sophie Bernard</div>
                          <div class="text-sm text-gray-500">Manager</div>
                        </div>
                      </div>
                    </td>
                    <td class="py-3 px-4 text-sm text-gray-600">sophie.bernard@entreprise.fr</td>
                    <td class="py-3 px-4">
                      <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        Manager
                      </span>
                    </td>
                    <td class="py-3 px-4">
                      <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        <i class="fas fa-circle mr-1" style="font-size: 6px;"></i>
                        Actif
                      </span>
                    </td>
                    <td class="py-3 px-4 text-sm text-gray-600">2024-03-15</td>
                    <td class="py-3 px-4 text-right">
                      <button class="text-blue-600 hover:text-blue-700 mr-3" onclick="editUser('SB')">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button class="text-red-600 hover:text-red-700" onclick="deleteUser('SB')">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>

                  {/* User 4 */}
                  <tr class="border-b border-gray-100 hover:bg-gray-50">
                    <td class="py-3 px-4">
                      <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <span class="font-semibold text-red-600">PD</span>
                        </div>
                        <div>
                          <div class="font-medium text-gray-900">Pierre Durand</div>
                          <div class="text-sm text-gray-500">Consultant</div>
                        </div>
                      </div>
                    </td>
                    <td class="py-3 px-4 text-sm text-gray-600">pierre.durand@entreprise.fr</td>
                    <td class="py-3 px-4">
                      <span class="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        Consultant
                      </span>
                    </td>
                    <td class="py-3 px-4">
                      <span class="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        <i class="fas fa-circle mr-1" style="font-size: 6px;"></i>
                        Inactif
                      </span>
                    </td>
                    <td class="py-3 px-4 text-sm text-gray-600">2023-12-20</td>
                    <td class="py-3 px-4 text-right">
                      <button class="text-blue-600 hover:text-blue-700 mr-3" onclick="editUser('PD')">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button class="text-red-600 hover:text-red-700" onclick="deleteUser('PD')">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Roles Tab Content */}
        <div id="rolesContent" class="hidden">
          <div class="card">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Matrice des droits</h2>

            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-200">
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">Permission</th>
                    <th class="text-center py-3 px-4 font-semibold text-gray-700">Admin</th>
                    <th class="text-center py-3 px-4 font-semibold text-gray-700">Manager</th>
                    <th class="text-center py-3 px-4 font-semibold text-gray-700">Audit</th>
                    <th class="text-center py-3 px-4 font-semibold text-gray-700">Consultant</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-100 hover:bg-gray-50">
                    <td class="py-3 px-4 font-medium text-gray-900">Créer des documents</td>
                    <td class="py-3 px-4 text-center">
                      <i class="fas fa-check text-green-600"></i>
                    </td>
                    <td class="py-3 px-4 text-center">
                      <i class="fas fa-check text-green-600"></i>
                    </td>
                    <td class="py-3 px-4 text-center">
                      <i class="fas fa-check text-green-600"></i>
                    </td>
                    <td class="py-3 px-4 text-center">
                      <i class="fas fa-times text-red-600"></i>
                    </td>
                  </tr>
                  <tr class="border-b border-gray-100 hover:bg-gray-50">
                    <td class="py-3 px-4 font-medium text-gray-900">Modifier des documents</td>
                    <td class="py-3 px-4 text-center">
                      <i class="fas fa-check text-green-600"></i>
                    </td>
                    <td class="py-3 px-4 text-center">
                      <i class="fas fa-check text-green-600"></i>
                    </td>
                    <td class="py-3 px-4 text-center">
                      <i class="fas fa-times text-red-600"></i>
                    </td>
                    <td class="py-3 px-4 text-center">
                      <i class="fas fa-times text-red-600"></i>
                    </td>
                  </tr>
                  <tr class="border-b border-gray-100 hover:bg-gray-50">
                    <td class="py-3 px-4 font-medium text-gray-900">Valider des documents</td>
                    <td class="py-3 px-4 text-center">
                      <i class="fas fa-check text-green-600"></i>
                    </td>
                    <td class="py-3 px-4 text-center">
                      <i class="fas fa-check text-green-600"></i>
                    </td>
                    <td class="py-3 px-4 text-center">
                      <i class="fas fa-check text-green-600"></i>
                    </td>
                    <td class="py-3 px-4 text-center">
                      <i class="fas fa-times text-red-600"></i>
                    </td>
                  </tr>
                  <tr class="border-b border-gray-100 hover:bg-gray-50">
                    <td class="py-3 px-4 font-medium text-gray-900">Gérer les utilisateurs</td>
                    <td class="py-3 px-4 text-center">
                      <i class="fas fa-check text-green-600"></i>
                    </td>
                    <td class="py-3 px-4 text-center">
                      <i class="fas fa-times text-red-600"></i>
                    </td>
                    <td class="py-3 px-4 text-center">
                      <i class="fas fa-times text-red-600"></i>
                    </td>
                    <td class="py-3 px-4 text-center">
                      <i class="fas fa-times text-red-600"></i>
                    </td>
                  </tr>
                  <tr class="border-b border-gray-100 hover:bg-gray-50">
                    <td class="py-3 px-4 font-medium text-gray-900">Accès aux statistiques</td>
                    <td class="py-3 px-4 text-center">
                      <i class="fas fa-check text-green-600"></i>
                    </td>
                    <td class="py-3 px-4 text-center">
                      <i class="fas fa-check text-green-600"></i>
                    </td>
                    <td class="py-3 px-4 text-center">
                      <i class="fas fa-check text-green-600"></i>
                    </td>
                    <td class="py-3 px-4 text-center">
                      <i class="fas fa-check text-green-600"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Configuration Tab Content */}
        <div id="configContent" class="hidden">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Seuils d'alerte */}
            <div class="card">
              <h3 class="font-bold text-gray-900 mb-4">
                <i class="fas fa-sliders-h text-blue-600 mr-2"></i>
                Seuils d'alerte
              </h3>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Score de conformité critique (&lt; %)
                  </label>
                  <input type="range" min="0" max="100" value="60" class="w-full" onchange="updateThreshold('critical', this.value)" />
                  <div class="flex justify-between text-xs text-gray-600 mt-1">
                    <span>0%</span>
                    <span id="criticalValue" class="font-bold">60%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Score de conformité attention (&lt; %)
                  </label>
                  <input type="range" min="0" max="100" value="80" class="w-full" onchange="updateThreshold('warning', this.value)" />
                  <div class="flex justify-between text-xs text-gray-600 mt-1">
                    <span>0%</span>
                    <span id="warningValue" class="font-bold">80%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Délai d'échéance NC (jours)
                  </label>
                  <input type="range" min="1" max="90" value="30" class="w-full" onchange="updateThreshold('deadline', this.value)" />
                  <div class="flex justify-between text-xs text-gray-600 mt-1">
                    <span>1j</span>
                    <span id="deadlineValue" class="font-bold">30j</span>
                    <span>90j</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Intégrations */}
            <div class="card">
              <h3 class="font-bold text-gray-900 mb-4">
                <i class="fas fa-plug text-purple-600 mr-2"></i>
                Intégrations
              </h3>
              
              <div class="space-y-3">
                <div class="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-envelope text-blue-600 text-xl"></i>
                    <div>
                      <div class="font-medium text-gray-900">Email SMTP</div>
                      <div class="text-xs text-gray-500">smtp.gmail.com</div>
                    </div>
                  </div>
                  <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Connecté
                  </span>
                </div>

                <div class="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-robot text-purple-600 text-xl"></i>
                    <div>
                      <div class="font-medium text-gray-900">API IA</div>
                      <div class="text-xs text-gray-500">OpenAI GPT-4</div>
                    </div>
                  </div>
                  <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Connecté
                  </span>
                </div>

                <div class="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-database text-gray-600 text-xl"></i>
                    <div>
                      <div class="font-medium text-gray-900">ERP</div>
                      <div class="text-xs text-gray-500">SAP S/4HANA</div>
                    </div>
                  </div>
                  <span class="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                    Non connecté
                  </span>
                </div>
              </div>

              <button class="w-full btn btn-secondary mt-4">
                <i class="fas fa-plus mr-2"></i>
                Ajouter une intégration
              </button>
            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          function switchTab(tab) {
            // Hide all tabs
            document.getElementById('usersContent').classList.add('hidden');
            document.getElementById('rolesContent').classList.add('hidden');
            document.getElementById('configContent').classList.add('hidden');

            // Reset all tab buttons
            document.getElementById('usersTab').className = 'py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700';
            document.getElementById('rolesTab').className = 'py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700';
            document.getElementById('configTab').className = 'py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700';

            // Show selected tab
            if (tab === 'users') {
              document.getElementById('usersContent').classList.remove('hidden');
              document.getElementById('usersTab').className = 'py-4 px-1 border-b-2 border-blue-600 font-medium text-sm text-blue-600';
            } else if (tab === 'roles') {
              document.getElementById('rolesContent').classList.remove('hidden');
              document.getElementById('rolesTab').className = 'py-4 px-1 border-b-2 border-blue-600 font-medium text-sm text-blue-600';
            } else if (tab === 'config') {
              document.getElementById('configContent').classList.remove('hidden');
              document.getElementById('configTab').className = 'py-4 px-1 border-b-2 border-blue-600 font-medium text-sm text-blue-600';
            }
          }

          function addNewUser() {
            Utils.showNotification('Fonctionnalité d\\'ajout d\\'utilisateur en cours de développement', 'info');
          }

          function editUser(userId) {
            Utils.showNotification('Modification de l\\'utilisateur ' + userId, 'info');
          }

          function deleteUser(userId) {
            if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
              Utils.showNotification('Utilisateur supprimé', 'success');
            }
          }

          function updateThreshold(type, value) {
            if (type === 'critical') {
              document.getElementById('criticalValue').textContent = value + '%';
            } else if (type === 'warning') {
              document.getElementById('warningValue').textContent = value + '%';
            } else if (type === 'deadline') {
              document.getElementById('deadlineValue').textContent = value + 'j';
            }
          }
        `
      }} />
    </Layout>
  )
}
