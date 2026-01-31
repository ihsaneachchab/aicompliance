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
            <div class="text-3xl font-bold text-red-600 mb-2" id="statsCritiques">0</div>
            <div class="text-sm text-red-600">
              <i class="fas fa-exclamation-circle mr-1"></i>
              Urgent
            </div>
          </div>

          <div class="card shadow-card-hover border-l-4 border-yellow-500">
            <div class="text-sm font-medium text-gray-600 mb-1">En Cours</div>
            <div class="text-3xl font-bold text-yellow-600 mb-2" id="statsEnCours">0</div>
            <div class="text-sm text-yellow-600">
              <i class="fas fa-clock mr-1"></i>
              En traitement
            </div>
          </div>

          <div class="card shadow-card-hover border-l-4 border-blue-500">
            <div class="text-sm font-medium text-gray-600 mb-1">Résolues</div>
            <div class="text-3xl font-bold text-blue-600 mb-2" id="statsResolues">0</div>
            <div class="text-sm text-blue-600">
              <i class="fas fa-check mr-1"></i>
              À vérifier
            </div>
          </div>

          <div class="card shadow-card-hover border-l-4 border-green-500">
            <div class="text-sm font-medium text-gray-600 mb-1">Vérifiées</div>
            <div class="text-3xl font-bold text-green-600 mb-2" id="statsVerifiees">0</div>
            <div class="text-sm text-green-600">
              <i class="fas fa-check-double mr-1"></i>
              Validées
            </div>
          </div>

          <div class="card shadow-card-hover border-l-4 border-gray-400">
            <div class="text-sm font-medium text-gray-600 mb-1">Total</div>
            <div class="text-3xl font-bold text-gray-900 mb-2" id="statsTotal">0</div>
            <div class="text-sm text-gray-600">
              Toutes NC
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
                  class="input-field pl-10 w-full"
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
          <div
            class="card bg-red-50 border-2 border-red-200"
            ondragover="handleDragOver(event)"
            ondrop="handleDrop(event, 'Identifié')"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-gray-900 flex items-center">
                <i class="fas fa-exclamation-triangle text-red-600 mr-2"></i>
                Identifié
              </h3>
              <span class="bg-red-600 text-white text-sm px-3 py-1 rounded-full font-bold" id="countIdentifie">0</span>
            </div>
            <div class="space-y-3 min-h-[100px]" id="colIdentifie"></div>
          </div>

          {/* En Cours column */}
          <div
            class="card bg-yellow-50 border-2 border-yellow-200"
            ondragover="handleDragOver(event)"
            ondrop="handleDrop(event, 'En Cours')"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-gray-900 flex items-center">
                <i class="fas fa-spinner text-yellow-600 mr-2"></i>
                En Cours
              </h3>
              <span class="bg-yellow-600 text-white text-sm px-3 py-1 rounded-full font-bold" id="countEnCours">0</span>
            </div>
            <div class="space-y-3 min-h-[100px]" id="colEnCours"></div>
          </div>

          {/* Résolu column */}
          <div
            class="card bg-blue-50 border-2 border-blue-200"
            ondragover="handleDragOver(event)"
            ondrop="handleDrop(event, 'Résolu')"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-gray-900 flex items-center">
                <i class="fas fa-check text-blue-600 mr-2"></i>
                Résolu
              </h3>
              <span class="bg-blue-600 text-white text-sm px-3 py-1 rounded-full font-bold" id="countResolue">0</span>
            </div>
            <div class="space-y-3 min-h-[100px]" id="colResolue"></div>
          </div>

          {/* Vérifié column */}
          <div
            class="card bg-green-50 border-2 border-green-200"
            ondragover="handleDragOver(event)"
            ondrop="handleDrop(event, 'Vérifié')"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-gray-900 flex items-center">
                <i class="fas fa-check-double text-green-600 mr-2"></i>
                Vérifié
              </h3>
              <span class="bg-green-600 text-white text-sm px-3 py-1 rounded-full font-bold" id="countVerifiee">0</span>
            </div>
            <div class="space-y-3 min-h-[100px]" id="colVerifiee"></div>
          </div>
        </div>

        {/* List view (hidden by default) */}
        <div id="listView" class="hidden">
          <div class="card">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-200">
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">Titre</th>
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">Statut</th>
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">Sévérité</th>
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">Responsable</th>
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody id="listViewBody"></tbody>
              </table>
            </div>
          </div>
        </div>

        <script dangerouslySetInnerHTML={{
          __html: `
            let allNCs = [];
            let currentView = 'kanban';

            async function loadNCs() {
              try {
                const response = await fetch('http://localhost:8000/api/conformity/non-conformities');
                const data = await response.json();
                allNCs = data.non_conformities || [];
                filterNC(); // Display filtered content
                updateStats(); // But stats always show total
              } catch (error) {
                console.error('Error loading NCs:', error);
              }
            }

            function updateStats() {
              const stats = {
                critiques: allNCs.filter(nc => nc.severity === 'Critical').length,
                enCours: allNCs.filter(nc => nc.status === 'En Cours').length,
                resolues: allNCs.filter(nc => nc.status === 'Résolu').length,
                verifiees: allNCs.filter(nc => nc.status === 'Vérifié').length,
                total: allNCs.length
              };

              document.getElementById('statsCritiques').textContent = stats.critiques;
              document.getElementById('statsEnCours').textContent = stats.enCours;
              document.getElementById('statsResolues').textContent = stats.resolues;
              document.getElementById('statsVerifiees').textContent = stats.verifiees;
              document.getElementById('statsTotal').textContent = stats.total;
            }

            function filterNC() {
                const searchTerm = document.getElementById('searchInput').value.toLowerCase();
                const statusFilter = document.getElementById('statusFilter').value;
                const severityFilter = document.getElementById('severityFilter').value;

                const filtered = allNCs.filter(nc => {
                    const matchesSearch = nc.title.toLowerCase().includes(searchTerm) || 
                                          nc.description.toLowerCase().includes(searchTerm) ||
                                          nc.clause.includes(searchTerm);
                    const matchesStatus = statusFilter ? nc.status === statusFilter : true;
                    const matchesSeverity = severityFilter ? nc.severity === severityFilter : true;
                    return matchesSearch && matchesStatus && matchesSeverity;
                });

                displayNCs(filtered);
            }
            
            function resetFilters() {
                document.getElementById('searchInput').value = '';
                document.getElementById('statusFilter').value = '';
                document.getElementById('severityFilter').value = '';
                filterNC();
            }

            function displayNCs(ncs) {
              const columns = {
                'Identifié': document.getElementById('colIdentifie'),
                'En Cours': document.getElementById('colEnCours'),
                'Résolu': document.getElementById('colResolue'),
                'Vérifié': document.getElementById('colVerifiee')
              };

              // Clear columns
              Object.values(columns).forEach(col => col.innerHTML = '');
              
              const listBody = document.getElementById('listViewBody');
              listBody.innerHTML = '';
              
              const counts = { 'Identifié': 0, 'En Cours': 0, 'Résolu': 0, 'Vérifié': 0 };

              ncs.forEach(nc => {
                // Update counts for visible headers
                if (counts[nc.status] !== undefined) counts[nc.status]++;
                
                // Kanban Card
                if (columns[nc.status]) {
                    const card = document.createElement('div');
                    card.className = 'bg-white rounded-lg p-4 border-l-4 ' + getSeverityBorder(nc.severity) + ' shadow-sm hover:shadow-md transition-shadow cursor-grab mb-3';
                    card.draggable = true;
                    card.ondragstart = (e) => handleDragStart(e, nc._id);
                    
                    card.innerHTML = '<div class="flex items-start justify-between mb-2">' +
                    '<span class="text-sm font-bold text-gray-900">' + nc.clause + '</span>' +
                    '<span class="' + getSeverityBadge(nc.severity) + ' text-xs px-2 py-1 rounded-full flex items-center">' +
                        '<i class="fas ' + getSeverityIcon(nc.severity) + ' mr-1"></i>' + nc.severity +
                    '</span>' +
                    '</div>' +
                    '<h4 class="font-semibold text-gray-900 mb-2">' + nc.title + '</h4>' +
                    '<p class="text-sm text-gray-600 mb-3">' + (nc.description.length > 100 ? nc.description.substring(0, 100) + '...' : nc.description) + '</p>' +
                    '<div class="flex items-center justify-between text-xs">' +
                    '<span class="bg-blue-100 text-blue-700 px-2 py-1 rounded">' + (nc.responsible || 'À assigner') + '</span>' +
                    '</div>';
                    
                    columns[nc.status].appendChild(card);
                }

                // List Row
                const row = document.createElement('tr');
                row.className = 'border-b border-gray-100 hover:bg-gray-50';
                row.innerHTML = '<td class="py-3 px-4">' +
                  '<div class="font-medium text-gray-900">' + nc.title + '</div>' +
                  '<div class="text-sm text-gray-600">Clause ' + nc.clause + '</div>' +
                '</td>' +
                '<td class="py-3 px-4">' +
                  '<span class="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">' + nc.status + '</span>' +
                '</td>' +
                '<td class="py-3 px-4">' +
                  '<span class="px-3 py-1 ' + getSeverityBadge(nc.severity) + ' text-xs font-medium rounded-full">' + nc.severity + '</span>' +
                '</td>' +
                '<td class="py-3 px-4">' +
                  '<span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">' + (nc.responsible || 'À assigner') + '</span>' +
                '</td>' +
                '<td class="py-3 px-4">' +
                  '<button class="text-blue-600 hover:text-blue-700 mr-2"><i class="fas fa-eye"></i></button>' +
                '</td>';
                listBody.appendChild(row);
              });

              // Update column counts (based on filtered view)
              document.getElementById('countIdentifie').textContent = counts['Identifié'];
              document.getElementById('countEnCours').textContent = counts['En Cours'];
              document.getElementById('countResolue').textContent = counts['Résolu'];
              document.getElementById('countVerifiee').textContent = counts['Vérifié'];
              
              // Handle empty state
              if (ncs.length === 0) {
                 const emptyRow = document.createElement('tr');
                 emptyRow.innerHTML = '<td colspan="5" class="text-center py-8 text-gray-500">Aucune non-conformité trouvée</td>';
                 listBody.appendChild(emptyRow);
              }
            }
            
            // Drag and Drop Logic
            function handleDragStart(e, id) {
                e.dataTransfer.setData('text/plain', id);
                e.dataTransfer.effectAllowed = "move";
            }

            function handleDragOver(e) {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                // Optional: add visual cue for drop target
            }

            async function handleDrop(e, newStatus) {
                e.preventDefault();
                const id = e.dataTransfer.getData('text/plain');
                if (id) {
                    await changeNCStatus(id, newStatus);
                }
            }

            async function changeNCStatus(id, newStatus) {
              // Optimistic UI update
              const ncIndex = allNCs.findIndex(n => n._id === id);
              if (ncIndex === -1) return;
              
              const oldStatus = allNCs[ncIndex].status;
              allNCs[ncIndex].status = newStatus;
              filterNC(); // Re-render

              try {
                const response = await fetch('http://localhost:8000/api/conformity/non-conformities/' + id + '?status=' + encodeURIComponent(newStatus), {
                  method: 'PATCH'
                });
                
                if (response.ok) {
                   // Success - maybe show notification
                   // Utils.showNotification('Statut mis à jour', 'success');
                } else {
                   // Revert on failure
                   allNCs[ncIndex].status = oldStatus;
                   filterNC();
                   console.error('Failed to update status');
                }
              } catch (error) {
                allNCs[ncIndex].status = oldStatus;
                filterNC();
                console.error('Error updating status:', error);
              }
            }

            function getSeverityBorder(sev) {
              if (sev === 'Critical') return 'border-red-600';
              if (sev === 'Warning') return 'border-yellow-500';
              return 'border-blue-500';
            }

            function getSeverityBadge(sev) {
              if (sev === 'Critical') return 'bg-red-100 text-red-700';
              if (sev === 'Warning') return 'bg-yellow-100 text-yellow-700';
              return 'bg-blue-100 text-blue-700';
            }

            function getSeverityIcon(sev) {
              if (sev === 'Critical') return 'fa-exclamation-circle';
              if (sev === 'Warning') return 'fa-exclamation-triangle';
              return 'fa-info-circle';
            }

            function switchView(view) {
              currentView = view;
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

            document.addEventListener('DOMContentLoaded', loadNCs);
          `
        }} />
      </div>
    </Layout>
  )
}
