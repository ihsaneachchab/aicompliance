import { Layout } from '../layouts/layout'

export function AnalysePage() {
  return (
    <Layout currentPage="analyse">
      <div class="space-y-6">
        {/* Page header */}
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Analyse de Documents</h1>
          <p class="text-gray-600">Uploadez et analysez vos documents pour vérifier leur conformité</p>
        </div>

        {/* Analyses Récentes Section */}
        <div class="card">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Analyses Récentes</h2>

          <div class="space-y-3 mb-6">
            {/* Recent Analysis 1 */}
            <div class="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div class="flex items-center space-x-4 flex-1">
                <i class="fas fa-file-alt text-blue-600 text-2xl"></i>
                <div class="flex-1">
                  <div class="font-medium text-gray-900">Manuel Qualité v3.2</div>
                  <div class="text-sm text-gray-600">
                    <i class="far fa-clock mr-1"></i>
                    14/01/2025 ·
                    <i class="fas fa-list-check ml-2 mr-1"></i>
                    2 points à corriger
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div class="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-bold text-lg">
                  92%
                </div>
                <span class="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  <i class="fas fa-check-circle mr-1"></i>
                  Conforme
                </span>
                <button class="btn btn-secondary text-sm px-4 py-2">
                  Voir Détails
                </button>
                <button class="text-gray-400 hover:text-blue-600">
                  <i class="fas fa-download"></i>
                </button>
              </div>
            </div>

            {/* Recent Analysis 2 */}
            <div class="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div class="flex items-center space-x-4 flex-1">
                <i class="fas fa-file-alt text-blue-600 text-2xl"></i>
                <div class="flex-1">
                  <div class="font-medium text-gray-900">Procédure Achats</div>
                  <div class="text-sm text-gray-600">
                    <i class="far fa-clock mr-1"></i>
                    14/01/2025 ·
                    <i class="fas fa-list-check ml-2 mr-1"></i>
                    8 points à corriger
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div class="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-bold text-lg">
                  75%
                </div>
                <span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                  <i class="fas fa-exclamation-triangle mr-1"></i>
                  Attention
                </span>
                <button class="btn btn-secondary text-sm px-4 py-2">
                  Voir Détails
                </button>
                <button class="text-gray-400 hover:text-blue-600">
                  <i class="fas fa-download"></i>
                </button>
              </div>
            </div>

            {/* Recent Analysis 3 */}
            <div class="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div class="flex items-center space-x-4 flex-1">
                <i class="fas fa-file-alt text-blue-600 text-2xl"></i>
                <div class="flex-1">
                  <div class="font-medium text-gray-900">Fiche de Poste Directeur</div>
                  <div class="text-sm text-gray-600">
                    <i class="far fa-clock mr-1"></i>
                    13/01/2025 ·
                    <i class="fas fa-list-check ml-2 mr-1"></i>
                    15 points à corriger
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div class="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold text-lg">
                  58%
                </div>
                <span class="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                  <i class="fas fa-times-circle mr-1"></i>
                  Non conforme
                </span>
                <button class="btn btn-secondary text-sm px-4 py-2">
                  Voir Détails
                </button>
                <button class="text-gray-400 hover:text-blue-600">
                  <i class="fas fa-download"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Statistics Summary */}
          <div class="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900 mb-1">247</div>
              <div class="text-sm text-gray-600">Documents Analysés</div>
              <div class="text-xs text-green-600 mt-1">
                <i class="fas fa-arrow-up mr-1"></i>
                +15 cette semaine
              </div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-600 mb-1">82%</div>
              <div class="text-sm text-gray-600">Taux de Conformité Moyen</div>
              <div class="text-xs text-green-600 mt-1">
                <i class="fas fa-arrow-up mr-1"></i>
                +2% vs mois dernier
              </div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900 mb-1">2.3s</div>
              <div class="text-sm text-gray-600">Temps d'Analyse Moyen</div>
              <div class="text-xs text-gray-600 mt-1">
                Par document
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload and parameters */}
          <div class="lg:col-span-2 space-y-6">
            {/* Upload area */}
            <div class="card">
              <h2 class="text-xl font-bold text-gray-900 mb-4">1. Télécharger le document</h2>

              <div
                id="dropZone"
                class="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
                ondragover="event.preventDefault(); event.currentTarget.classList.add('border-blue-500', 'bg-blue-50')"
                ondragleave="event.currentTarget.classList.remove('border-blue-500', 'bg-blue-50')"
                ondrop="handleDrop(event)"
                onclick="document.getElementById('fileInput').click()"
              >
                <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-cloud-upload-alt text-blue-600 text-3xl"></i>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Glissez-déposez votre document</h3>
                <p class="text-sm text-gray-600 mb-4">ou cliquez pour parcourir</p>
                <p class="text-xs text-gray-500">PDF, Word, Excel • Max 10 MB • Max 50 pages</p>

                <input
                  type="file"
                  id="fileInput"
                  class="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  onchange="handleFileSelect(event)"
                />
              </div>

              <div id="selectedFile" class="hidden mt-4 p-4 bg-blue-50 rounded-lg">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <i class="fas fa-file-pdf text-white text-xl"></i>
                    </div>
                    <div>
                      <div class="font-medium text-gray-900" id="fileName"></div>
                      <div class="text-sm text-gray-600" id="fileSize"></div>
                    </div>
                  </div>
                  <button onclick="clearFile()" class="text-red-600 hover:text-red-700">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Analysis parameters */}
            <div class="card">
              <h2 class="text-xl font-bold text-gray-900 mb-4">2. Paramètres d'analyse</h2>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Type de document
                  </label>
                  <select id="documentType" class="input-field">
                    <option value="">Sélectionnez un type</option>
                    <option value="procedure">Procédure</option>
                    <option value="formulaire">Formulaire</option>
                    <option value="enregistrement">Enregistrement</option>
                    <option value="manuel">Manuel Qualité</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Processus ISO concerné
                  </label>
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
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Référence du document (optionnel)
                  </label>
                  <input
                    type="text"
                    id="docReference"
                    class="input-field"
                    placeholder="Ex: PROC-ACH-001"
                  />
                </div>

                <button
                  onclick="startAnalysis()"
                  class="w-full btn btn-primary py-3 text-base font-semibold"
                  id="analyzeButton"
                >
                  <i class="fas fa-search mr-2"></i>
                  Lancer l'analyse
                </button>
              </div>
            </div>

            {/* Analysis results */}
            <div id="analysisResults" class="hidden card">
              <h2 class="text-xl font-bold text-gray-900 mb-6">Résultats de l'analyse</h2>

              {/* Score */}
              <div class="flex items-center justify-between mb-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                <div>
                  <div class="text-sm font-medium text-gray-600 mb-2">Score de Conformité</div>
                  <div class="text-5xl font-bold text-blue-600" id="conformityScore">--</div>
                  <div class="text-sm text-gray-600 mt-2" id="conformityStatus">--</div>
                </div>
                <div class="score-circle score-good" id="scoreCircle">
                  <span id="scoreCircleText">--</span>
                </div>
              </div>

              {/* Breakdown */}
              <div class="grid grid-cols-3 gap-4 mb-6">
                <div class="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div class="flex items-center justify-between mb-2">
                    <i class="fas fa-check-circle text-green-600 text-xl"></i>
                    <span class="text-2xl font-bold text-green-600" id="conformCount">0</span>
                  </div>
                  <div class="text-sm font-medium text-gray-900">Conforme</div>
                </div>

                <div class="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div class="flex items-center justify-between mb-2">
                    <i class="fas fa-exclamation-circle text-yellow-600 text-xl"></i>
                    <span class="text-2xl font-bold text-yellow-600" id="warningCount">0</span>
                  </div>
                  <div class="text-sm font-medium text-gray-900">Attention</div>
                </div>

                <div class="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div class="flex items-center justify-between mb-2">
                    <i class="fas fa-times-circle text-red-600 text-xl"></i>
                    <span class="text-2xl font-bold text-red-600" id="ncCount">0</span>
                  </div>
                  <div class="text-sm font-medium text-gray-900">Non-conforme</div>
                </div>
              </div>

              {/* Findings */}
              <div>
                <h3 class="font-bold text-gray-900 mb-4">Détail des résultats</h3>
                <div class="space-y-3" id="findingsList">
                  {/* Findings will be loaded here */}
                </div>
              </div>

              {/* Actions */}
              <div class="flex gap-3 mt-6">
                <button onclick="downloadReport()" class="flex-1 btn btn-primary">
                  <i class="fas fa-download mr-2"></i>
                  Télécharger le rapport
                </button>
                <button onclick="exportPDF()" class="flex-1 btn btn-secondary">
                  <i class="fas fa-file-pdf mr-2"></i>
                  Exporter en PDF
                </button>
              </div>
            </div>
          </div>

          {/* Right sidebar - Info and tips */}
          <div class="space-y-6">
            {/* Info card */}
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

            {/* Tips */}
            <div class="card">
              <h3 class="font-bold text-gray-900 mb-4">
                <i class="fas fa-lightbulb text-yellow-500 mr-2"></i>
                Conseils
              </h3>
              <ul class="text-sm space-y-3 text-gray-600">
                <li class="flex items-start space-x-2">
                  <i class="fas fa-check text-green-600 mt-1"></i>
                  <span>Assurez-vous que le document est lisible</span>
                </li>
                <li class="flex items-start space-x-2">
                  <i class="fas fa-check text-green-600 mt-1"></i>
                  <span>Sélectionnez le bon type de document</span>
                </li>
                <li class="flex items-start space-x-2">
                  <i class="fas fa-check text-green-600 mt-1"></i>
                  <span>Les documents structurés sont mieux analysés</span>
                </li>
                <li class="flex items-start space-x-2">
                  <i class="fas fa-check text-green-600 mt-1"></i>
                  <span>Vous pouvez ré-analyser après correction</span>
                </li>
              </ul>
            </div>

            {/* Statistics */}
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
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Temps moyen</span>
                  <span class="font-bold text-gray-900">2m 15s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          let selectedFile = null;

          function handleFileSelect(event) {
            const file = event.target.files[0];
            if (file) {
              displaySelectedFile(file);
            }
          }

          function handleDrop(event) {
            event.preventDefault();
            event.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
            
            const file = event.dataTransfer.files[0];
            if (file) {
              displaySelectedFile(file);
            }
          }

          function displaySelectedFile(file) {
            selectedFile = file;
            
            document.getElementById('selectedFile').classList.remove('hidden');
            document.getElementById('fileName').textContent = file.name;
            document.getElementById('fileSize').textContent = formatFileSize(file.size);
            
            // Update icon based on file type
            const icon = document.querySelector('#selectedFile .fa-file-pdf');
            if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
              icon.className = 'fas fa-file-word text-white text-xl';
            } else if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
              icon.className = 'fas fa-file-excel text-white text-xl';
            }
          }

          function clearFile() {
            selectedFile = null;
            document.getElementById('selectedFile').classList.add('hidden');
            document.getElementById('fileInput').value = '';
          }

          function formatFileSize(bytes) {
            if (bytes < 1024) return bytes + ' B';
            if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
            return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
          }

          async function startAnalysis() {
            if (!selectedFile) {
              Utils.showNotification('Veuillez sélectionner un document', 'warning');
              return;
            }

            const documentType = document.getElementById('documentType').value;
            const processISO = document.getElementById('processISO').value;

            if (!documentType || !processISO) {
              Utils.showNotification('Veuillez remplir tous les champs', 'warning');
              return;
            }

            // Show loading
            const button = document.getElementById('analyzeButton');
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Analyse en cours...';

            try {
              // Simulate analysis
              const result = await ComplianceAnalysis.analyzeDocument(selectedFile, {
                documentType,
                processISO
              });

              // Display results
              displayResults(result);
              
              Utils.showNotification('Analyse terminée avec succès', 'success');
            } catch (error) {
              Utils.showNotification('Erreur lors de l\'analyse', 'error');
            } finally {
              button.disabled = false;
              button.innerHTML = '<i class="fas fa-search mr-2"></i>Lancer l\'analyse';
            }
          }

          function displayResults(result) {
            document.getElementById('analysisResults').classList.remove('hidden');
            
            // Score
            document.getElementById('conformityScore').textContent = result.score + '/100';
            document.getElementById('conformityStatus').textContent = result.status;
            document.getElementById('scoreCircleText').textContent = result.score + '%';
            
            // Update score circle color
            const circle = document.getElementById('scoreCircle');
            circle.className = 'score-circle ' + (
              result.score >= 90 ? 'score-excellent' :
              result.score >= 70 ? 'score-good' :
              result.score >= 50 ? 'score-warning' : 'score-danger'
            );

            // Counts
            document.getElementById('conformCount').textContent = result.conformItems;
            document.getElementById('warningCount').textContent = result.warningItems;
            document.getElementById('ncCount').textContent = result.nonConformItems;

            // Findings
            const findingsList = document.getElementById('findingsList');
            findingsList.innerHTML = result.findings.map(finding => {
              const colors = {
                success: 'bg-green-50 border-green-200 text-green-900',
                warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
                danger: 'bg-red-50 border-red-200 text-red-900'
              };

              const icons = {
                success: 'fa-check-circle text-green-600',
                warning: 'fa-exclamation-circle text-yellow-600',
                danger: 'fa-times-circle text-red-600'
              };

              return \`
                <div class="p-4 border rounded-lg \${colors[finding.severity]}">
                  <div class="flex items-start space-x-3">
                    <i class="fas \${icons[finding.severity]} text-xl mt-1"></i>
                    <div class="flex-1">
                      <div class="font-medium mb-1">\${finding.title}</div>
                      <div class="text-sm opacity-90 mb-2">\${finding.description}</div>
                      <div class="text-xs opacity-75">
                        <i class="fas fa-book mr-1"></i>
                        \${finding.clause}
                      </div>
                    </div>
                  </div>
                </div>
              \`;
            }).join('');

            // Scroll to results
            document.getElementById('analysisResults').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }

          function downloadReport() {
            ComplianceAnalysis.downloadReport(AppState.analysisResults);
          }

          function exportPDF() {
            Utils.showNotification('Export PDF en cours...', 'info');
            setTimeout(() => {
              Utils.showNotification('PDF exporté avec succès', 'success');
            }, 1000);
          }
        `
      }} />
    </Layout>
  )
}
