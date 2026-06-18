const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbybDS8vOCFQ9MGECMq1pa1B7c1A2Vl5f36-TSM-o8fKQogHeWjgBY_gCHEUMibSbyaJ/exec";

const form = document.getElementById("briefingForm");
const message = document.getElementById("message");
const button = form.querySelector("button");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  message.textContent = "Enviando onboarding...";
  button.disabled = true;
  button.textContent = "Enviando...";

  const formData = new FormData(form);
  const params = new URLSearchParams();

  for (const [key, value] of formData.entries()) {
    params.append(key, value);
  }

  const img = new Image();
  img.src = `${WEBHOOK_URL}?${params.toString()}`;

  setTimeout(() => {
    message.textContent = "Onboarding enviado com sucesso. A equipe Mugô recebeu suas informações.";
    form.reset();
    button.disabled = false;
    button.textContent = "Enviar onboarding";
  }, 1200);
});