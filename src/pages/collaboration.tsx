import { Layout } from '../components/layout'

export function CollaborationPage() {
  return (
    <Layout currentPage="collaboration">
      <div class="space-y-6">
        {/* Page header */}
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Collaboration et Workflow</h1>
          <p class="text-gray-600">Validation collaborative des analyses</p>
        </div>

        {/* Two column layout */}
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - En attente de validation */}
          <div class="lg:col-span-2 space-y-6">
            {/* En attente de validation */}
            <div class="card">
              <h2 class="text-xl font-bold text-gray-900 mb-4">En attente de validation</h2>
              
              <div class="space-y-3">
                {/* Document 1 */}
                <div class="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onclick="openValidationModal('doc1')">
                  <div class="flex items-start justify-between mb-3">
                    <div class="flex items-start space-x-3 flex-1">
                      <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-file-alt text-blue-600"></i>
                      </div>
                      <div class="flex-1">
                        <div class="font-semibold text-gray-900 mb-1">Manuel Qualité v2.4</div>
                        <div class="flex items-center space-x-3 text-sm text-gray-600">
                          <span>
                            <i class="fas fa-user mr-1"></i>
                            Marie Dupont
                          </span>
                          <span>
                            <i class="far fa-clock mr-1"></i>
                            Il y a 2h
                          </span>
                        </div>
                      </div>
                    </div>
                    <span class="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full font-medium">
                      <i class="fas fa-exclamation-circle mr-1"></i>
                      Urgent
                    </span>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                      <button class="btn btn-primary py-2 px-4 text-sm" onclick="event.stopPropagation(); approveDocument('doc1')">
                        <i class="fas fa-check mr-2"></i>
                        Approuver
                      </button>
                      <button class="btn btn-secondary py-2 px-4 text-sm" onclick="event.stopPropagation(); openCommentModal('doc1')">
                        <i class="fas fa-comment mr-2"></i>
                        Commenter
                      </button>
                      <button class="text-blue-600 hover:text-blue-700 text-sm font-medium" onclick="event.stopPropagation(); viewDocument('doc1')">
                        Voir le document
                      </button>
                    </div>
                  </div>
                </div>

                {/* Document 2 */}
                <div class="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onclick="openValidationModal('doc2')">
                  <div class="flex items-start justify-between mb-3">
                    <div class="flex items-start space-x-3 flex-1">
                      <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-file-alt text-blue-600"></i>
                      </div>
                      <div class="flex-1">
                        <div class="font-semibold text-gray-900 mb-1">Procédure Gestion NC</div>
                        <div class="flex items-center space-x-3 text-sm text-gray-600">
                          <span>
                            <i class="fas fa-user mr-1"></i>
                            Jean Martin
                          </span>
                          <span>
                            <i class="far fa-clock mr-1"></i>
                            Il y a 5h
                          </span>
                        </div>
                      </div>
                    </div>
                    <span class="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-medium">
                      <i class="fas fa-clock mr-1"></i>
                      Normal
                    </span>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                      <button class="btn btn-primary py-2 px-4 text-sm" onclick="event.stopPropagation(); approveDocument('doc2')">
                        <i class="fas fa-check mr-2"></i>
                        Approuver
                      </button>
                      <button class="btn btn-secondary py-2 px-4 text-sm" onclick="event.stopPropagation(); openCommentModal('doc2')">
                        <i class="fas fa-comment mr-2"></i>
                        Commenter
                      </button>
                      <button class="text-blue-600 hover:text-blue-700 text-sm font-medium" onclick="event.stopPropagation(); viewDocument('doc2')">
                        Voir le document
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Workflow de validation */}
            <div class="card">
              <h2 class="text-xl font-bold text-gray-900 mb-4">Workflow de validation</h2>
              
              <div class="flex items-center justify-between">
                {/* Étape 1: Soumission */}
                <div class="flex flex-col items-center flex-1">
                  <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <i class="fas fa-check text-green-600 text-xl"></i>
                  </div>
                  <div class="text-sm font-medium text-gray-900 mb-1">Soumission</div>
                  <div class="text-xs text-gray-500 text-center">Document soumis</div>
                </div>

                {/* Connector */}
                <div class="flex-1 h-1 bg-green-200 mx-2 relative top-[-20px]"></div>

                {/* Étape 2: Révision */}
                <div class="flex flex-col items-center flex-1">
                  <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <i class="fas fa-check text-green-600 text-xl"></i>
                  </div>
                  <div class="text-sm font-medium text-gray-900 mb-1">Révision</div>
                  <div class="text-xs text-gray-500 text-center">Révision complétée</div>
                </div>

                {/* Connector */}
                <div class="flex-1 h-1 bg-blue-200 mx-2 relative top-[-20px]"></div>

                {/* Étape 3: Validation */}
                <div class="flex flex-col items-center flex-1">
                  <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2 animate-pulse">
                    <i class="fas fa-spinner text-blue-600 text-xl"></i>
                  </div>
                  <div class="text-sm font-medium text-blue-600 mb-1">Validation</div>
                  <div class="text-xs text-gray-500 text-center">En cours</div>
                </div>

                {/* Connector */}
                <div class="flex-1 h-1 bg-gray-200 mx-2 relative top-[-20px]"></div>

                {/* Étape 4: Approbation */}
                <div class="flex flex-col items-center flex-1">
                  <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <i class="fas fa-hourglass-half text-gray-400 text-xl"></i>
                  </div>
                  <div class="text-sm font-medium text-gray-400 mb-1">Approbation</div>
                  <div class="text-xs text-gray-500 text-center">En attente</div>
                </div>

                {/* Connector */}
                <div class="flex-1 h-1 bg-gray-200 mx-2 relative top-[-20px]"></div>

                {/* Étape 5: Publication */}
                <div class="flex flex-col items-center flex-1">
                  <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <i class="fas fa-upload text-gray-400 text-xl"></i>
                  </div>
                  <div class="text-sm font-medium text-gray-400 mb-1">Publication</div>
                  <div class="text-xs text-gray-500 text-center">À venir</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Notifications */}
          <div class="space-y-6">
            {/* Notifications */}
            <div class="card">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold text-gray-900">Notifications</h2>
                <button class="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Voir toutes les notifications
                </button>
              </div>
              
              <div class="space-y-3">
                {/* Notification 1 */}
                <div class="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <div class="flex items-start space-x-2">
                    <i class="fas fa-bell text-blue-600 mt-1"></i>
                    <div class="flex-1">
                      <div class="text-sm font-medium text-gray-900 mb-1">
                        Votre validation est requise pour le Manuel Qualité
                      </div>
                      <div class="text-xs text-gray-600">Il y a 2h</div>
                    </div>
                  </div>
                </div>

                {/* Notification 2 */}
                <div class="p-3 bg-gray-50 border-l-4 border-gray-300 rounded">
                  <div class="flex items-start space-x-2">
                    <i class="fas fa-comment text-gray-600 mt-1"></i>
                    <div class="flex-1">
                      <div class="text-sm font-medium text-gray-900 mb-1">
                        Jean Martin a commenté votre analyse
                      </div>
                      <div class="text-xs text-gray-600">Il y a 5h</div>
                    </div>
                  </div>
                </div>

                {/* Notification 3 */}
                <div class="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                  <div class="flex items-start space-x-2">
                    <i class="fas fa-check-circle text-green-600 mt-1"></i>
                    <div class="flex-1">
                      <div class="text-sm font-medium text-gray-900 mb-1">
                        Votre document a été approuvé
                      </div>
                      <div class="text-xs text-gray-600">Hier</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Paramètrage des notifications */}
            <div class="card">
              <h3 class="font-bold text-gray-900 mb-4">
                <i class="fas fa-cog text-gray-600 mr-2"></i>
                Paramètres de notification
              </h3>
              
              <div class="space-y-3">
                <label class="flex items-center justify-between cursor-pointer">
                  <span class="text-sm text-gray-700">Documents en attente</span>
                  <input type="checkbox" checked class="form-checkbox h-5 w-5 text-blue-600 rounded" />
                </label>
                
                <label class="flex items-center justify-between cursor-pointer">
                  <span class="text-sm text-gray-700">Nouveaux commentaires</span>
                  <input type="checkbox" checked class="form-checkbox h-5 w-5 text-blue-600 rounded" />
                </label>
                
                <label class="flex items-center justify-between cursor-pointer">
                  <span class="text-sm text-gray-700">Approbations</span>
                  <input type="checkbox" checked class="form-checkbox h-5 w-5 text-blue-600 rounded" />
                </label>
                
                <label class="flex items-center justify-between cursor-pointer">
                  <span class="text-sm text-gray-700">Rappels d'échéance</span>
                  <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600 rounded" />
                </label>
              </div>
            </div>

            {/* Statistiques */}
            <div class="card">
              <h3 class="font-bold text-gray-900 mb-4">Statistiques</h3>
              
              <div class="space-y-3">
                <div class="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span class="text-sm text-gray-600">Documents validés</span>
                  <span class="font-bold text-green-600">24</span>
                </div>
                <div class="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span class="text-sm text-gray-600">En attente</span>
                  <span class="font-bold text-yellow-600">2</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Temps moyen</span>
                  <span class="font-bold text-gray-900">1.2j</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          function openValidationModal(docId) {
            Utils.showNotification('Ouverture de la vue détaillée...', 'info');
          }

          function approveDocument(docId) {
            Utils.showNotification('Document approuvé avec succès', 'success');
          }

          function openCommentModal(docId) {
            Utils.showNotification('Ouvrir la fenêtre de commentaire', 'info');
          }

          function viewDocument(docId) {
            Utils.showNotification('Ouverture du document...', 'info');
          }
        `
      }} />
    </Layout>
  )
}
