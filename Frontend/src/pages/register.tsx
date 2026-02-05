export function RegisterPage() {
  return (
    <div class="min-h-screen flex">
      {/* Left side - Branding */}
      <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 p-12 flex-col justify-between relative overflow-hidden">
        {/* Background pattern */}
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div class="relative z-10">
          <a href="/" class="flex items-center space-x-3 mb-8">
            <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <i class="fas fa-shield-alt text-blue-600 text-2xl"></i>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-white">IA Conformité</h1>
              <p class="text-blue-200 text-sm">INPT Innovation</p>
            </div>
          </a>
        </div>

        <div class="relative z-10">
          <h2 class="text-4xl font-bold text-white mb-6">
            Solution intelligente de gestion qualité
          </h2>
          <p class="text-xl text-blue-100 mb-8">
            Simplifiez et automatisez votre conformité ISO 9001 grâce à l'intelligence artificielle
          </p>

          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <div class="w-10 h-10 bg-blue-500 bg-opacity-30 rounded-lg flex items-center justify-center flex-shrink-0">
                <i class="fas fa-comments text-white"></i>
              </div>
              <div>
                <h3 class="text-white font-semibold">Chat Bot Intelligent</h3>
                <p class="text-blue-200 text-sm">Réponses instantanées sur les normes ISO</p>
              </div>
            </div>

            <div class="flex items-start space-x-3">
              <div class="w-10 h-10 bg-blue-500 bg-opacity-30 rounded-lg flex items-center justify-center flex-shrink-0">
                <i class="fas fa-search text-white"></i>
              </div>
              <div>
                <h3 class="text-white font-semibold">Analyse de Conformité</h3>
                <p class="text-blue-200 text-sm">Analyse automatique de vos documents</p>
              </div>
            </div>

            <div class="flex items-start space-x-3">
              <div class="w-10 h-10 bg-blue-500 bg-opacity-30 rounded-lg flex items-center justify-center flex-shrink-0">
                <i class="fas fa-file-alt text-white"></i>
              </div>
              <div>
                <h3 class="text-white font-semibold">Génération de Documents</h3>
                <p class="text-blue-200 text-sm">Création automatique de documents conformes</p>
              </div>
            </div>
          </div>
        </div>

        <div class="relative z-10 text-blue-200 text-sm">
          © 2024 INPT Innovation. Tous droits réservés.
        </div>
      </div>

      {/* Right side - Register form */}
      <div class="flex-1 flex items-center justify-center p-8 bg-gray-50 overflow-y-auto">
        <div class="w-full max-w-xl">
          <div class="bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
            {/* Logo mobile */}
            <div class="lg:hidden text-center mb-8">
              <div class="inline-flex items-center space-x-2 mb-2">
                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <i class="fas fa-shield-alt text-white text-xl"></i>
                </div>
                <h1 class="text-2xl font-bold text-gray-900">IA Conformité</h1>
              </div>
              <p class="text-gray-600 text-sm">Solution intelligente de gestion qualité</p>
            </div>

            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-2">Créez votre compte gratuit</h2>
              <p class="text-gray-600">Accédez à IA Conformité et transformez votre gestion qualité</p>
            </div>

            <form id="registerForm" onsubmit="return handleRegister(event)" class="space-y-4">
              {/* Entreprise + Nom Complet */}
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Entreprise <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    placeholder="Votre entreprise"
                    required
                    class="input-field"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Nom Complet <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Votre nom"
                    required
                    class="input-field"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Email Professionnel <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-envelope text-gray-400"></i>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="vous@entreprise.com"
                    required
                    class="input-field pl-10"
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i class="fas fa-lock text-gray-400"></i>
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Minimum 8 caractères"
                      required
                      class="input-field pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Confirmer <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i class="fas fa-lock text-gray-400"></i>
                    </div>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirmation"
                      required
                      class="input-field pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Comment avez-vous entendu parler de nous */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Comment avez-vous entendu parler de nous ? <span class="text-red-500">*</span>
                </label>
                <select
                  id="referral"
                  name="referral"
                  required
                  class="input-field"
                >
                  <option value="">Sélectionnez une option</option>
                  <option value="google">Google</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="facebook">Facebook</option>
                  <option value="recommendation">Recommandation</option>
                  <option value="event">Événement / Salon</option>
                  <option value="press">Article / Presse</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              {/* Téléphone (optionnel) */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone <span class="text-gray-400 text-sm">(optionnel)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+33 6 12 34 56 78"
                  class="input-field"
                />
              </div>

              {/* Service (hidden) */}
              <input type="hidden" id="selectedService" name="selectedService" value="" />

              {/* Conditions */}
              <div class="space-y-3">
                <label class="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    required
                    class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span class="text-sm text-gray-600">
                    J'accepte les{' '}
                    <a href="#" class="text-blue-600 hover:text-blue-700 font-medium">
                      conditions d'utilisation
                    </a>{' '}
                    et la{' '}
                    <a href="#" class="text-blue-600 hover:text-blue-700 font-medium">
                      politique de confidentialité
                    </a>
                  </span>
                </label>

                <label class="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span class="text-sm text-gray-600">
                    J'accepte de recevoir des emails sur les actualités produit et les offres spéciales
                  </span>
                </label>
              </div>

              <button
                type="submit"
                id="registerBtn"
                class="w-full btn btn-primary py-3 text-base font-semibold flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span id="btnSpinner" class="hidden">
                  <i class="fas fa-circle-notch fa-spin"></i>
                </span>
                <span id="btnText">
                  <i class="fas fa-user-plus mr-2"></i>
                  Créer mon compte
                </span>
              </button>
            </form>

            <div class="mt-6 text-center">
              <p class="text-sm text-gray-500 mb-4">
                <i class="fas fa-shield-check text-green-500 mr-2"></i>
                Pas de carte bancaire requise. Accès complet pendant 14 jours.
              </p>
            </div>

            <div class="mt-6 text-center">
              <div class="flex items-center my-4">
                <div class="flex-1 border-t border-gray-300"></div>
                <div class="px-4 text-sm text-gray-500">ou</div>
                <div class="flex-1 border-t border-gray-300"></div>
              </div>
              <p class="text-sm text-gray-600">
                Déjà un compte ?
                <a href="/login" class="text-blue-600 hover:text-blue-700 font-medium ml-1">
                  Se connecter
                </a>
              </p>
            </div>
          </div>

          {/* Trust badges mobile */}
          <div class="lg:hidden mt-8 text-center text-sm text-gray-600">
            <p>Chat Bot • Analyse • Génération de documents</p>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
              // Récupérer le service depuis l'URL
              const urlParams = new URLSearchParams(window.location.search);
              const service = urlParams.get('service');
              if (service) {
                const serviceInput = document.getElementById('selectedService');
                if (serviceInput) serviceInput.value = service;
              }

              async function handleRegister(event) {
                event.preventDefault();
                
                const btn = document.getElementById('registerBtn');
                const btnText = document.getElementById('btnText');
                const btnSpinner = document.getElementById('btnSpinner');
                
                // Reset errors
                Utils.showNotification('', 'info'); // Clear potential previous toasts if implementing clear logic
                
                const formData = new FormData(event.target);
                const data = Object.fromEntries(formData.entries());
                
                // Validation
                if (data.password !== data.confirmPassword) {
                  Utils.showNotification('Les mots de passe ne correspondent pas', 'error');
                  return false;
                }

                if (data.password.length < 8) {
                  Utils.showNotification('Le mot de passe doit contenir au moins 8 caractères', 'error');
                  return false;
                }

                try {
                    // Set Loading State
                    btn.disabled = true;
                    btnText.classList.add('hidden');
                    btnSpinner.classList.remove('hidden');

                    // Register via Backend
                    await Auth.register({
                        email: data.email,
                        fullName: data.fullName,
                        password: data.password,
                        company: data.company,
                        selectedService: data.selectedService,
                        phone: data.phone,
                        referral: data.referral,
                        terms: data.terms,
                        newsletter: data.newsletter
                    });

                    Utils.showNotification('Compte créé avec succès ! Redirection vers la page de connexion...', 'success');
                    
                    // Redirect to login after 1.5 seconds
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 1500);
                    
                } catch (error) {
                    console.error('Registration Error:', error);
                    Utils.showNotification(error.message || 'Erreur lors de la création du compte', 'error');
                } finally {
                    // Reset Loading State
                    btn.disabled = false;
                    btnText.classList.remove('hidden');
                    btnSpinner.classList.add('hidden');
                }

                return false;
              }
            `
      }} />
    </div>
  )
}
