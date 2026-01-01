import { Layout } from '../components/layout'

export function BibliothequePage() {
  return (
    <Layout currentPage="bibliotheque">
      <div class="space-y-6">
        {/* Page header */}
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Bibliothèque Documentaire</h1>
            <p class="text-gray-600">Accédez et gérez tous vos documents qualité</p>
          </div>
          <button class="btn btn-primary">
            <i class="fas fa-upload mr-2"></i>
            Importer un document
          </button>
        </div>

        {/* Statistics */}
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="card shadow-card-hover">
            <div class="text-sm font-medium text-gray-600 mb-1">Total Documents</div>
            <div class="text-3xl font-bold text-gray-900 mb-2">156</div>
            <div class="text-sm text-green-600 flex items-center">
              <i class="fas fa-arrow-up mr-1"></i>
              +8 ce mois
            </div>
          </div>

          <div class="card shadow-card-hover">
            <div class="text-sm font-medium text-gray-600 mb-1">Procédures</div>
            <div class="text-3xl font-bold text-blue-600 mb-2">42</div>
            <div class="text-sm text-gray-600">Actives</div>
          </div>

          <div class="card shadow-card-hover">
            <div class="text-sm font-medium text-gray-600 mb-1">Formulaires</div>
            <div class="text-3xl font-bold text-purple-600 mb-2">68</div>
            <div class="text-sm text-gray-600">En utilisation</div>
          </div>

          <div class="card shadow-card-hover">
            <div class="text-sm font-medium text-gray-600 mb-1">Enregistrements</div>
            <div class="text-3xl font-bold text-green-600 mb-2">46</div>
            <div class="text-sm text-gray-600">Archivés</div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left sidebar - ISO Processes tree */}
          <div class="card">
            <h3 class="font-bold text-gray-900 mb-4">
              <i class="fas fa-sitemap text-blue-600 mr-2"></i>
              Processus ISO 9001
            </h3>
            
            <div class="space-y-2">
              <div class="cursor-pointer">
                <div class="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div class="flex items-center space-x-2">
                    <i class="fas fa-chevron-down text-gray-400 text-xs"></i>
                    <i class="fas fa-folder text-blue-600"></i>
                    <span class="text-sm font-medium text-gray-900">§ 4 Contexte</span>
                  </div>
                  <span class="text-xs text-gray-500">8</span>
                </div>
                <div class="ml-6 mt-1 space-y-1">
                  <div class="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                    <div class="flex items-center space-x-2">
                      <i class="fas fa-file-alt text-gray-400 text-xs"></i>
                      <span class="text-xs text-gray-700">4.4 SMQ</span>
                    </div>
                    <span class="text-xs text-gray-500">3</span>
                  </div>
                </div>
              </div>

              <div class="cursor-pointer">
                <div class="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div class="flex items-center space-x-2">
                    <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
                    <i class="fas fa-folder text-blue-600"></i>
                    <span class="text-sm font-medium text-gray-900">§ 5 Leadership</span>
                  </div>
                  <span class="text-xs text-gray-500">6</span>
                </div>
              </div>

              <div class="cursor-pointer">
                <div class="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div class="flex items-center space-x-2">
                    <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
                    <i class="fas fa-folder text-blue-600"></i>
                    <span class="text-sm font-medium text-gray-900">§ 7 Support</span>
                  </div>
                  <span class="text-xs text-gray-500">24</span>
                </div>
              </div>

              <div class="cursor-pointer">
                <div class="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                  <div class="flex items-center space-x-2">
                    <i class="fas fa-chevron-down text-blue-600 text-xs"></i>
                    <i class="fas fa-folder-open text-blue-600"></i>
                    <span class="text-sm font-medium text-blue-600">§ 8 Réalisation</span>
                  </div>
                  <span class="text-xs text-blue-600">68</span>
                </div>
                <div class="ml-6 mt-1 space-y-1">
                  <div class="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                    <div class="flex items-center space-x-2">
                      <i class="fas fa-file-alt text-gray-400 text-xs"></i>
                      <span class="text-xs text-gray-700">8.3 Conception</span>
                    </div>
                    <span class="text-xs text-gray-500">12</span>
                  </div>
                  <div class="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                    <div class="flex items-center space-x-2">
                      <i class="fas fa-file-alt text-blue-600 text-xs"></i>
                      <span class="text-xs text-blue-600 font-medium">8.4 Achats</span>
                    </div>
                    <span class="text-xs text-blue-600">28</span>
                  </div>
                  <div class="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                    <div class="flex items-center space-x-2">
                      <i class="fas fa-file-alt text-gray-400 text-xs"></i>
                      <span class="text-xs text-gray-700">8.5 Production</span>
                    </div>
                    <span class="text-xs text-gray-500">28</span>
                  </div>
                </div>
              </div>

              <div class="cursor-pointer">
                <div class="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div class="flex items-center space-x-2">
                    <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
                    <i class="fas fa-folder text-blue-600"></i>
                    <span class="text-sm font-medium text-gray-900">§ 9 Évaluation</span>
                  </div>
                  <span class="text-xs text-gray-500">32</span>
                </div>
              </div>

              <div class="cursor-pointer">
                <div class="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div class="flex items-center space-x-2">
                    <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
                    <i class="fas fa-folder text-blue-600"></i>
                    <span class="text-sm font-medium text-gray-900">§ 10 Amélioration</span>
                  </div>
                  <span class="text-xs text-gray-500">18</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main content - Documents list */}
          <div class="lg:col-span-3 space-y-6">
            {/* Search and filters */}
            <div class="card">
              <div class="flex items-center space-x-4">
                <div class="flex-1">
                  <input 
                    type="text" 
                    class="input-field" 
                    placeholder="Rechercher un document..."
                  />
                </div>
                <select class="input-field w-48">
                  <option>Tous les types</option>
                  <option>Procédures</option>
                  <option>Formulaires</option>
                  <option>Enregistrements</option>
                  <option>Manuels</option>
                </select>
                <button class="btn bg-gray-500 hover:bg-gray-600 text-white">
                  <i class="fas fa-filter mr-2"></i>
                  Filtres
                </button>
              </div>
            </div>

            {/* Documents table */}
            <div class="card">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-bold text-gray-900">Documents - § 8.4 Achats (28)</h3>
                <div class="flex items-center space-x-2">
                  <button class="p-2 hover:bg-gray-100 rounded-lg">
                    <i class="fas fa-th text-gray-600"></i>
                  </button>
                  <button class="p-2 bg-gray-100 rounded-lg">
                    <i class="fas fa-list text-gray-900"></i>
                  </button>
                </div>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th class="text-left p-3 text-sm font-semibold text-gray-600">
                        <input type="checkbox" class="rounded border-gray-300" />
                      </th>
                      <th class="text-left p-3 text-sm font-semibold text-gray-600">Document</th>
                      <th class="text-left p-3 text-sm font-semibold text-gray-600">Type</th>
                      <th class="text-left p-3 text-sm font-semibold text-gray-600">Version</th>
                      <th class="text-left p-3 text-sm font-semibold text-gray-600">Date</th>
                      <th class="text-left p-3 text-sm font-semibold text-gray-600">Auteur</th>
                      <th class="text-left p-3 text-sm font-semibold text-gray-600">Statut</th>
                      <th class="text-left p-3 text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr class="hover:bg-gray-50 cursor-pointer">
                      <td class="p-3">
                        <input type="checkbox" class="rounded border-gray-300" />
                      </td>
                      <td class="p-3">
                        <div class="flex items-center space-x-3">
                          <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-file-pdf text-blue-600"></i>
                          </div>
                          <div>
                            <div class="font-medium text-gray-900">PROC-ACH-001</div>
                            <div class="text-xs text-gray-500">Procédure d'achat</div>
                          </div>
                        </div>
                      </td>
                      <td class="p-3">
                        <span class="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Procédure</span>
                      </td>
                      <td class="p-3 text-sm text-gray-900">v2.1</td>
                      <td class="p-3 text-sm text-gray-600">15/12/2024</td>
                      <td class="p-3 text-sm text-gray-600">Fatima R.</td>
                      <td class="p-3">
                        <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                          <i class="fas fa-check mr-1"></i>
                          Validé
                        </span>
                      </td>
                      <td class="p-3">
                        <div class="flex items-center space-x-2">
                          <button class="p-2 hover:bg-gray-100 rounded-lg" title="Télécharger">
                            <i class="fas fa-download text-gray-600"></i>
                          </button>
                          <button class="p-2 hover:bg-gray-100 rounded-lg" title="Voir">
                            <i class="fas fa-eye text-gray-600"></i>
                          </button>
                          <button class="p-2 hover:bg-gray-100 rounded-lg" title="Plus">
                            <i class="fas fa-ellipsis-v text-gray-600"></i>
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr class="hover:bg-gray-50 cursor-pointer">
                      <td class="p-3">
                        <input type="checkbox" class="rounded border-gray-300" />
                      </td>
                      <td class="p-3">
                        <div class="flex items-center space-x-3">
                          <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-file-word text-purple-600"></i>
                          </div>
                          <div>
                            <div class="font-medium text-gray-900">FORM-EVAL-FOUR-001</div>
                            <div class="text-xs text-gray-500">Formulaire évaluation fournisseur</div>
                          </div>
                        </div>
                      </td>
                      <td class="p-3">
                        <span class="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">Formulaire</span>
                      </td>
                      <td class="p-3 text-sm text-gray-900">v1.3</td>
                      <td class="p-3 text-sm text-gray-600">12/12/2024</td>
                      <td class="p-3 text-sm text-gray-600">Hassan M.</td>
                      <td class="p-3">
                        <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                          <i class="fas fa-check mr-1"></i>
                          Validé
                        </span>
                      </td>
                      <td class="p-3">
                        <div class="flex items-center space-x-2">
                          <button class="p-2 hover:bg-gray-100 rounded-lg">
                            <i class="fas fa-download text-gray-600"></i>
                          </button>
                          <button class="p-2 hover:bg-gray-100 rounded-lg">
                            <i class="fas fa-eye text-gray-600"></i>
                          </button>
                          <button class="p-2 hover:bg-gray-100 rounded-lg">
                            <i class="fas fa-ellipsis-v text-gray-600"></i>
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr class="hover:bg-gray-50 cursor-pointer">
                      <td class="p-3">
                        <input type="checkbox" class="rounded border-gray-300" />
                      </td>
                      <td class="p-3">
                        <div class="flex items-center space-x-3">
                          <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-file-pdf text-blue-600"></i>
                          </div>
                          <div>
                            <div class="font-medium text-gray-900">PROC-SEL-FOUR-002</div>
                            <div class="text-xs text-gray-500">Procédure sélection fournisseurs</div>
                          </div>
                        </div>
                      </td>
                      <td class="p-3">
                        <span class="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Procédure</span>
                      </td>
                      <td class="p-3 text-sm text-gray-900">v1.0</td>
                      <td class="p-3 text-sm text-gray-600">10/12/2024</td>
                      <td class="p-3 text-sm text-gray-600">Youssef A.</td>
                      <td class="p-3">
                        <span class="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                          <i class="fas fa-clock mr-1"></i>
                          En révision
                        </span>
                      </td>
                      <td class="p-3">
                        <div class="flex items-center space-x-2">
                          <button class="p-2 hover:bg-gray-100 rounded-lg">
                            <i class="fas fa-download text-gray-600"></i>
                          </button>
                          <button class="p-2 hover:bg-gray-100 rounded-lg">
                            <i class="fas fa-eye text-gray-600"></i>
                          </button>
                          <button class="p-2 hover:bg-gray-100 rounded-lg">
                            <i class="fas fa-ellipsis-v text-gray-600"></i>
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr class="hover:bg-gray-50 cursor-pointer">
                      <td class="p-3">
                        <input type="checkbox" class="rounded border-gray-300" />
                      </td>
                      <td class="p-3">
                        <div class="flex items-center space-x-3">
                          <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-file-excel text-green-600"></i>
                          </div>
                          <div>
                            <div class="font-medium text-gray-900">ENREG-AUDIT-FOUR-003</div>
                            <div class="text-xs text-gray-500">Enregistrement audit fournisseur</div>
                          </div>
                        </div>
                      </td>
                      <td class="p-3">
                        <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Enregistrement</span>
                      </td>
                      <td class="p-3 text-sm text-gray-900">v1.2</td>
                      <td class="p-3 text-sm text-gray-600">08/12/2024</td>
                      <td class="p-3 text-sm text-gray-600">Fatima R.</td>
                      <td class="p-3">
                        <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                          <i class="fas fa-check mr-1"></i>
                          Validé
                        </span>
                      </td>
                      <td class="p-3">
                        <div class="flex items-center space-x-2">
                          <button class="p-2 hover:bg-gray-100 rounded-lg">
                            <i class="fas fa-download text-gray-600"></i>
                          </button>
                          <button class="p-2 hover:bg-gray-100 rounded-lg">
                            <i class="fas fa-eye text-gray-600"></i>
                          </button>
                          <button class="p-2 hover:bg-gray-100 rounded-lg">
                            <i class="fas fa-ellipsis-v text-gray-600"></i>
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr class="hover:bg-gray-50 cursor-pointer">
                      <td class="p-3">
                        <input type="checkbox" class="rounded border-gray-300" />
                      </td>
                      <td class="p-3">
                        <div class="flex items-center space-x-3">
                          <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-file-alt text-purple-600"></i>
                          </div>
                          <div>
                            <div class="font-medium text-gray-900">FORM-CMD-FOUR-004</div>
                            <div class="text-xs text-gray-500">Formulaire commande fournisseur</div>
                          </div>
                        </div>
                      </td>
                      <td class="p-3">
                        <span class="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">Formulaire</span>
                      </td>
                      <td class="p-3 text-sm text-gray-900">v2.0</td>
                      <td class="p-3 text-sm text-gray-600">05/12/2024</td>
                      <td class="p-3 text-sm text-gray-600">Hassan M.</td>
                      <td class="p-3">
                        <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                          <i class="fas fa-check mr-1"></i>
                          Validé
                        </span>
                      </td>
                      <td class="p-3">
                        <div class="flex items-center space-x-2">
                          <button class="p-2 hover:bg-gray-100 rounded-lg">
                            <i class="fas fa-download text-gray-600"></i>
                          </button>
                          <button class="p-2 hover:bg-gray-100 rounded-lg">
                            <i class="fas fa-eye text-gray-600"></i>
                          </button>
                          <button class="p-2 hover:bg-gray-100 rounded-lg">
                            <i class="fas fa-ellipsis-v text-gray-600"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div class="text-sm text-gray-600">
                  Affichage de 1 à 5 sur 28 documents
                </div>
                <div class="flex items-center space-x-2">
                  <button class="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                    Précédent
                  </button>
                  <button class="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">1</button>
                  <button class="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">2</button>
                  <button class="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">3</button>
                  <button class="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                    Suivant
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
