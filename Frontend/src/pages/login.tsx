export function LoginPage() {
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
          <div class="flex items-center space-x-3 mb-8">
            <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <i class="fas fa-shield-alt text-blue-600 text-2xl"></i>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-white">IA Conformité</h1>
              <p class="text-blue-200 text-sm">INPT Innovation</p>
            </div>
          </div>
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

      {/* Right side - Login form */}
      <div class="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div class="w-full max-w-md">
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
              <h2 class="text-2xl font-bold text-gray-900 mb-2">Connexion</h2>
              <p class="text-gray-600">Accédez à votre espace de conformité</p>
            </div>

            {/* Demo hint */}
            <div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div class="flex items-start space-x-3">
                <i class="fas fa-info-circle text-blue-600 mt-1"></i>
                <div class="text-sm text-blue-800">
                  <strong>💡 Pour la démo :</strong> Utilisez n'importe quel email et mot de passe
                </div>
              </div>
            </div>

            <form id="loginForm" onsubmit="return handleLogin(event)">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Adresse email
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i class="fas fa-envelope text-gray-400"></i>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      class="input-field pl-10"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i class="fas fa-lock text-gray-400"></i>
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      class="input-field pl-10"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <label class="flex items-center">
                    <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span class="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
                  </label>
                  <a href="#" class="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Mot de passe oublié ?
                  </a>
                </div>

                <button
                  type="submit"
                  class="w-full btn btn-primary py-3 text-base font-semibold"
                >
                  <i class="fas fa-sign-in-alt mr-2"></i>
                  Se connecter
                </button>
              </div>
            </form>

            <div class="mt-6 text-center">
              <p class="text-sm text-gray-600">
                Pas encore de compte ?
                <a href="/register" class="text-blue-600 hover:text-blue-700 font-medium ml-1">
                  Créer un nouveau compte
                </a>
              </p>
            </div>
          </div>

          {/* Features for mobile */}
          <div class="lg:hidden mt-8 text-center text-sm text-gray-600">
            <p>Chat Bot • Analyse • Génération de documents</p>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          async function handleLogin(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            const success = await Auth.login(email, password);
            if (success) {
              window.location.href = '/dashboard';
            } else {
              Utils.showNotification('Erreur de connexion', 'error');
            }
            return false;
          }
        `
      }} />
    </div>
  )
}
