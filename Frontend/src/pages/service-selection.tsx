export function ServiceSelectionPage() {
  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <i className="fas fa-shield-check text-white text-2xl"></i>
              </div>
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  IA Conformité
                </div>
                <div className="text-xs text-gray-500 font-medium">Solution intelligente ISO</div>
              </div>
            </a>
            <div className="flex items-center space-x-4">
              <a href="/login" className="px-5 py-2.5 text-gray-700 hover:text-gray-900 font-medium">
                Se connecter
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="h-20"></div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-blue-800">Étape 1/3 : Choisissez votre service</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Quel type de conformité souhaitez-vous gérer ?
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Sélectionnez le service adapté à votre secteur d'activité et à vos besoins spécifiques. 
              Vous pourrez ajouter d'autres services ultérieurement.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Service ISO 9001 */}
            <div className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              {/* Image du service */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop" 
                  alt="ISO 9001 Quality Management"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                  POPULAIRE
                </span>
              </div>

              <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center shadow-lg -mt-16 relative z-10 border-4 border-white">
                  <i className="fas fa-certificate text-white text-3xl"></i>
                </div>
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-3">ISO 9001:2015</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Management de la qualité - Système de management pour améliorer la satisfaction client et l'efficacité organisationnelle
              </p>

              <div className="space-y-3 mb-8">
                <h4 className="text-sm font-bold text-gray-700 uppercase">Inclus dans cette offre :</h4>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700">Analyse conformité <strong>toutes clauses ISO 9001</strong></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700">Assistant IA spécialisé <strong>ISO 9001:2015</strong></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700">Génération de <strong>procédures et formulaires</strong></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700">Gestion des <strong>non-conformités (NC)</strong></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700">Bibliothèque documentaire <strong>par processus</strong></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700">Tableaux de bord et <strong>reporting</strong></span>
                  </li>
                </ul>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Idéal pour :</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white text-gray-700 text-xs font-semibold rounded-full">PME</span>
                    <span className="px-3 py-1 bg-white text-gray-700 text-xs font-semibold rounded-full">ETI</span>
                    <span className="px-3 py-1 bg-white text-gray-700 text-xs font-semibold rounded-full">Industries</span>
                  </div>
                </div>
              </div>

              <a
                href="/register?service=iso9001"
                className="block w-full py-4 text-center bg-gradient-to-r from-blue-600 to-blue-500 text-white text-lg font-semibold rounded-xl hover:shadow-xl group-hover:scale-105 transition-all"
              >
                Choisir ISO 9001 <i className="fas fa-arrow-right ml-2"></i>
              </a>
              </div>
            </div>

            {/* Service Marchés Publics */}
            <div className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-green-500 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              {/* Image du service */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop" 
                  alt="Marchés Publics"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute top-4 right-4 px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                  NOUVEAU
                </span>
              </div>

              <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-400 rounded-2xl flex items-center justify-center shadow-lg -mt-16 relative z-10 border-4 border-white">
                  <i className="fas fa-landmark text-white text-3xl"></i>
                </div>
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-3">Marchés Publics</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Conformité réglementaire - Vérification et analyse de vos dossiers d'appels d'offres publics
              </p>

              <div className="space-y-3 mb-8">
                <h4 className="text-sm font-bold text-gray-700 uppercase">Inclus dans cette offre :</h4>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700">Vérification <strong>pièces obligatoires</strong> (DC1, DC2, etc.)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700">Analyse de <strong>complétude du dossier</strong></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700">Assistant IA <strong>Code des marchés publics</strong></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700">Aide à la <strong>rédaction de mémoires</strong></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700">Alerte sur les <strong>documents manquants</strong></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700">Export du <strong>dossier complet</strong></span>
                  </li>
                </ul>
              </div>

              <div className="mb-6 p-4 bg-green-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Idéal pour :</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white text-gray-700 text-xs font-semibold rounded-full">BTP</span>
                    <span className="px-3 py-1 bg-white text-gray-700 text-xs font-semibold rounded-full">Services</span>
                    <span className="px-3 py-1 bg-white text-gray-700 text-xs font-semibold rounded-full">Consulting</span>
                  </div>
                </div>
              </div>

              <a
                href="/register?service=marches"
                className="block w-full py-4 text-center bg-gradient-to-r from-green-600 to-green-500 text-white text-lg font-semibold rounded-xl hover:shadow-xl group-hover:scale-105 transition-all"
              >
                Choisir Marchés Publics <i className="fas fa-arrow-right ml-2"></i>
              </a>
              </div>
            </div>

            {/* Service ISO 27001 */}
            <div className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-purple-500 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              {/* Image du service */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&h=400&fit=crop" 
                  alt="ISO 27001 Information Security"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-400 rounded-2xl flex items-center justify-center shadow-lg -mt-16 relative z-10 border-4 border-white">
                  <i className="fas fa-shield-alt text-white text-3xl"></i>
                </div>
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-3">ISO 27001:2022</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Sécurité de l'information - Système de management pour protéger les données sensibles
              </p>

              <div className="space-y-3 mb-8">
                <h4 className="text-sm font-bold text-gray-700 uppercase">Inclus dans cette offre :</h4>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700">Analyse des <strong>risques informatiques</strong></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700">Vérification des <strong>contrôles de sécurité</strong></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700">Documentation <strong>SMSI complète</strong></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700">Assistant IA <strong>ISO 27001:2022</strong></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700">Suivi des <strong>incidents de sécurité</strong></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700">Plan de <strong>continuité d'activité</strong></span>
                  </li>
                </ul>
              </div>

              <div className="mb-6 p-4 bg-purple-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Idéal pour :</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white text-gray-700 text-xs font-semibold rounded-full">IT</span>
                    <span className="px-3 py-1 bg-white text-gray-700 text-xs font-semibold rounded-full">SaaS</span>
                    <span className="px-3 py-1 bg-white text-gray-700 text-xs font-semibold rounded-full">Cloud</span>
                  </div>
                </div>
              </div>

              <a
                href="/register?service=iso27001"
                className="block w-full py-4 text-center bg-gradient-to-r from-purple-600 to-purple-500 text-white text-lg font-semibold rounded-xl hover:shadow-xl group-hover:scale-105 transition-all"
              >
                Choisir ISO 27001 <i className="fas fa-arrow-right ml-2"></i>
              </a>
              </div>
            </div>

            {/* Service HDS */}
            <div className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-orange-500 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              {/* Image du service */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop" 
                  alt="HDS Health Data Hosting"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg -mt-16 relative z-10 border-4 border-white">
                  <i className="fas fa-hospital text-white text-3xl"></i>
                </div>
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-3">HDS (Hébergement)</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Données de Santé - Certification pour l'hébergement de données de santé à caractère personnel
              </p>

              <div className="space-y-3 mb-8">
                <h4 className="text-sm font-bold text-gray-700 uppercase">Inclus dans cette offre :</h4>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700">Référentiel <strong>HDS complet</strong> (arrêté 2018)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700">Audit de conformité <strong>RGPD santé</strong></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700">Préparation à la <strong>certification</strong></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700">Assistant IA <strong>réglementation santé</strong></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700">Gestion des <strong>données sensibles</strong></span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-green-500 mt-1"></i>
                    <span className="text-gray-700">Documentation <strong>obligatoire</strong></span>
                  </li>
                </ul>
              </div>

              <div className="mb-6 p-4 bg-orange-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Idéal pour :</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white text-gray-700 text-xs font-semibold rounded-full">e-Santé</span>
                    <span className="px-3 py-1 bg-white text-gray-700 text-xs font-semibold rounded-full">Hôpitaux</span>
                    <span className="px-3 py-1 bg-white text-gray-700 text-xs font-semibold rounded-full">Cliniques</span>
                  </div>
                </div>
              </div>

              <a
                href="/register?service=hds"
                className="block w-full py-4 text-center bg-gradient-to-r from-orange-600 to-orange-500 text-white text-lg font-semibold rounded-xl hover:shadow-xl group-hover:scale-105 transition-all"
              >
                Choisir HDS <i className="fas fa-arrow-right ml-2"></i>
              </a>
              </div>
            </div>

          </div>

          {/* Section Comparaison */}
          <div className="mt-16 max-w-5xl mx-auto bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Vous hésitez ?</h3>
              <p className="text-gray-600">Comparez les services ou contactez-nous pour un accompagnement personnalisé</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:contact@ia-conformite.fr"
                className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all"
              >
                <i className="fas fa-envelope mr-2"></i>
                Nous contacter
              </a>
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all"
              >
                <i className="fas fa-file-download mr-2"></i>
                Télécharger le comparatif
              </a>
              <a
                href="/"
                className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Retour à l'accueil
              </a>
            </div>
          </div>

          {/* Trust Section */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-4">
              <i className="fas fa-shield-check text-green-500 mr-2"></i>
              <strong>14 jours d'essai gratuit</strong> sans engagement • Aucune carte bancaire requise
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 mt-8">
              <div className="flex items-center space-x-2 text-gray-500">
                <i className="fas fa-lock text-blue-500"></i>
                <span className="text-sm">Données sécurisées</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <i className="fas fa-headset text-green-500"></i>
                <span className="text-sm">Support 24/7</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <i className="fas fa-star text-yellow-400"></i>
                <span className="text-sm">95% satisfaction</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <i className="fas fa-users text-purple-500"></i>
                <span className="text-sm">500+ entreprises</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
