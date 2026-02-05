import { Auth } from "../services/authservice";

export function useLogin() {
  const login = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());

    const success = await Auth.login(
      data.email as string,
      data.password as string
    );

    if (success) {
      window.location.href = "/dashboard";
    } else {
      Utils.showNotification("Erreur de connexion", "error");
    }
  };

  const showVerificationMessage = () => {
    const params = new URLSearchParams(window.location.search);
    const verified = params.get("verified");
    const error = params.get("error");

    console.log("Verification params:", { verified, error });

    // Success case
    if (verified === "true") {
      Utils.showNotification(
        "Email vérifié avec succès ! Vous pouvez maintenant vous connecter.",
        "success"
      );
      
      // Clean URL after showing message
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    // Error cases
    if (verified === "false" || error) {
      let message = "Lien de vérification invalide.";
      
      if (error === "invalid_token") {
        message = "Lien de vérification invalide ou expiré.";
      } else if (error === "server_error") {
        message = "Une erreur s'est produite. Veuillez réessayer.";
      }
      
      Utils.showNotification(message, "error");
      
      // Clean URL after showing message
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  return { login, showVerificationMessage };
}