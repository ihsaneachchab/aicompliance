import { Layout } from '../components/layout'

export function GenerationPage() {
  return (
    <Layout currentPage="generation">
      <div class="space-y-6">
        {/* Page header */}
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Génération de Documents</h1>
          <p class="text-gray-600">Créez automatiquement des documents conformes aux normes ISO 9001</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Generation parameters */}
          <div class="lg:col-span-2 space-y-6">
            {/* Template selection */}
            <div class="card">
              <h2 class="text-xl font-bold text-gray-900 mb-4">1. Choisissez un type de document</h2>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  onclick="selectDocumentType('Procédure')"
                  class="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all group doc-type-card"
                  data-type="Procédure"
                >
                  <div class="w-12 h-12 bg-blue-100 group-hover:bg-blue-500 rounded-xl flex items-center justify-center mb-4 transition-colors">
                    <i class="fas fa-list-ol text-blue-600 group-hover:text-white text-xl transition-colors"></i>
                  </div>
                  <h3 class="font-semibold text-gray-900 mb-2">Procédure</h3>
                  <p class="text-sm text-gray-600">Document détaillant un processus</p>
                </div>

                <div 
                  onclick="selectDocumentType('Formulaire')"
                  class="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all group doc-type-card"
                  data-type="Formulaire"
                >
                  <div class="w-12 h-12 bg-purple-100 group-hover:bg-purple-500 rounded-xl flex items-center justify-center mb-4 transition-colors">
                    <i class="fas fa-file-alt text-purple-600 group-hover:text-white text-xl transition-colors"></i>
                  </div>
                  <h3 class="font-semibold text-gray-900 mb-2">Formulaire</h3>
                  <p class="text-sm text-gray-600">Document pour enregistrer des données</p>
                </div>

                <div 
                  onclick="selectDocumentType('Rapport')"
                  class="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all group doc-type-card"
                  data-type="Rapport"
                >
                  <div class="w-12 h-12 bg-green-100 group-hover:bg-green-500 rounded-xl flex items-center justify-center mb-4 transition-colors">
                    <i class="fas fa-chart-bar text-green-600 group-hover:text-white text-xl transition-colors"></i>
                  </div>
                  <h3 class="font-semibold text-gray-900 mb-2">Rapport</h3>
                  <p class="text-sm text-gray-600">Document de synthèse et analyse</p>
                </div>
              </div>
            </div>

            {/* Generation form */}
            <div class="card" id="generationForm">
              <h2 class="text-xl font-bold text-gray-900 mb-4">2. Paramètres de génération</h2>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Type de document sélectionné
                  </label>
                  <input 
                    type="text" 
                    id="selectedDocType" 
                    class="input-field bg-gray-50" 
                    readonly
                    placeholder="Sélectionnez un type ci-dessus"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Processus ISO
                  </label>
                  <select id="processSelect" class="input-field">
                    <option value="">Sélectionnez un processus</option>
                    <option value="4.4 - Système de management">§ 4.4 - Système de management</option>
                    <option value="5.2 - Politique qualité">§ 5.2 - Politique qualité</option>
                    <option value="7.5 - Informations documentées">§ 7.5 - Informations documentées</option>
                    <option value="8.3 - Conception et développement">§ 8.3 - Conception et développement</option>
                    <option value="8.4 - Maîtrise des processus externalisés">§ 8.4 - Maîtrise des processus externalisés</option>
                    <option value="8.5 - Production et prestation de service">§ 8.5 - Production et prestation de service</option>
                    <option value="8.5.1 - Maintenance préventive">§ 8.5.1 - Maintenance préventive</option>
                    <option value="9.2 - Audit interne">§ 9.2 - Audit interne</option>
                    <option value="10.2 - Non-conformité et actions correctives">§ 10.2 - Non-conformité et actions correctives</option>
                  </select>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Secteur d'activité
                    </label>
                    <select id="sector" class="input-field">
                      <option value="">Sélectionnez</option>
                      <option value="Industrie manufacturière">Industrie manufacturière</option>
                      <option value="Industrie alimentaire">Industrie alimentaire</option>
                      <option value="Services">Services</option>
                      <option value="Construction">Construction</option>
                      <option value="Logistique">Logistique</option>
                      <option value="Santé">Santé</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Taille entreprise
                    </label>
                    <select id="companySize" class="input-field">
                      <option value="">Sélectionnez</option>
                      <option value="TPE (moins de 10 employés)">TPE (moins de 10 employés)</option>
                      <option value="PME (10-250 employés)">PME (10-250 employés)</option>
                      <option value="ETI (250-5000 employés)">ETI (250-5000 employés)</option>
                      <option value="Grande entreprise (plus de 5000)">Grande entreprise (plus de 5000)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Contexte et spécificités (optionnel)
                  </label>
                  <textarea 
                    id="context" 
                    rows="3"
                    class="input-field resize-none"
                    placeholder="Ex: Machines-outils, maintenance planifiée mensuelle, équipe de 5 personnes..."
                  ></textarea>
                </div>

                <button 
                  onclick="generateDocument()" 
                  class="w-full btn btn-primary py-3 text-base font-semibold"
                  id="generateButton"
                >
                  <i class="fas fa-magic mr-2"></i>
                  Générer le document
                </button>
              </div>
            </div>

            {/* Preview and editor */}
            <div id="documentPreview" class="hidden card">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold text-gray-900">Aperçu du document</h2>
                <div class="flex gap-2">
                  <button onclick="regenerateDocument()" class="btn bg-gray-500 hover:bg-gray-600 text-white text-sm">
                    <i class="fas fa-sync mr-2"></i>
                    Régénérer
                  </button>
                </div>
              </div>

              <div class="bg-white border-2 border-gray-200 rounded-lg p-8 mb-4" id="documentContent">
                {/* Document content will be loaded here */}
              </div>

              <div class="flex gap-3">
                <button onclick="exportWord()" class="flex-1 btn btn-primary">
                  <i class="fas fa-file-word mr-2"></i>
                  Exporter Word
                </button>
                <button onclick="exportPDF()" class="flex-1 btn btn-secondary">
                  <i class="fas fa-file-pdf mr-2"></i>
                  Exporter PDF
                </button>
                <button onclick="saveDocument()" class="flex-1 btn bg-purple-600 hover:bg-purple-700 text-white">
                  <i class="fas fa-save mr-2"></i>
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div class="space-y-6">
            {/* Progress */}
            <div class="card">
              <h3 class="font-bold text-gray-900 mb-4">Progression</h3>
              <div class="space-y-4">
                <div class="flex items-center space-x-3" id="step1">
                  <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span class="text-sm font-bold text-gray-600">1</span>
                  </div>
                  <span class="text-sm text-gray-600">Type de document</span>
                </div>
                <div class="flex items-center space-x-3" id="step2">
                  <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span class="text-sm font-bold text-gray-600">2</span>
                  </div>
                  <span class="text-sm text-gray-600">Paramètres</span>
                </div>
                <div class="flex items-center space-x-3" id="step3">
                  <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span class="text-sm font-bold text-gray-600">3</span>
                  </div>
                  <span class="text-sm text-gray-600">Génération</span>
                </div>
              </div>
            </div>

            {/* Templates library */}
            <div class="card">
              <h3 class="font-bold text-gray-900 mb-4">
                <i class="fas fa-book text-blue-600 mr-2"></i>
                Bibliothèque de templates
              </h3>
              <div class="space-y-2">
                <div class="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                  <div class="text-sm font-medium text-gray-900">Procédure d'achat</div>
                  <div class="text-xs text-gray-500">§ 8.4 - Dernière utilisation: Hier</div>
                </div>
                <div class="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                  <div class="text-sm font-medium text-gray-900">Formulaire d'audit</div>
                  <div class="text-xs text-gray-500">§ 9.2 - Dernière utilisation: Il y a 3j</div>
                </div>
                <div class="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                  <div class="text-sm font-medium text-gray-900">Rapport de NC</div>
                  <div class="text-xs text-gray-500">§ 10.2 - Dernière utilisation: Il y a 1 sem</div>
                </div>
              </div>
              <button class="w-full mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium">
                Voir tous les templates
              </button>
            </div>

            {/* Statistics */}
            <div class="card">
              <h3 class="font-bold text-gray-900 mb-4">Statistiques</h3>
              <div class="space-y-3">
                <div class="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span class="text-sm text-gray-600">Documents générés</span>
                  <span class="font-bold text-gray-900">12</span>
                </div>
                <div class="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span class="text-sm text-gray-600">Ce mois</span>
                  <span class="font-bold text-green-600">+3</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Temps moyen</span>
                  <span class="font-bold text-gray-900">45s</span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div class="card bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200">
              <i class="fas fa-lightbulb text-yellow-600 text-2xl mb-2"></i>
              <h3 class="font-bold text-gray-900 mb-2">Conseil</h3>
              <p class="text-sm text-gray-700">
                Plus vous donnez de contexte, plus le document généré sera adapté à votre entreprise !
              </p>
            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          let selectedType = null;

          function selectDocumentType(type) {
            selectedType = type;
            
            // Update UI
            document.querySelectorAll('.doc-type-card').forEach(card => {
              card.classList.remove('border-blue-500', 'bg-blue-50');
            });
            
            const selectedCard = document.querySelector(\`[data-type="\${type}"]\`);
            selectedCard.classList.add('border-blue-500', 'bg-blue-50');
            
            document.getElementById('selectedDocType').value = type;
            
            // Update progress
            updateProgress(1);
            
            Utils.showNotification(\`Type "\${type}" sélectionné\`, 'success');
          }

          function updateProgress(step) {
            for (let i = 1; i <= 3; i++) {
              const stepEl = document.getElementById(\`step\${i}\`);
              const circle = stepEl.querySelector('.w-8');
              const text = stepEl.querySelector('span:last-child');
              
              if (i <= step) {
                circle.className = 'w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center';
                circle.innerHTML = '<i class="fas fa-check text-white text-xs"></i>';
                text.className = 'text-sm font-medium text-blue-600';
              } else {
                circle.className = 'w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center';
                circle.innerHTML = \`<span class="text-sm font-bold text-gray-600">\${i}</span>\`;
                text.className = 'text-sm text-gray-600';
              }
            }
          }

          async function generateDocument() {
            if (!selectedType) {
              Utils.showNotification('Veuillez sélectionner un type de document', 'warning');
              return;
            }

            const process = document.getElementById('processSelect').value;
            const sector = document.getElementById('sector').value;
            const companySize = document.getElementById('companySize').value;
            const context = document.getElementById('context').value;

            if (!process) {
              Utils.showNotification('Veuillez sélectionner un processus ISO', 'warning');
              return;
            }

            // Show loading
            const button = document.getElementById('generateButton');
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Génération en cours...';
            
            updateProgress(2);

            try {
              // Generate document
              const doc = await DocumentGeneration.generateDocument({
                documentType: selectedType,
                process: process,
                context: { sector, companySize, details: context }
              });

              // Display document
              displayDocument(doc);
              updateProgress(3);
              
              Utils.showNotification('Document généré avec succès !', 'success');
            } catch (error) {
              Utils.showNotification('Erreur lors de la génération', 'error');
            } finally {
              button.disabled = false;
              button.innerHTML = '<i class="fas fa-magic mr-2"></i>Générer le document';
            }
          }

          function displayDocument(doc) {
            document.getElementById('documentPreview').classList.remove('hidden');
            
            // Format content with HTML
            const formattedContent = doc.content
              .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-gray-900 mb-4">$1</h1>')
              .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-6 mb-3">$1</h2>')
              .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-gray-900 mt-4 mb-2">$1</h3>')
              .replace(/^#### (.+)$/gm, '<h4 class="text-lg font-semibold text-gray-900 mt-3 mb-2">$4</h4>')
              .replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>')
              .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
              .replace(/\\n\\n/g, '</p><p class="mb-3">')
              .replace(/\\n/g, '<br>');
            
            document.getElementById('documentContent').innerHTML = \`
              <div class="prose max-w-none">
                <p class="mb-3">\${formattedContent}</p>
              </div>
            \`;

            // Scroll to preview
            document.getElementById('documentPreview').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }

          async function regenerateDocument() {
            await generateDocument();
          }

          function exportWord() {
            Utils.showNotification('Export Word en cours...', 'info');
            setTimeout(() => {
              DocumentGeneration.exportDocument(AppState.generatedDocuments[0], 'word');
            }, 500);
          }

          function exportPDF() {
            Utils.showNotification('Export PDF en cours...', 'info');
            setTimeout(() => {
              DocumentGeneration.exportDocument(AppState.generatedDocuments[0], 'pdf');
            }, 500);
          }

          function saveDocument() {
            Utils.showNotification('Document sauvegardé dans la bibliothèque', 'success');
          }
        `
      }} />
    </Layout>
  )
}
