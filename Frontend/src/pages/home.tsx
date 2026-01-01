export function HomePage() {
  return (
    <>
      {/* Navigation Principale */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <i className="fas fa-shield-check text-white text-2xl"></i>
              </div>
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  IA Conformité
                </div>
                <div className="text-xs text-gray-500 font-medium">Solution intelligente ISO</div>
              </div>
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#fonctionnalites" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Fonctionnalités
              </a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Services
              </a>
              <a href="#tarification" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Tarification
              </a>
              <a href="#temoignages" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Témoignages
              </a>
            </div>

            {/* CTAs */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="/login"
                className="px-5 py-2.5 text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Se connecter
              </a>
              <a
                href="/service-selection"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Démarrer <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>

            {/* Menu Mobile */}
            <button className="md:hidden p-2 text-gray-700">
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Espaceur pour navigation fixe */}
      <div className="h-20"></div>

      {/* Hero Section - Modernisé et Professionnel */}
      <section className="relative min-h-[600px] bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden">
        {/* Formes décoratives */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contenu gauche */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-semibold text-blue-800">
                  Conformité ISO Automatisée
                </span>
              </div>

              {/* Titre principal */}
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900">Gérez votre conformité</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  avec l'Intelligence Artificielle
                </span>
              </h1>

              {/* Sous-titre */}
              <p className="text-xl text-gray-600 leading-relaxed">
                Plateforme intelligente d'analyse et de gestion de conformité pour 
                <strong className="text-gray-900"> ISO 9001, marchés publics</strong> et autres normes. 
                Automatisez vos processus qualité et gagnez en efficacité.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="/service-selection"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-lg font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <i className="fas fa-rocket mr-3"></i>
                  Commencer gratuitement
                </a>
                <a
                  href="#demo"
                  className="inline-flex items-center px-8 py-4 bg-white text-gray-700 text-lg font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                >
                  <i className="fas fa-play-circle mr-3"></i>
                  Voir la démo
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-gray-600">
                  <i className="fas fa-check-circle text-green-500"></i>
                  <span className="font-medium">14 jours d'essai gratuit</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <i className="fas fa-shield-alt text-blue-500"></i>
                  <span className="font-medium">Sécurisé et confidentiel</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <i className="fas fa-headset text-purple-500"></i>
                  <span className="font-medium">Support dédié 24/7</span>
                </div>
              </div>
            </div>

            {/* Visuel droit - Dashboard mockup */}
            <div className="relative lg:block hidden">
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-500">
                {/* Barre de fenêtre */}
                <div className="flex items-center space-x-2 mb-4 pb-4 border-b border-gray-200">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="ml-4 text-sm text-gray-500 font-medium">Dashboard Conformité</span>
                </div>

                {/* Contenu dashboard */}
                <div className="space-y-4">
                  {/* Jauge conformité */}
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                    <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                      87%
                    </div>
                    <div className="text-sm text-gray-600 font-medium mt-2">Score de Conformité Global</div>
                  </div>

                  {/* Statistiques */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">24</div>
                      <div className="text-xs text-gray-600 mt-1">Conformes</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">3</div>
                      <div className="text-xs text-gray-600 mt-1">Attention</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">2</div>
                      <div className="text-xs text-gray-600 mt-1">NC</div>
                    </div>
                  </div>

                  {/* Graphique simulé */}
                  <div className="h-32 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full flex items-end justify-around px-4 pb-4">
                      <div className="w-8 bg-blue-500 rounded-t" style={{height: '60%'}}></div>
                      <div className="w-8 bg-blue-500 rounded-t" style={{height: '75%'}}></div>
                      <div className="w-8 bg-cyan-500 rounded-t" style={{height: '85%'}}></div>
                      <div className="w-8 bg-cyan-500 rounded-t" style={{height: '90%'}}></div>
                      <div className="w-8 bg-green-500 rounded-t" style={{height: '95%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Élément flottant */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 animate-pulse">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-check text-green-600"></i>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Nouveau document</div>
                    <div className="text-sm font-semibold text-gray-900">Analysé avec succès</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Services - 4 types de conformité */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              NOS SERVICES
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Couverture complète de vos besoins en conformité
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choisissez le service adapté à votre secteur d'activité et bénéficiez d'un accompagnement personnalisé
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service ISO 9001 */}
            <div className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-200">
              {/* Image */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop" 
                  alt="ISO 9001" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
                    <i className="fas fa-certificate text-blue-600 text-2xl"></i>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">ISO 9001</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Management de la qualité : Analysez et gérez votre conformité aux exigences ISO 9001:2015
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start space-x-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>Toutes les clauses ISO 9001</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>Analyse automatique des processus</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>Génération de documentation</span>
                  </li>
                </ul>
                <a
                  href="/service-selection?service=iso9001"
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 group-hover:translate-x-2 transition-transform"
                >
                  En savoir plus <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>

            {/* Service Marchés Publics */}
            <div className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-200">
              {/* Image */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="https://plus.unsplash.com/premium_photo-1661767661932-0cb548f16e7d?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Marchés Publics" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
                    <i className="fas fa-landmark text-green-600 text-2xl"></i>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Marchés Publics</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Conformité réglementaire : Vérifiez vos dossiers d'appel d'offres et documents administratifs
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start space-x-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>Vérification des pièces obligatoires</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>Analyse de complétude</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>Aide à la rédaction</span>
                  </li>
                </ul>
                <a
                  href="/service-selection?service=marches"
                  className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 group-hover:translate-x-2 transition-transform"
                >
                  En savoir plus <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>

            {/* Service ISO 27001 */}
            <div className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-200">
              {/* Image */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop" 
                  alt="ISO 27001" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
                    <i className="fas fa-shield-alt text-purple-600 text-2xl"></i>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">ISO 27001</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Sécurité de l'information : Gérez votre système de management de la sécurité de l'information
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start space-x-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>Analyse des risques</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>Contrôles de sécurité</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>Documentation SMSI</span>
                  </li>
                </ul>
                <a
                  href="/service-selection?service=iso27001"
                  className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 group-hover:translate-x-2 transition-transform"
                >
                  En savoir plus <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>

            {/* Service HDS */}
            <div className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-200">
              {/* Image */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400&h=300&fit=crop" 
                  alt="HDS" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
                    <i className="fas fa-hospital text-orange-600 text-2xl"></i>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">HDS</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Hébergement de données de santé : Conformité aux exigences de certification HDS
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start space-x-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>Référentiel HDS complet</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span>Audit de conformité RGPD</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-gray-700">
                  <i className="fas fa-check-circle text-green-500 mt-1"></i>
                  <span>Préparation à la certification</span>
                </li>
                </ul>
                <a
                  href="/service-selection?service=hds"
                  className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 group-hover:translate-x-2 transition-transform"
                >
                  En savoir plus <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Fonctionnalités - 6 Features avec visuels */}
      <section id="fonctionnalites" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
              FONCTIONNALITÉS AVANCÉES
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Une plateforme complète pour gérer votre conformité
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils puissants et intuitifs pour automatiser vos processus qualité et optimiser votre conformité
            </p>
          </div>

          <div className="space-y-24">
            {/* Feature 1 - Assistant IA */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
                  <div className="flex items-center space-x-4 mb-4 pb-4 border-b border-gray-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                      <i className="fas fa-robot text-white text-2xl"></i>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Assistant Virtuel</div>
                      <div className="font-semibold text-gray-900">Chat en temps réel</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-700">
                        <strong>Question :</strong> Comment documenter un processus selon ISO 9001:2015 ?
                      </div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="text-sm text-gray-700">
                        <i className="fas fa-check-circle text-green-500 mr-2"></i>
                        <strong>Réponse :</strong> Selon la clause 7.5, vous devez inclure...
                        <div className="mt-2 text-xs text-blue-600">
                          <i className="fas fa-book mr-1"></i> Référence : ISO 9001:2015 - Clause 7.5
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                  <i className="fas fa-robot mr-2"></i> ASSISTANT IA
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Chat Bot Intelligent ISO 9001
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Posez vos questions en langage naturel et obtenez des réponses précises avec références aux clauses normatives. 
                  L'assistant mémorise le contexte de la conversation pour des réponses personnalisées.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700"><strong>Réponses instantanées</strong> avec références normatives</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700"><strong>Historique des conversations</strong> sauvegardé</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700"><strong>Mode pédagogique</strong> avec explications détaillées</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700"><strong>Suggestions intelligentes</strong> de questions</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 2 - Analyse de Documents */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                  <i className="fas fa-search mr-2"></i> ANALYSE AUTOMATIQUE
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Analyse de Conformité en 3 Minutes
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Déposez vos documents (PDF, Word, Excel) et obtenez un audit complet avec scoring de conformité, 
                  détection des non-conformités et recommandations d'amélioration.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700"><strong>Upload drag & drop</strong> multi-formats</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700"><strong>Scoring automatique</strong> sur 100 points</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700"><strong>Détection IA</strong> des écarts et NC</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700"><strong>Rapport PDF</strong> téléchargeable</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-4">
                      <div className="text-5xl font-bold text-white">87%</div>
                    </div>
                    <div className="text-sm text-gray-500 font-medium">Score de Conformité Global</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">24</div>
                      <div className="text-xs text-gray-600 mt-1">Conformes</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">3</div>
                      <div className="text-xs text-gray-600 mt-1">Attention</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">2</div>
                      <div className="text-xs text-gray-600 mt-1">Non-conformes</div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Clause 4.1</span>
                      <span className="text-green-600 font-semibold">✓ Conforme</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Clause 5.2</span>
                      <span className="text-orange-600 font-semibold">⚠ À surveiller</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Clause 8.5</span>
                      <span className="text-red-600 font-semibold">✗ Non-conforme</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 - Génération de Documents */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <div className="text-sm text-gray-500 mb-2">Type de document</div>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold">
                        Procédure
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">
                        Formulaire
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">
                        Rapport
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Processus ISO</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm">
                        <option>4.1 - Contexte de l'organisme</option>
                        <option>5.2 - Politique qualité</option>
                        <option>8.5 - Production</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Secteur d'activité</label>
                      <input type="text" placeholder="Ex: Industrie automobile" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
                    </div>
                  </div>
                  <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow">
                    <i className="fas fa-magic mr-2"></i> Générer le document
                  </button>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
                  <i className="fas fa-file-alt mr-2"></i> GÉNÉRATION IA
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Génération Automatique de Documents
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Créez des procédures, formulaires et rapports conformes aux normes ISO en quelques clics. 
                  Personnalisez selon votre contexte et exportez au format Word ou PDF.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700"><strong>Templates professionnels</strong> par processus ISO</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700"><strong>Personnalisation contextuelle</strong> secteur/taille</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700"><strong>Export Word & PDF</strong> immédiat</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700"><strong>Bibliothèque de templates</strong> réutilisables</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 4 - Gestion des NC */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-4">
                  <i className="fas fa-exclamation-triangle mr-2"></i> GESTION DES NC
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Suivi des Non-Conformités en Kanban
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Gérez vos non-conformités de la détection à la clôture avec un tableau Kanban intuitif. 
                  Assignez, suivez et documentez les actions correctives et préventives.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700"><strong>Vue Kanban</strong> intuitive et visuelle</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700"><strong>Plans d'action SMART</strong> structurés</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700"><strong>Assignation et notifications</strong> automatiques</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700"><strong>Timeline et historique</strong> complets</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
                  <div className="flex space-x-4 mb-4">
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-2 font-semibold uppercase">Ouvertes</div>
                      <div className="space-y-2">
                        <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                          <div className="text-sm font-semibold text-gray-900">NC-2024-003</div>
                          <div className="text-xs text-gray-600 mt-1">Clause 8.5.1</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-2 font-semibold uppercase">En cours</div>
                      <div className="space-y-2">
                        <div className="bg-orange-50 border-l-4 border-orange-500 p-3 rounded">
                          <div className="text-sm font-semibold text-gray-900">NC-2024-002</div>
                          <div className="text-xs text-gray-600 mt-1">Clause 7.1.5</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-2 font-semibold uppercase">Résolues</div>
                      <div className="space-y-2">
                        <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
                          <div className="text-sm font-semibold text-gray-900">NC-2024-001</div>
                          <div className="text-xs text-gray-600 mt-1">Clause 5.2</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Temps moyen de résolution</span>
                      <span className="font-bold text-gray-900">8 jours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 5 - Bibliothèque Documentaire */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Rechercher un document..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                      <i className="fas fa-folder text-blue-600"></i>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-900">Chapitre 4 - Contexte</div>
                        <div className="text-xs text-gray-500">12 documents</div>
                      </div>
                      <i className="fas fa-chevron-right text-gray-400"></i>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                      <i className="fas fa-folder text-green-600"></i>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-900">Chapitre 5 - Leadership</div>
                        <div className="text-xs text-gray-500">8 documents</div>
                      </div>
                      <i className="fas fa-chevron-right text-gray-400"></i>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                      <i className="fas fa-file-pdf text-red-600"></i>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-900">PROC-QUA-001.pdf</div>
                        <div className="text-xs text-gray-500">Version 3.2 • 15/12/2024</div>
                      </div>
                      <i className="fas fa-download text-gray-400"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-block px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold mb-4">
                  <i className="fas fa-book mr-2"></i> BIBLIOTHÈQUE
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Bibliothèque Documentaire Organisée
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Centralisez tous vos documents qualité dans une arborescence structurée par processus ISO. 
                  Recherchez, versionnez et gérez l'accès à vos documents.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700"><strong>Arborescence ISO</strong> par chapitres</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700"><strong>Versioning automatique</strong> des documents</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700"><strong>Recherche avancée</strong> multi-critères</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700"><strong>Gestion des droits</strong> d'accès</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 6 - Tableaux de Bord */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
                  <i className="fas fa-chart-line mr-2"></i> REPORTING
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Tableaux de Bord & Reporting Avancé
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Visualisez en temps réel l'état de votre conformité avec des graphiques interactifs et des KPIs personnalisables. 
                  Exportez vos rapports pour les audits et revues de direction.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700"><strong>KPIs personnalisables</strong> par processus</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700"><strong>Graphiques interactifs</strong> temps réel</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700"><strong>Export PDF/Excel</strong> automatisé</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700"><strong>Alertes configurables</strong> par seuils</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                      <div className="text-3xl font-bold text-blue-600">87%</div>
                      <div className="text-xs text-gray-600 mt-1">Conformité</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                      <div className="text-3xl font-bold text-green-600">24</div>
                      <div className="text-xs text-gray-600 mt-1">Docs analysés</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                      <div className="text-3xl font-bold text-orange-600">3</div>
                      <div className="text-xs text-gray-600 mt-1">NC ouvertes</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                      <div className="text-3xl font-bold text-purple-600">12</div>
                      <div className="text-xs text-gray-600 mt-1">Docs générés</div>
                    </div>
                  </div>
                  <div className="h-40 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full flex items-end justify-around px-6 pb-6">
                      <div className="w-12 bg-blue-500 rounded-t-lg shadow-lg" style={{height: '45%'}}></div>
                      <div className="w-12 bg-blue-600 rounded-t-lg shadow-lg" style={{height: '60%'}}></div>
                      <div className="w-12 bg-cyan-500 rounded-t-lg shadow-lg" style={{height: '75%'}}></div>
                      <div className="w-12 bg-cyan-600 rounded-t-lg shadow-lg" style={{height: '85%'}}></div>
                      <div className="w-12 bg-green-500 rounded-t-lg shadow-lg" style={{height: '95%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Statistiques avec fond coloré */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Des résultats mesurables pour votre organisation
            </h2>
            <p className="text-xl text-blue-100">
              Rejoignez des centaines d'entreprises qui nous font confiance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">500+</div>
              <div className="text-blue-100 text-lg">Entreprises accompagnées</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">24/7</div>
              <div className="text-blue-100 text-lg">Support disponible</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">10min</div>
              <div className="text-blue-100 text-lg">Temps d'analyse moyen</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">95%</div>
              <div className="text-blue-100 text-lg">Taux de satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section id="temoignages" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold mb-4">
              <i className="fas fa-star mr-2"></i> TÉMOIGNAGES
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-xl text-gray-600">
              Des retours d'expérience de professionnels qui utilisent IA Conformité au quotidien
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Témoignage 1 */}
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-1 mb-4">
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "IA Conformité a transformé notre approche de la qualité. Nous avons divisé par 3 le temps consacré 
                aux audits internes tout en améliorant notre score de conformité."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  MC
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Marie Château</div>
                  <div className="text-sm text-gray-500">Responsable Qualité, TechCorp</div>
                </div>
              </div>
            </div>

            {/* Témoignage 2 */}
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-1 mb-4">
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "L'assistant IA est incroyable ! Il répond instantanément à toutes nos questions sur ISO 9001 
                avec des références précises. Un vrai gain de temps."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  PD
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Pierre Dubois</div>
                  <div className="text-sm text-gray-500">Auditeur Interne, InnovaGroup</div>
                </div>
              </div>
            </div>

            {/* Témoignage 3 */}
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-1 mb-4">
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
                <i className="fas fa-star text-yellow-400"></i>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "La génération automatique de documents nous a fait économiser des semaines de travail. 
                Les templates sont parfaitement conformes et personnalisables."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  SL
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sophie Laurent</div>
                  <div className="text-sm text-gray-500">Consultante Qualité, QualityFirst</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Tarification */}
      <section id="tarification" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              <i className="fas fa-tags mr-2"></i> TARIFICATION
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Des forfaits adaptés à vos besoins
            </h2>
            <p className="text-xl text-gray-600">
              Choisissez l'offre qui correspond à la taille de votre organisation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Plan Starter */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <i className="fas fa-rocket text-blue-600 text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                <p className="text-gray-600">Pour les petites structures</p>
              </div>

              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <div className="text-5xl font-bold text-gray-900 mb-2">49€</div>
                <div className="text-gray-500">par mois</div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check-circle text-green-500 mt-1"></i>
                  <span className="text-gray-700">Jusqu'à <strong>50 documents</strong> analysés/mois</span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check-circle text-green-500 mt-1"></i>
                  <span className="text-gray-700"><strong>Chat Bot</strong> illimité</span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check-circle text-green-500 mt-1"></i>
                  <span className="text-gray-700"><strong>1 norme</strong> au choix</span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check-circle text-green-500 mt-1"></i>
                  <span className="text-gray-700"><strong>3 utilisateurs</strong></span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check-circle text-green-500 mt-1"></i>
                  <span className="text-gray-700">Support <strong>email</strong></span>
                </li>
              </ul>

              <a
                href="/service-selection?plan=starter"
                className="block w-full py-3 text-center bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                Commencer
              </a>
            </div>

            {/* Plan Professionnel - Recommandé */}
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-8 text-white relative hover:shadow-2xl hover:scale-105 transition-all">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-yellow-400 text-gray-900 text-sm font-bold rounded-full">
                RECOMMANDÉ
              </div>

              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <i className="fas fa-star text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold mb-2">Professionnel</h3>
                <p className="text-blue-100">Pour les PME et ETI</p>
              </div>

              <div className="text-center mb-6 pb-6 border-b border-white/20">
                <div className="text-5xl font-bold mb-2">149€</div>
                <div className="text-blue-100">par mois</div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check-circle text-yellow-300 mt-1"></i>
                  <span><strong>Documents illimités</strong></span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check-circle text-yellow-300 mt-1"></i>
                  <span><strong>Toutes les normes</strong></span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check-circle text-yellow-300 mt-1"></i>
                  <span><strong>10 utilisateurs</strong></span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check-circle text-yellow-300 mt-1"></i>
                  <span><strong>Gestion des NC</strong></span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check-circle text-yellow-300 mt-1"></i>
                  <span><strong>API & intégrations</strong></span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check-circle text-yellow-300 mt-1"></i>
                  <span>Support <strong>prioritaire 24/7</strong></span>
                </li>
              </ul>

              <a
                href="/service-selection?plan=pro"
                className="block w-full py-3 text-center bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Commencer
              </a>
            </div>

            {/* Plan Enterprise */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-purple-500 hover:shadow-xl transition-all">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <i className="fas fa-building text-purple-600 text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <p className="text-gray-600">Pour les grandes entreprises</p>
              </div>

              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <div className="text-4xl font-bold text-gray-900 mb-2">Sur mesure</div>
                <div className="text-gray-500">Contactez-nous</div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check-circle text-green-500 mt-1"></i>
                  <span className="text-gray-700">Tout du plan <strong>Professionnel</strong></span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check-circle text-green-500 mt-1"></i>
                  <span className="text-gray-700"><strong>Utilisateurs illimités</strong></span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check-circle text-green-500 mt-1"></i>
                  <span className="text-gray-700"><strong>Serveur dédié</strong></span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check-circle text-green-500 mt-1"></i>
                  <span className="text-gray-700"><strong>Formation sur site</strong></span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check-circle text-green-500 mt-1"></i>
                  <span className="text-gray-700"><strong>SLA garanti</strong></span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check-circle text-green-500 mt-1"></i>
                  <span className="text-gray-700">Account manager <strong>dédié</strong></span>
                </li>
              </ul>

              <a
                href="mailto:contact@ia-conformite.fr"
                className="block w-full py-3 text-center bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors"
              >
                Nous contacter
              </a>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600">
              <i className="fas fa-shield-check text-green-500 mr-2"></i>
              Toutes les offres incluent <strong>14 jours d'essai gratuit</strong> sans engagement
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à transformer votre gestion de la conformité ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Rejoignez les entreprises qui automatisent leur conformité ISO avec l'Intelligence Artificielle
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/service-selection"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-lg font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <i className="fas fa-rocket mr-3"></i>
              Démarrer gratuitement
            </a>
            <a
              href="mailto:contact@ia-conformite.fr"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-900 text-lg font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              <i className="fas fa-envelope mr-3"></i>
              Demander une démo
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Colonne 1 - Produit */}
            <div>
              <h4 className="text-white font-bold mb-4">Produit</h4>
              <ul className="space-y-2">
                <li><a href="#fonctionnalites" className="hover:text-white transition-colors">Fonctionnalités</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#tarification" className="hover:text-white transition-colors">Tarification</a></li>
                <li><a href="/login" className="hover:text-white transition-colors">Se connecter</a></li>
              </ul>
            </div>

            {/* Colonne 2 - Entreprise */}
            <div>
              <h4 className="text-white font-bold mb-4">Entreprise</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carrières</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Colonne 3 - Support */}
            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Statut</a></li>
              </ul>
            </div>

            {/* Colonne 4 - Contact */}
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <i className="fas fa-envelope"></i>
                  <a href="mailto:contact@ia-conformite.fr" className="hover:text-white transition-colors">
                    contact@ia-conformite.fr
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="fas fa-phone"></i>
                  <span>+33 1 23 45 67 89</span>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Paris, France</span>
                </li>
              </ul>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <i className="fas fa-shield-check text-white"></i>
              </div>
              <span className="text-white font-bold">IA Conformité</span>
            </div>
            <div className="text-sm text-gray-500">
              © 2024 INPT Innovation. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
