import { Layout } from '../components/layout'

export function AnalysePage() {
  return (
    <Layout currentPage="analyse">
      <div class="space-y-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Analyse de Documents</h1>
          <p class="text-gray-600">Uploadez et analysez vos documents pour vérifier leur conformité</p>
        </div>

        <div class="card">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Analyses Récentes</h2>
          <div id="recentAnalysesList" class="space-y-3 mb-6">
            <p class="text-gray-500 italic">Chargement des analyses...</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 space-y-6">
            <div class="card">
              <h2 class="text-xl font-bold text-gray-900 mb-4">1. Télécharger le document</h2>
              <div
                id="dropZone"
                class="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
                onclick="document.getElementById('fileInput').click()"
              >
                <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-cloud-upload-alt text-blue-600 text-3xl"></i>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Glissez-déposez votre document</h3>
                <p class="text-sm text-gray-600 mb-4">ou cliquez pour parcourir</p>
                <p class="text-xs text-gray-500">PDF, Word, Excel • Max 10 MB • Max 50 pages</p>
                <input type="file" id="fileInput" class="hidden" accept=".pdf,.doc,.docx,.xls,.xlsx" onchange="handleFileSelect(event)" />
              </div>

              <div id="selectedFileDisplay" class="hidden mt-4 p-4 bg-blue-50 rounded-lg">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <i id="fileIcon" class="fas fa-file-pdf text-white text-xl"></i>
                    </div>
                    <div>
                      <div id="fileName" class="font-medium text-gray-900">Nom du fichier</div>
                      <div id="fileSize" class="text-sm text-gray-600">Taille</div>
                    </div>
                  </div>
                  <button onclick="clearFile()" class="text-red-600 hover:text-red-700">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            <div class="card">
              <h2 class="text-xl font-bold text-gray-900 mb-4">2. Paramètres d'analyse</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Type de document</label>
                  <select id="documentType" class="input-field">
                    <option value="">Sélectionnez un type</option>
                    <option value="procedure">Procédure</option>
                    <option value="formulaire">Formulaire</option>
                    <option value="enregistrement">Enregistrement</option>
                    <option value="manuel">Manuel Qualité</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Processus ISO concerné</label>
                  <select id="processISO" class="input-field">
                    <option value="">Sélectionnez un processus</option>
                    <option value="4.4">§ 4.4 - Système de management</option>
                    <option value="5.2">§ 5.2 - Politique qualité</option>
                    <option value="7.5">§ 7.5 - Informations documentées</option>
                    <option value="8.4">§ 8.4 - Maîtrise des processus externalisés</option>
                    <option value="8.5">§ 8.5 - Production et prestation de service</option>
                    <option value="9.2">§ 9.2 - Audit interne</option>
                    <option value="10.2">§ 10.2 - Non-conformité et actions correctives</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Référence du document (optionnel)</label>
                  <input type="text" id="docReference" class="input-field" placeholder="Ex: PROC-ACH-001" />
                </div>
                <button id="analyzeButton" onclick="startAnalysis()" class="w-full btn btn-primary py-3 text-base font-semibold">
                  <i class="fas fa-search mr-2"></i>Lancer l'analyse
                </button>
              </div>
            </div>

            <div id="analysisResults" class="hidden card">
              <h2 class="text-xl font-bold text-gray-900 mb-6">Résultats de l'analyse</h2>
              <div class="flex items-center justify-between mb-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                <div>
                  <div class="text-sm font-medium text-gray-600 mb-2">Score de Conformité</div>
                  <div id="resultScoreLarge" class="text-5xl font-bold text-blue-600">0/100</div>
                  <div id="resultStatus" class="text-sm text-gray-600 mt-2">Status</div>
                </div>
                <div id="scoreCircle" class="score-circle">
                  <span id="resultScorePercent">0%</span>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-4 mb-6">
                <div class="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                  <div id="conformItems" class="text-2xl font-bold text-green-600">0</div>
                  <div class="text-sm font-medium text-gray-900">Conforme</div>
                </div>
                <div class="p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-center">
                  <div id="warningItems" class="text-2xl font-bold text-yellow-600">0</div>
                  <div class="text-sm font-medium text-gray-900">Attention</div>
                </div>
                <div class="p-4 bg-red-50 rounded-lg border border-red-200 text-center">
                  <div id="nonConformItems" class="text-2xl font-bold text-red-600">0</div>
                  <div class="text-sm font-medium text-gray-900">Non-conforme</div>
                </div>
              </div>
              <div class="space-y-3">
                <h3 class="font-bold text-gray-900 mb-4">Détail des résultats</h3>
                <div id="findingsContainer" class="space-y-3">
                  {/* Findings will be loaded here */}
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <div class="card bg-gradient-to-br from-blue-600 to-blue-700 text-white">
              <i class="fas fa-info-circle text-3xl mb-3"></i>
              <h3 class="font-bold mb-2">Comment ça marche ?</h3>
              <ol class="text-sm space-y-2 opacity-90">
                <li>1. Téléchargez votre document</li>
                <li>2. Sélectionnez le type et le processus</li>
                <li>3. Lancez l'analyse (1-3 minutes)</li>
                <li>4. Consultez les résultats détaillés</li>
              </ol>
            </div>
            <div class="card">
              <h3 class="font-bold text-gray-900 mb-4">Statistiques</h3>
              <div class="space-y-3">
                <div class="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span class="text-sm text-gray-600">Documents analysés</span>
                  <span class="font-bold text-gray-900">24</span>
                </div>
                <div class="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span class="text-sm text-gray-600">Score moyen</span>
                  <span class="font-bold text-blue-600">82%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          let selectedFile = null;
 
          async function loadHistory() {
            try {
              const response = await fetch('http://localhost:8000/api/conformity/history');
              const data = await response.json();
              displayHistory(data.history || []);
            } catch (error) {
              console.error('Erreur lors du chargement de l\\'historique:', error);
              document.getElementById('recentAnalysesList').innerHTML = '<p class="text-red-500">Erreur de chargement</p>';
            }
          }

          function displayHistory(history) {
            const container = document.getElementById('recentAnalysesList');
            if (history.length === 0) {
              container.innerHTML = '<p class="text-gray-500 italic">Aucune analyse récente.</p>';
              return;
            }

            container.innerHTML = history.map(item => {
              const color = item.score >= 80 ? 'green' : item.score >= 50 ? 'yellow' : 'red';
              const icon = item.score >= 80 ? 'fa-check-circle' : 'fa-exclamation-circle';
              const date = new Date(item.analysis_date).toLocaleDateString('fr-FR');
              
              return '<div class="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">' +
                '<div class="flex items-center space-x-4 flex-1">' +
                  '<i class="fas fa-file-alt text-blue-600 text-2xl"></i>' +
                  '<div class="flex-1">' +
                    '<div class="font-medium text-gray-900">' + item.document_name + '</div>' +
                    '<div class="text-sm text-gray-600">' +
                      '<i class="far fa-clock mr-1"></i>' + date + ' · ' +
                      '<i class="fas fa-list-check ml-2 mr-1"></i>' + item.non_conform_items + ' points à corriger' +
                    '</div>' +
                  '</div>' +
                '</div>' +
                '<div class="flex items-center space-x-4">' +
                  '<div class="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-bold text-lg">' + item.score + '%</div>' +
                  '<span class="px-3 py-1 bg-' + color + '-100 text-' + color + '-800 text-sm font-medium rounded-full">' +
                    '<i class="fas ' + icon + ' mr-1"></i>' + item.status +
                  '</span>' +
                  '<button onclick="deleteAnalysis(\\'' + item._id + '\\')" class="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Supprimer">' +
                    '<i class="fas fa-trash"></i>' +
                  '</button>' +
                '</div>' +
              '</div>';
            }).join('');
          }

          async function deleteAnalysis(id) {
            if (!confirm('Êtes-vous sûr de vouloir supprimer cette analyse ?')) return;
            
            try {
              const response = await fetch('http://localhost:8000/api/conformity/history/' + id, {
                method: 'DELETE'
              });
              
              if (response.ok) {
                Utils.showNotification('Analyse supprimée', 'success');
                loadHistory(); // Reload list
              } else {
                Utils.showNotification('Erreur lors de la suppression', 'error');
              }
            } catch (error) {
              console.error('Delete error:', error);
              Utils.showNotification('Erreur lors de la suppression', 'error');
            }
          }

          function handleFileSelect(event) {
            const file = event.target.files[0];
            if (file) {
              selectedFile = file;
              displaySelectedFile();
            }
          }

          function displaySelectedFile() {
            if (!selectedFile) return;

            document.getElementById('selectedFileDisplay').classList.remove('hidden');
            document.getElementById('fileName').textContent = selectedFile.name;
            document.getElementById('fileSize').textContent = formatFileSize(selectedFile.size);
            
            const icon = document.getElementById('fileIcon');
            icon.className = 'fas ' + getFileIcon(selectedFile.name) + ' text-white text-xl';
          }

          function clearFile() {
            selectedFile = null;
            document.getElementById('selectedFileDisplay').classList.add('hidden');
            document.getElementById('fileInput').value = '';
          }

          function formatFileSize(bytes) {
            if (bytes < 1024) return bytes + ' B';
            if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
            return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
          }

          function getFileIcon(fileName) {
            if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) return 'fa-file-word';
            if (fileName.endsWith('.xls') || fileName.endsWith('.xlsx')) return 'fa-file-excel';
            return 'fa-file-pdf';
          }

          async function startAnalysis() {
            if (!selectedFile) {
              Utils.showNotification('Veuillez sélectionner un document', 'warning');
              return;
            }

            const documentType = document.getElementById('documentType').value;
            const processISO = document.getElementById('processISO').value;
            const docReference = document.getElementById('docReference').value;

            if (!documentType || !processISO) {
              Utils.showNotification('Veuillez remplir tous les champs', 'warning');
              return;
            }

            const button = document.getElementById('analyzeButton');
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Analyse en cours...';

            try {
              const result = await ComplianceAnalysis.analyzeDocument(selectedFile, {
                documentType,
                processISO,
                docReference
              });

              displayResults(result);
              loadHistory();
              Utils.showNotification('Analyse terminée avec succès!', 'success');
            } catch (error) {
              Utils.showNotification('Erreur lors de l\\'analyse: ' + error.message, 'error');
            } finally {
              button.disabled = false;
              button.innerHTML = '<i class="fas fa-search mr-2"></i>Lancer l\\'analyse';
            }
          }

          function displayResults(result) {
            document.getElementById('analysisResults').classList.remove('hidden');
            document.getElementById('resultScoreLarge').textContent = result.score + '/100';
            document.getElementById('resultStatus').textContent = result.status;
            document.getElementById('resultScorePercent').textContent = result.score + '%';
            
            document.getElementById('conformItems').textContent = result.conform_items || 0;
            document.getElementById('warningItems').textContent = result.warning_items || 0;
            document.getElementById('nonConformItems').textContent = result.non_conform_items || 0;
            
            const circle = document.getElementById('scoreCircle');
            circle.className = 'score-circle ' + (result.score >= 90 ? 'score-excellent' : result.score >= 70 ? 'score-good' : result.score >= 50 ? 'score-warning' : 'score-danger');
            
            const container = document.getElementById('findingsContainer');
            container.innerHTML = '';
            
            if (result.findings && result.findings.length > 0) {
              result.findings.forEach(finding => {
                const findingEl = document.createElement('div');
                const severityClass = finding.severity === 'success' ? 'bg-green-50 border-green-200 text-green-900' : 
                                     finding.severity === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-900' : 
                                     'bg-red-50 border-red-200 text-red-900';
                const iconClass = finding.severity === 'success' ? 'fa-check-circle text-green-600' : 
                                 finding.severity === 'warning' ? 'fa-exclamation-circle text-yellow-600' : 
                                 'fa-times-circle text-red-600';
                
                findingEl.className = 'p-4 border rounded-lg ' + severityClass;
                findingEl.innerHTML = '<div class="flex items-start space-x-3">' +
                    '<i class="fas ' + iconClass + ' text-xl mt-1"></i>' +
                    '<div class="flex-1">' +
                      '<div class="font-medium mb-1">' + finding.title + '</div>' +
                      '<div class="text-sm opacity-90 mb-2">' + finding.description + '</div>' +
                      '<div class="text-xs opacity-75">' +
                        '<i class="fas fa-book mr-1"></i>' + finding.clause +
                      '</div>' +
                    '</div>' +
                  '</div>';
                container.appendChild(findingEl);
              });
            } else {
              container.innerHTML = '<p class="text-gray-500 italic">Aucun résultat détaillé disponible.</p>';
            }
            
            document.getElementById('analysisResults').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }

          const dropZone = document.getElementById('dropZone');
          dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('border-blue-500', 'bg-blue-50'); });
          dropZone.addEventListener('dragleave', () => { dropZone.classList.remove('border-blue-500', 'bg-blue-50'); });
          dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-blue-500', 'bg-blue-50');
            const file = e.dataTransfer.files[0];
            if (file) { selectedFile = file; displaySelectedFile(); }
          });

          document.addEventListener('DOMContentLoaded', loadHistory);
        `
      }} />
    </Layout>
  )
}


