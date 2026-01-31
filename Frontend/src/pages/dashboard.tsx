import { Layout } from '../components/layout'

export function DashboardPage() {
  return (
    <Layout currentPage="dashboard">
      <div class="space-y-6">
        {/* Welcome header */}
        <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold mb-2">Bienvenue sur IA Conformité ! 👋</h1>
              <p class="text-blue-100">Gérez votre conformité ISO 9001 avec l'intelligence artificielle</p>
            </div>
            <div class="hidden md:block">
              <div class="text-right">
                <div class="text-sm text-blue-200">Dernière connexion</div>
                <div class="text-lg font-semibold" id="lastLogin">Aujourd'hui</div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Score de conformité */}
          <div class="card shadow-card-hover cursor-pointer hover:scale-105 transition-transform">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="text-sm font-medium text-gray-600 mb-1">Score Conformité</div>
                <div class="text-3xl font-bold text-blue-600 mb-2" id="avgScore">--%</div>
                <div class="flex items-center text-sm text-green-600">
                  <i class="fas fa-arrow-up mr-1" id="scoreTrendIcon"></i>
                  <span id="scoreTrendText">En attente</span>
                </div>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <i class="fas fa-chart-line text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>

          {/* Documents analysés */}
          <div class="card shadow-card-hover cursor-pointer hover:scale-105 transition-transform">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="text-sm font-medium text-gray-600 mb-1">Documents Analysés</div>
                <div class="text-3xl font-bold text-purple-600 mb-2" id="totalAnalyses">--</div>
                <div class="flex items-center text-sm text-gray-600">
                  <i class="fas fa-calendar mr-1"></i>
                  <span>Total</span>
                </div>
              </div>
              <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <i class="fas fa-file-alt text-purple-600 text-xl"></i>
              </div>
            </div>
          </div>

          {/* NC ouvertes */}
          <div class="card shadow-card-hover cursor-pointer hover:scale-105 transition-transform">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="text-sm font-medium text-gray-600 mb-1">NC Ouvertes</div>
                <div class="text-3xl font-bold text-red-600 mb-2" id="totalNCs">--</div>
                <div class="flex items-center text-sm text-red-600">
                  <i class="fas fa-exclamation-circle mr-1"></i>
                  <span>À traiter</span>
                </div>
              </div>
              <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <i class="fas fa-exclamation-triangle text-red-600 text-xl"></i>
              </div>
            </div>
          </div>

          {/* Documents générés */}
          <div class="card shadow-card-hover cursor-pointer hover:scale-105 transition-transform">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="text-sm font-medium text-gray-600 mb-1">Dernier score</div>
                <div class="text-3xl font-bold text-green-600 mb-2" id="lastScore">--%</div>
                <div class="flex items-center text-sm text-green-600">
                  <i class="fas fa-history mr-1"></i>
                  <span>Dernière analyse</span>
                </div>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <i class="fas fa-check-circle text-green-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div class="card">
          <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <i class="fas fa-bolt text-yellow-500 mr-2"></i>
            Accès Rapide
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/chat" class="group">
              <div class="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
                <div class="w-12 h-12 bg-blue-100 group-hover:bg-blue-500 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <i class="fas fa-comments text-blue-600 group-hover:text-white text-xl transition-colors"></i>
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">Chat Bot ISO</h3>
                <p class="text-sm text-gray-600">Posez vos questions sur les normes</p>
              </div>
            </a>

            <a href="/analyse" class="group">
              <div class="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all cursor-pointer">
                <div class="w-12 h-12 bg-purple-100 group-hover:bg-purple-500 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <i class="fas fa-search text-purple-600 group-hover:text-white text-xl transition-colors"></i>
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">Analyser un Document</h3>
                <p class="text-sm text-gray-600">Vérifiez la conformité automatiquement</p>
              </div>
            </a>

            <a href="/generation" class="group">
              <div class="p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer">
                <div class="w-12 h-12 bg-green-100 group-hover:bg-green-500 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <i class="fas fa-file-alt text-green-600 group-hover:text-white text-xl transition-colors"></i>
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">Générer un Document</h3>
                <p class="text-sm text-gray-600">Créez des procédures conformes</p>
              </div>
            </a>
          </div>
        </div>

        {/* Graphique Évolution de la Conformité Globale */}
        <div class="card">
          <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <i class="fas fa-chart-line text-blue-500 mr-2"></i>
            Évolution de la Conformité Globale
          </h2>

          <div class="relative h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
            {/* Axe Y */}
            <div class="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 py-6">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            {/* Graphique SVG */}
            <svg class="w-full h-full pl-8" viewBox="0 0 600 200" preserveAspectRatio="none">
              {/* Grille horizontale */}
              <line x1="0" y1="0" x2="600" y2="0" stroke="#e5e7eb" stroke-width="1" />
              <line x1="0" y1="50" x2="600" y2="50" stroke="#e5e7eb" stroke-width="1" />
              <line x1="0" y1="100" x2="600" y2="100" stroke="#e5e7eb" stroke-width="1" />
              <line x1="0" y1="150" x2="600" y2="150" stroke="#e5e7eb" stroke-width="1" />
              <line x1="0" y1="200" x2="600" y2="200" stroke="#e5e7eb" stroke-width="1" />

              {/* Zone sous la courbe (gradient) */}
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:0.3" />
                  <stop offset="100%" style="stop-color:#3B82F6;stop-opacity:0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 80 L 100 65 L 200 55 L 300 45 L 400 35 L 500 28 L 600 22 L 600 200 L 0 200 Z"
                fill="url(#areaGradient)"
              />

              {/* Ligne de tendance */}
              <path
                d="M 0 80 L 100 65 L 200 55 L 300 45 L 400 35 L 500 28 L 600 22"
                fill="none"
                stroke="#3B82F6"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              {/* Points sur la courbe */}
              <circle cx="0" cy="80" r="4" fill="#3B82F6" />
              <circle cx="100" cy="65" r="4" fill="#3B82F6" />
              <circle cx="200" cy="55" r="4" fill="#3B82F6" />
              <circle cx="300" cy="45" r="4" fill="#3B82F6" />
              <circle cx="400" cy="35" r="4" fill="#3B82F6" />
              <circle cx="500" cy="28" r="4" fill="#3B82F6" />
              <circle cx="600" cy="22" r="5" fill="#10B981" stroke="#fff" stroke-width="2" />
            </svg>

            {/* Labels des mois (axe X) */}
            <div class="absolute bottom-0 left-0 right-0 flex justify-around text-xs text-gray-500 pb-2 pl-8">
              <span>Jan</span>
              <span>Fév</span>
              <span>Mar</span>
              <span>Avr</span>
              <span>Mai</span>
              <span>Juin</span>
            </div>
          </div>

          {/* Stats sous le graphique */}
          <div class="grid grid-cols-3 gap-4 mt-6">
            <div class="text-center p-4 bg-blue-50 rounded-lg">
              <div class="text-2xl font-bold text-blue-600">+18%</div>
              <div class="text-xs text-gray-600 mt-1">vs mois dernier</div>
            </div>
            <div class="text-center p-4 bg-green-50 rounded-lg">
              <div class="text-2xl font-bold text-green-600">82%</div>
              <div class="text-xs text-gray-600 mt-1">Taux de Conformité Moyen</div>
            </div>
            <div class="text-center p-4 bg-purple-50 rounded-lg">
              <div class="text-2xl font-bold text-purple-600">2.3s</div>
              <div class="text-xs text-gray-600 mt-1">Temps d'Analyse Moyen</div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div class="card">
            <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center justify-between">
              <span>
                <i class="fas fa-clock text-blue-500 mr-2"></i>
                Activité Récente
              </span>
              <a href="#" class="text-sm text-blue-600 hover:text-blue-700">Voir tout</a>
            </h2>

            <div id="recentActivityList" class="space-y-4">
              <p class="text-gray-500 italic">Chargement des activités...</p>
            </div>
          </div>

          {/* Compliance Overview */}
          <div class="card">
            <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <i class="fas fa-chart-pie text-purple-500 mr-2"></i>
              Vue d'ensemble Conformité
            </h2>

            <div class="flex items-center justify-center mb-6">
              <div class="score-circle score-good">
                <span>78%</span>
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div class="flex items-center space-x-3">
                  <i class="fas fa-check-circle text-green-600"></i>
                  <span class="text-sm font-medium text-gray-900">Conforme</span>
                </div>
                <span class="text-sm font-bold text-green-600">12 points</span>
              </div>

              <div class="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div class="flex items-center space-x-3">
                  <i class="fas fa-exclamation-circle text-yellow-600"></i>
                  <span class="text-sm font-medium text-gray-900">Attention</span>
                </div>
                <span class="text-sm font-bold text-yellow-600">3 points</span>
              </div>

              <div class="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div class="flex items-center space-x-3">
                  <i class="fas fa-times-circle text-red-600"></i>
                  <span class="text-sm font-medium text-gray-900">Non-conforme</span>
                </div>
                <span class="text-sm font-bold text-red-600">2 points</span>
              </div>
            </div>

            <div class="mt-6 pt-6 border-t border-gray-200">
              <a href="/non-conformites" class="btn btn-primary w-full">
                <i class="fas fa-tasks mr-2"></i>
                Voir les actions à mener
              </a>
            </div>
          </div>
        </div>

        {/* ISO Processes Status */}
        <div class="card">
          <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <i class="fas fa-sitemap text-indigo-500 mr-2"></i>
            État des Processus ISO 9001
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-900">§ 4.4 SMQ</span>
                <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">95%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full" style="width: 95%"></div>
              </div>
              <p class="text-xs text-gray-500 mt-2">Système de management</p>
            </div>

            <div class="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-900">§ 8.4 Achats</span>
                <span class="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">72%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-yellow-500 h-2 rounded-full" style="width: 72%"></div>
              </div>
              <p class="text-xs text-gray-500 mt-2">Processus externalisés</p>
            </div>

            <div class="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-900">§ 8.5 Production</span>
                <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">88%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full" style="width: 88%"></div>
              </div>
              <p class="text-xs text-gray-500 mt-2">Production et services</p>
            </div>

            <div class="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-900">§ 7.5 Documents</span>
                <span class="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">65%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-red-500 h-2 rounded-full" style="width: 65%"></div>
              </div>
              <p class="text-xs text-gray-500 mt-2">Informations documentées</p>
            </div>

            <div class="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-900">§ 10.2 NC</span>
                <span class="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">78%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-yellow-500 h-2 rounded-full" style="width: 78%"></div>
              </div>
              <p class="text-xs text-gray-500 mt-2">Actions correctives</p>
            </div>

            <div class="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-900">§ 9.2 Audit</span>
                <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">92%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full" style="width: 92%"></div>
              </div>
              <p class="text-xs text-gray-500 mt-2">Audit interne</p>
            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          const now = new Date();
          const lastLoginEl = document.getElementById('lastLogin');
          if (lastLoginEl) {
            lastLoginEl.textContent = now.toLocaleTimeString('fr-FR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            });
          }

          async function loadDashboardData() {
            try {
              const statsRes = await fetch('http://localhost:8000/api/conformity/stats');
              const stats = await statsRes.json();
              
              if (document.getElementById('avgScore')) document.getElementById('avgScore').textContent = stats.average_score + '%';
              if (document.getElementById('totalAnalyses')) document.getElementById('totalAnalyses').textContent = stats.total_analyses;
              if (document.getElementById('scoreTrendText')) document.getElementById('scoreTrendText').textContent = stats.this_week + ' analyses cette semaine';

              const historyRes = await fetch('http://localhost:8000/api/conformity/history');
              const historyData = await historyRes.json();
              const history = historyData.history || [];

              if (history.length > 0 && document.getElementById('lastScore')) {
                document.getElementById('lastScore').textContent = history[0].score + '%';
              }

              displayActivity(history);

              const ncRes = await fetch('http://localhost:8000/api/conformity/non-conformities');
              const ncData = await ncRes.json();
              if (document.getElementById('totalNCs')) document.getElementById('totalNCs').textContent = ncData.non_conformities.length;
            } catch (error) {
              console.error('Error loading dashboard data:', error);
            }
          }

          function displayActivity(history) {
            const container = document.getElementById('recentActivityList');
            if (!container) return;
            if (history.length === 0) {
              container.innerHTML = '<p class="text-gray-500 italic">Aucune activité récente.</p>';
              return;
            }

            container.innerHTML = history.slice(0, 5).map(item => {
              const color = item.score >= 80 ? 'green' : 'yellow';
              const date = new Date(item.analysis_date).toLocaleDateString('fr-FR', {hour: '2-digit', minute:'2-digit'});
              
              return '<div class="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">' +
                '<div class="w-10 h-10 bg-' + color + '-100 rounded-full flex items-center justify-center flex-shrink-0">' +
                  '<i class="fas fa-check text-' + color + '-600"></i>' +
                '</div>' +
                '<div class="flex-1">' +
                  '<p class="text-sm font-medium text-gray-900">Analyse de ' + item.document_name + '</p>' +
                  '<p class="text-xs text-gray-500">Score : ' + item.score + '/100 - ' + item.status + '</p>' +
                  '<p class="text-xs text-gray-400 mt-1">' + date + '</p>' +
                '</div>' +
              '</div>';
            }).join('');
          }

          document.addEventListener('DOMContentLoaded', loadDashboardData);
        `
      }} />
    </Layout>
  )
}
