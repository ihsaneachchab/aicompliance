import { Layout } from '../layouts/layout'

export function ProfilPage() {
  return (
    <Layout currentPage="profil">
      <div class="space-y-6">
        {/* Page header */}
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Mon Profil</h1>
          <p class="text-gray-600">Gérez vos informations personnelles et paramètres</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Photo */}
          <div class="card text-center">
            <div class="mb-4">
              <div class="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-4xl mb-4">
                <i class="fas fa-user"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900" id="profileName">Utilisateur</h3>
              <p class="text-sm text-gray-600" id="profileEmail">user@example.com</p>
            </div>

            <button class="btn btn-secondary w-full mb-3" onclick="changePhoto()">
              <i class="fas fa-camera mr-2"></i>
              Changer la photo
            </button>

            <button class="btn btn-secondary w-full" onclick="Auth.logout()">
              <i class="fas fa-sign-out-alt mr-2"></i>
              Déconnexion
            </button>
          </div>

          {/* Profile Information */}
          <div class="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div class="card">
              <h2 class="text-xl font-bold text-gray-900 mb-4">Informations personnelles</h2>

              <form id="profileForm" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Prénom
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      class="input-field"
                      placeholder="Prénom"
                      value="Marie"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      class="input-field"
                      placeholder="Nom"
                      value="Dupont"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    class="input-field"
                    placeholder="email@example.com"
                    value="marie.dupont@entreprise.fr"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    class="input-field"
                    placeholder="+33 6 XX XX XX XX"
                    value="+33 6 12 34 56 78"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Poste / Fonction
                  </label>
                  <input
                    type="text"
                    id="position"
                    class="input-field"
                    placeholder="Responsable Qualité"
                    value="Responsable Qualité"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Département
                  </label>
                  <select id="department" class="input-field">
                    <option value="quality">Qualité</option>
                    <option value="production">Production</option>
                    <option value="rh">Ressources Humaines</option>
                    <option value="commercial">Commercial</option>
                    <option value="logistique">Logistique</option>
                  </select>
                </div>

                <div class="flex justify-end space-x-3">
                  <button type="button" class="btn btn-secondary" onclick="cancelEdit()">
                    Annuler
                  </button>
                  <button type="submit" class="btn btn-primary" onclick="saveProfile(event)">
                    <i class="fas fa-save mr-2"></i>
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>

            {/* Change Password */}
            <div class="card">
              <h2 class="text-xl font-bold text-gray-900 mb-4">Changer le mot de passe</h2>

              <form id="passwordForm" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe actuel
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    class="input-field"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    class="input-field"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    class="input-field"
                    placeholder="••••••••"
                  />
                </div>

                <div class="flex justify-end">
                  <button type="submit" class="btn btn-primary" onclick="changePassword(event)">
                    <i class="fas fa-key mr-2"></i>
                    Changer le mot de passe
                  </button>
                </div>
              </form>
            </div>

            {/* Preferences */}
            <div class="card">
              <h2 class="text-xl font-bold text-gray-900 mb-4">Préférences</h2>

              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="font-medium text-gray-900">Notifications par email</div>
                    <div class="text-sm text-gray-600">Recevoir les notifications importantes</div>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked class="sr-only peer" onchange="toggleNotifications(this)" />
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <div class="font-medium text-gray-900">Notifications push</div>
                    <div class="text-sm text-gray-600">Alertes en temps réel</div>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer" onchange="togglePushNotifications(this)" />
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <div class="font-medium text-gray-900">Langue</div>
                    <div class="text-sm text-gray-600">Langue de l'interface</div>
                  </div>
                  <select class="input-field w-48">
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          // Load user data
          const user = Auth.getCurrentUser();
          if (user) {
            document.getElementById('profileName').textContent = user.name || user.email;
            document.getElementById('profileEmail').textContent = user.email;
            document.getElementById('email').value = user.email;
          }

          function changePhoto() {
            Utils.showNotification('Fonctionnalité de changement de photo en cours de développement', 'info');
          }

          function saveProfile(event) {
            event.preventDefault();
            
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            
            // Update user in AppState
            const user = Auth.getCurrentUser();
            if (user) {
              user.name = firstName + ' ' + lastName;
              user.email = email;
              Utils.saveToStorage('currentUser', user);
              
              // Update display
              document.getElementById('userName').textContent = user.name;
              document.getElementById('profileName').textContent = user.name;
              document.getElementById('profileEmail').textContent = user.email;
              
              Utils.showNotification('Profil mis à jour avec succès', 'success');
            }
          }

          function cancelEdit() {
            const user = Auth.getCurrentUser();
            if (user) {
              // Reset form
              document.getElementById('email').value = user.email;
            }
            Utils.showNotification('Modifications annulées', 'info');
          }

          function changePassword(event) {
            event.preventDefault();
            
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (!currentPassword || !newPassword || !confirmPassword) {
              Utils.showNotification('Veuillez remplir tous les champs', 'warning');
              return;
            }
            
            if (newPassword !== confirmPassword) {
              Utils.showNotification('Les mots de passe ne correspondent pas', 'error');
              return;
            }
            
            if (newPassword.length < 8) {
              Utils.showNotification('Le mot de passe doit contenir au moins 8 caractères', 'warning');
              return;
            }
            
            // Reset form
            document.getElementById('passwordForm').reset();
            Utils.showNotification('Mot de passe changé avec succès', 'success');
          }

          function toggleNotifications(checkbox) {
            const status = checkbox.checked ? 'activées' : 'désactivées';
            Utils.showNotification('Notifications email ' + status, 'success');
          }

          function togglePushNotifications(checkbox) {
            const status = checkbox.checked ? 'activées' : 'désactivées';
            Utils.showNotification('Notifications push ' + status, 'success');
          }
        `
      }} />
    </Layout>
  )
}
