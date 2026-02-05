export default function LoginForm() {
  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Connexion</h2>

        <form
          id="loginForm"
          onsubmit="return handleLogin(event)"
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Professionnel
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-envelope text-gray-400"></i>
              </div>
              <input
                name="email"
                type="email"
                required
                className="input-field pl-10"
                placeholder="votre@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-lock text-gray-400"></i>
              </div>
              <input
                name="password"
                type="password"
                required
                className="input-field pl-10"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 text-gray-600">Se souvenir de moi</span>
            </label>
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Mot de passe oublié ?</a>
          </div>

          <button
            type="submit"
            id="loginBtn"
            className="w-full btn btn-primary py-3 flex items-center justify-center space-x-2"
          >
            <span id="btnSpinner" className="hidden">
              <i className="fas fa-circle-notch fa-spin"></i>
            </span>
            <span id="btnText">Se connecter</span>
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Pas encore de compte ?
            <a href="/service-selection" className="text-blue-600 hover:text-blue-700 font-medium ml-1">
              Créer un compte
            </a>
          </p>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          // Check for URL parameters on load
          window.addEventListener('DOMContentLoaded', () => {
              const urlParams = new URLSearchParams(window.location.search);
              if (urlParams.get('verified') === 'true') {
                  Utils.showNotification('Email vérifié avec succès ! Vous pouvez maintenant vous connecter.', 'success');
              } else if (urlParams.get('error') === 'invalid_token') {
                  Utils.showNotification('Lien de vérification invalide ou expiré.', 'error');
              }
          });

          async function handleLogin(event) {
            event.preventDefault();
            const btn = document.getElementById('loginBtn');
            const btnText = document.getElementById('btnText');
            const btnSpinner = document.getElementById('btnSpinner');
            
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData.entries());
            
            try {
              btn.disabled = true;
              btnText.classList.add('hidden');
              btnSpinner.classList.remove('hidden');
              
              const success = await Auth.login(data.email, data.password);
              
              if (success) {
                Utils.showNotification('Connexion réussie ! Redirection...', 'success');
                setTimeout(() => {
                  window.location.href = '/dashboard';
                }, 1000);
              } else {
                Utils.showNotification('Email ou mot de passe incorrect', 'error');
              }
            } catch (error) {
              console.error('Login error:', error);
              Utils.showNotification('Une erreur est survenue lors de la connexion', 'error');
            } finally {
              btn.disabled = false;
              btnText.classList.remove('hidden');
              btnSpinner.classList.add('hidden');
            }
            return false;
          }
        `
      }} />
    </div>
  );
}
