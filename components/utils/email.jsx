export const sendEmail = async (email, task) => {
    try {
      const response = await fetch('https://votre-backend-url/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, task }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Email envoyé avec succès!');
      } else {
        alert('Échec de l\'envoi de l\'email.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
    }
  };
  