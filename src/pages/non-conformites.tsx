import { Layout } from '../components/layout'

export function NonConformitesPage() {
  return (
    <Layout currentPage="non-conformites">
      <div class="space-y-6">
        {/* Page header */}
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Gestion des Non-Conformités</h1>
            <p class="text-gray-600">Suivi et résolution des écarts de conformité</p>
          </div>
          <button class="btn btn-primary" onclick="createNewNC()">
            <i class="fas fa-plus mr-2"></i>
            Nouvelle Non-Conformité
          </button>
        </div>

        {/* Statistics cards */}
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div class="card shadow-card-hover border-l-4 border-red-500">
            <div class="text-sm font-medium text-gray-600 mb-1">Critiques</div>
            <div class="text-3xl font-bold text-red-600 mb-2">1</div>
            <div class="text-sm text-red-600">
              <i class="fas fa-exclamation-circle mr-1"></i>
              Urgent
            </div>
          </div>

          <div class="card shadow-card-hover border-l-4 border-yellow-500">
            <div class="text-sm font-medium text-gray-600 mb-1">En Cours</div>
            <div class="text-3xl font-bold text-yellow-600 mb-2">1</div>
            <div class="text-sm text-yellow-600">
              <i class="fas fa-clock mr-1"></i>
              En traitement
            </div>
          </div>

          <div class="card shadow-card-hover border-l-4 border-blue-500">
            <div class="text-sm font-medium text-gray-600 mb-1">Résolues</div>
            <div class="text-3xl font-bold text-blue-600 mb-2">1</div>
            <div class="text-sm text-blue-600">
              <i class="fas fa-check mr-1"></i>
              À vérifier
            </div>
          </div>

          <div class="card shadow-card-hover border-l-4 border-green-500">
            <div class="text-sm font-medium text-gray-600 mb-1">Vérifiées</div>
            <div class="text-3xl font-bold text-green-600 mb-2">1</div>
            <div class="text-sm text-green-600">
              <i class="fas fa-check-double mr-1"></i>
              Validées
            </div>
          </div>

          <div class="card shadow-card-hover border-l-4 border-gray-400">
            <div class="text-sm font-medium text-gray-600 mb-1">Total</div>
            <div class="text-3xl font-bold text-gray-900 mb-2">4</div>
            <div class="text-sm text-gray-600">
              Ce mois
            </div>
          </div>
        </div>

        {/* View Toggle and Filters */}
        <div class="card">
          <div class="flex items-center space-x-4">
            {/* View Toggle */}
            <div class="flex items-center bg-gray-100 rounded-lg p-1">
              <button 
                id="kanbanViewBtn" 
                class="px-4 py-2 rounded-lg font-medium transition-all bg-white text-blue-600 shadow-sm"
                onclick="switchView('kanban')"
              >
                <i class="fas fa-columns mr-2"></i>
                Kanban
              </button>
              <button 
                id="listViewBtn" 
                class="px-4 py-2 rounded-lg font-medium transition-all text-gray-600 hover:text-gray-900"
                onclick="switchView('list')"
              >
                <i class="fas fa-list mr-2"></i>
                Liste
              </button>
            </div>

            {/* Filters */}
            <div class="flex-1">
              <div class="relative">
                <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input 
                  id="searchInput"
                  type="text" 
                  class="input-field pl-10" 
                  placeholder="Rechercher une non-conformité..."
                  onkeyup="filterNC()"
                />
              </div>
            </div>
            
            <select id="statusFilter" class="input-field w-48" onchange="filterNC()">
              <option value="">Tous les statuts</option>
              <option value="Identifié">Identifié</option>
              <option value="En Cours">En Cours</option>
              <option value="Résolu">Résolu</option>
              <option value="Vérifié">Vérifié</option>
            </select>
            
            <select id="severityFilter" class="input-field w-48" onchange="filterNC()">
              <option value="">Toutes les sévérités</option>
              <option value="Critical">Critique</option>
              <option value="Warning">Majeure</option>
              <option value="Info">Mineure</option>
            </select>

            <button class="btn btn-secondary" onclick="resetFilters()">
              <i class="fas fa-redo mr-2"></i>
              Réinitialiser
            </button>
          </div>
        </div>

        {/* Kanban view */}
        <div id="kanbanView" class="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Identifié column */}
          <div class="card bg-red-50 border-2 border-red-200">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-gray-900 flex items-center">
                <i class="fas fa-exclamation-triangle text-red-600 mr-2"></i>
                Identifié
              </h3>
              <span class="bg-red-600 text-white text-sm px-3 py-1 rounded-full font-bold">1</span>
            </div>

            <div class="space-y-3" data-status="Identifié">
              <div class="bg-white rounded-lg p-4 border-l-4 border-red-600 shadow-sm hover:shadow-md transition-shadow cursor-pointer nc-card" data-status="Identifié" data-severity="Critical" data-title="Procédure de maîtrise des documents manquante">
                <div class="flex items-start justify-between mb-2">
                  <span class="text-sm font-bold text-gray-900">MD</span>
                  <span class="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full flex items-center">
                    <i class="fas fa-exclamation-circle mr-1"></i>
                    Critical
                  </span>
                </div>
                <h4 class="font-semibold text-gray-900 mb-2">Procédure de maîtrise des documents manquante</h4>
                <p class="text-sm text-gray-600 mb-3">Absence de procédure documentée pour la maîtrise des documents selon l'IS...</p>
                <div class="text-xs text-gray-500 mb-3">
                  <i class="fas fa-calendar mr-1"></i>
                  Échéance: 15 déc. 2024
                </div>
                <div class="flex items-center justify-between text-xs">
                  <div class="flex items-center space-x-1">
                    <i class="fas fa-comment text-gray-400"></i>
                    <span class="text-gray-600">2</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="text-gray-600">MD</span>
                    <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded">Marie Dupont</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* En Cours column */}
          <div class="card bg-yellow-50 border-2 border-yellow-200">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-gray-900 flex items-center">
                <i class="fas fa-spinner text-yellow-600 mr-2"></i>
                En Cours
              </h3>
              <span class="bg-yellow-600 text-white text-sm px-3 py-1 rounded-full font-bold">1</span>
            </div>

            <div class="space-y-3" data-status="En Cours">
              <div class="bg-white rounded-lg p-4 border-l-4 border-yellow-500 shadow-sm hover:shadow-md transition-shadow cursor-pointer nc-card" data-status="En Cours" data-severity="Warning" data-title="Critères d'acceptation incomplets">
                <div class="flex items-start justify-between mb-2">
                  <span class="text-sm font-bold text-gray-900">JM</span>
                  <span class="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full flex items-center">
                    <i class="fas fa-exclamation-triangle mr-1"></i>
                    Warning
                  </span>
                </div>
                <h4 class="font-semibold text-gray-900 mb-2">Critères d'acceptation incomplets</h4>
                <p class="text-sm text-gray-600 mb-3">Les critères d'acceptation pour le processus de production ne sont pas parfait...</p>
                <div class="text-xs text-gray-500 mb-3">
                  <i class="fas fa-calendar mr-1"></i>
                  Échéance: 1 déc. 2024
                </div>
                <div class="flex items-center justify-between text-xs">
                  <div class="flex items-center space-x-1">
                    <i class="fas fa-comment text-gray-400"></i>
                    <span class="text-gray-600">0</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="text-gray-600">JM</span>
                    <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded">Jean Martin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Résolu column */}
          <div class="card bg-blue-50 border-2 border-blue-200">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-gray-900 flex items-center">
                <i class="fas fa-check text-blue-600 mr-2"></i>
                Résolu
              </h3>
              <span class="bg-blue-600 text-white text-sm px-3 py-1 rounded-full font-bold">1</span>
            </div>

            <div class="space-y-3" data-status="Résolu">
              <div class="bg-white rounded-lg p-4 border-l-4 border-blue-600 shadow-sm hover:shadow-md transition-shadow cursor-pointer nc-card" data-status="Résolu" data-severity="Info" data-title="Formation du personnel à documenter">
                <div class="flex items-start justify-between mb-2">
                  <span class="text-sm font-bold text-gray-900">SB</span>
                  <span class="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center">
                    <i class="fas fa-info-circle mr-1"></i>
                    Info
                  </span>
                </div>
                <h4 class="font-semibold text-gray-900 mb-2">Formation du personnel à documenter</h4>
                <p class="text-sm text-gray-600 mb-3">Les enregistrements de formation du personnel ne sont pas à jour selon les lor...</p>
                <div class="text-xs text-gray-500 mb-3">
                  <i class="fas fa-calendar mr-1"></i>
                  Échéance: 25 nov. 2024
                </div>
                <div class="flex items-center justify-between text-xs">
                  <div class="flex items-center space-x-1">
                    <i class="fas fa-comment text-gray-400"></i>
                    <span class="text-gray-600">1</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="text-gray-600">SB</span>
                    <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded">Sophie Bernard</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vérifié column */}
          <div class="card bg-green-50 border-2 border-green-200">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-gray-900 flex items-center">
                <i class="fas fa-check-double text-green-600 mr-2"></i>
                Vérifié
              </h3>
              <span class="bg-green-600 text-white text-sm px-3 py-1 rounded-full font-bold">1</span>
            </div>

            <div class="space-y-3" data-status="Vérifié">
              <div class="bg-white rounded-lg p-4 border-l-4 border-green-600 shadow-sm hover:shadow-md transition-shadow cursor-pointer nc-card" data-status="Vérifié" data-severity="Warning" data-title="Plan d'audit interne à réviser">
                <div class="flex items-start justify-between mb-2">
                  <span class="text-sm font-bold text-gray-900">PD</span>
                  <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center">
                    <i class="fas fa-check-circle mr-1"></i>
                    Warning
                  </span>
                </div>
                <h4 class="font-semibold text-gray-900 mb-2">Plan d'audit interne à réviser</h4>
                <p class="text-sm text-gray-600 mb-3">Le programme d'audit interne ne couvre pas tous les processus critiques reco...</p>
                <div class="text-xs text-gray-500 mb-3">
                  <i class="fas fa-calendar mr-1"></i>
                  Échéance: 20 nov. 2024
                </div>
                <div class="flex items-center justify-between text-xs">
                  <div class="flex items-center space-x-1">
                    <i class="fas fa-comment text-gray-400"></i>
                    <span class="text-gray-600">0</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="text-gray-600">PD</span>
                    <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded">Pierre Durand</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* List view (hidden by default) */}
        <div id="listView" class="hidden">
          <div class="card">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-200">
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">Titre</th>
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">Statut</th>
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">Sévérité</th>
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">Responsable</th>
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">Échéance</th>
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody id="listViewBody">
                  <tr class="border-b border-gray-100 hover:bg-gray-50 nc-row" data-status="Identifié" data-severity="Critical" data-title="Procédure de maîtrise des documents manquante">
                    <td class="py-3 px-4 font-medium text-gray-900">MD</td>
                    <td class="py-3 px-4">
                      <div class="font-medium text-gray-900">Procédure de maîtrise des documents manquante</div>
                      <div class="text-sm text-gray-600">Absence de procédure documentée...</div>
                    </td>
                    <td class="py-3 px-4">
                      <span class="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                        <i class="fas fa-exclamation-triangle mr-1"></i>
                        Identifié
                      </span>
                    </td>
                    <td class="py-3 px-4">
                      <span class="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                        <i class="fas fa-exclamation-circle mr-1"></i>
                        Critical
                      </span>
                    </td>
                    <td class="py-3 px-4">
                      <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">Marie Dupont</span>
                    </td>
                    <td class="py-3 px-4 text-sm text-gray-600">15 déc. 2024</td>
                    <td class="py-3 px-4">
                      <button class="text-blue-600 hover:text-blue-700 mr-2">
                        <i class="fas fa-eye"></i>
                      </button>
                      <button class="text-gray-600 hover:text-gray-700">
                        <i class="fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                  <tr class="border-b border-gray-100 hover:bg-gray-50 nc-row" data-status="En Cours" data-severity="Warning" data-title="Critères d'acceptation incomplets">
                    <td class="py-3 px-4 font-medium text-gray-900">JM</td>
                    <td class="py-3 px-4">
                      <div class="font-medium text-gray-900">Critères d'acceptation incomplets</div>
                      <div class="text-sm text-gray-600">Les critères d'acceptation pour le processus...</div>
                    </td>
                    <td class="py-3 px-4">
                      <span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                        <i class="fas fa-spinner mr-1"></i>
                        En Cours
                      </span>
                    </td>
                    <td class="py-3 px-4">
                      <span class="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                        <i class="fas fa-exclamation-triangle mr-1"></i>
                        Warning
                      </span>
                    </td>
                    <td class="py-3 px-4">
                      <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">Jean Martin</span>
                    </td>
                    <td class="py-3 px-4 text-sm text-gray-600">1 déc. 2024</td>
                    <td class="py-3 px-4">
                      <button class="text-blue-600 hover:text-blue-700 mr-2">
                        <i class="fas fa-eye"></i>
                      </button>
                      <button class="text-gray-600 hover:text-gray-700">
                        <i class="fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                  <tr class="border-b border-gray-100 hover:bg-gray-50 nc-row" data-status="Résolu" data-severity="Info" data-title="Formation du personnel à documenter">
                    <td class="py-3 px-4 font-medium text-gray-900">SB</td>
                    <td class="py-3 px-4">
                      <div class="font-medium text-gray-900">Formation du personnel à documenter</div>
                      <div class="text-sm text-gray-600">Les enregistrements de formation...</div>
                    </td>
                    <td class="py-3 px-4">
                      <span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        <i class="fas fa-check mr-1"></i>
                        Résolu
                      </span>
                    </td>
                    <td class="py-3 px-4">
                      <span class="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        <i class="fas fa-info-circle mr-1"></i>
                        Info
                      </span>
                    </td>
                    <td class="py-3 px-4">
                      <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">Sophie Bernard</span>
                    </td>
                    <td class="py-3 px-4 text-sm text-gray-600">25 nov. 2024</td>
                    <td class="py-3 px-4">
                      <button class="text-blue-600 hover:text-blue-700 mr-2">
                        <i class="fas fa-eye"></i>
                      </button>
                      <button class="text-gray-600 hover:text-gray-700">
                        <i class="fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                  <tr class="border-b border-gray-100 hover:bg-gray-50 nc-row" data-status="Vérifié" data-severity="Warning" data-title="Plan d'audit interne à réviser">
                    <td class="py-3 px-4 font-medium text-gray-900">PD</td>
                    <td class="py-3 px-4">
                      <div class="font-medium text-gray-900">Plan d'audit interne à réviser</div>
                      <div class="text-sm text-gray-600">Le programme d'audit interne ne couvre pas...</div>
                    </td>
                    <td class="py-3 px-4">
                      <span class="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        <i class="fas fa-check-double mr-1"></i>
                        Vérifié
                      </span>
                    </td>
                    <td class="py-3 px-4">
                      <span class="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                        <i class="fas fa-exclamation-triangle mr-1"></i>
                        Warning
                      </span>
                    </td>
                    <td class="py-3 px-4">
                      <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">Pierre Durand</span>
                    </td>
                    <td class="py-3 px-4 text-sm text-gray-600">20 nov. 2024</td>
                    <td class="py-3 px-4">
                      <button class="text-blue-600 hover:text-blue-700 mr-2">
                        <i class="fas fa-eye"></i>
                      </button>
                      <button class="text-gray-600 hover:text-gray-700">
                        <i class="fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <script dangerouslySetInnerHTML={{
          __html: `
            // View switching
            function switchView(view) {
              const kanbanView = document.getElementById('kanbanView');
              const listView = document.getElementById('listView');
              const kanbanBtn = document.getElementById('kanbanViewBtn');
              const listBtn = document.getElementById('listViewBtn');

              if (view === 'kanban') {
                kanbanView.classList.remove('hidden');
                listView.classList.add('hidden');
                kanbanBtn.classList.add('bg-white', 'text-blue-600', 'shadow-sm');
                kanbanBtn.classList.remove('text-gray-600');
                listBtn.classList.remove('bg-white', 'text-blue-600', 'shadow-sm');
                listBtn.classList.add('text-gray-600');
              } else {
                kanbanView.classList.add('hidden');
                listView.classList.remove('hidden');
                listBtn.classList.add('bg-white', 'text-blue-600', 'shadow-sm');
                listBtn.classList.remove('text-gray-600');
                kanbanBtn.classList.remove('bg-white', 'text-blue-600', 'shadow-sm');
                kanbanBtn.classList.add('text-gray-600');
              }
            }

            // Filter functionality
            function filterNC() {
              const searchValue = document.getElementById('searchInput').value.toLowerCase();
              const statusValue = document.getElementById('statusFilter').value;
              const severityValue = document.getElementById('severityFilter').value;

              // Filter Kanban cards
              const kanbanCards = document.querySelectorAll('.nc-card');
              kanbanCards.forEach(card => {
                const title = card.getAttribute('data-title').toLowerCase();
                const status = card.getAttribute('data-status');
                const severity = card.getAttribute('data-severity');

                const matchSearch = title.includes(searchValue);
                const matchStatus = !statusValue || status === statusValue;
                const matchSeverity = !severityValue || severity === severityValue;

                if (matchSearch && matchStatus && matchSeverity) {
                  card.classList.remove('hidden');
                } else {
                  card.classList.add('hidden');
                }
              });

              // Filter List view rows
              const listRows = document.querySelectorAll('.nc-row');
              listRows.forEach(row => {
                const title = row.getAttribute('data-title').toLowerCase();
                const status = row.getAttribute('data-status');
                const severity = row.getAttribute('data-severity');

                const matchSearch = title.includes(searchValue);
                const matchStatus = !statusValue || status === statusValue;
                const matchSeverity = !severityValue || severity === severityValue;

                if (matchSearch && matchStatus && matchSeverity) {
                  row.classList.remove('hidden');
                } else {
                  row.classList.add('hidden');
                }
              });
            }

            // Reset filters
            function resetFilters() {
              document.getElementById('searchInput').value = '';
              document.getElementById('statusFilter').value = '';
              document.getElementById('severityFilter').value = '';
              filterNC();
            }

            // Create new NC
            function createNewNC() {
              Utils.showNotification('Fonctionnalité en cours de développement', 'info');
            }
          `
        }} />
      </div>
    </Layout>
  )
}
