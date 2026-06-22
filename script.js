const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbybDS8vOCFQ9MGECMq1pa1B7c1A2Vl5f36-TSM-o8fKQogHeWjgBY_gCHEUMibSbyaJ/exec";
const MUGO_WHATSAPP = "5511973510549";

const categories = ["Marketing", "Vendas", "Automação", "Dados", "Relacionamento"];
const segments = [
  { id: "hotel", label: "Hotéis e pousadas", icon: "⌂", group: "turismo" },
  { id: "turismo", label: "Turismo", icon: "✦", group: "turismo" },
  { id: "restaurante", label: "Restaurantes", icon: "◉", group: "restaurante" },
  { id: "saude", label: "Saúde e clínicas", icon: "+", group: "saude" },
  { id: "dentista", label: "Odontologia", icon: "◇", group: "saude" },
  { id: "veterinaria", label: "Veterinárias", icon: "♧", group: "saude" },
  { id: "ecommerce", label: "E-commerce", icon: "□", group: "ecommerce" },
  { id: "investimentos", label: "Investimentos", icon: "↗", group: "investimentos" },
  { id: "engenharia", label: "Engenharia", icon: "△", group: "projetos" },
  { id: "arquitetura", label: "Arquitetura", icon: "⌁", group: "projetos" },
  { id: "agencia", label: "Agências", icon: "✳", group: "servicos" },
  { id: "servicos", label: "Outros serviços", icon: "◎", group: "servicos" },
  { id: "outro", label: "Outro segmento", icon: "…", group: "servicos" }
];

const universalQuestions = [
  {
    name: "como_chegam_clientes", title: "Como a maioria dos clientes chega até vocês?", categories: ["Vendas", "Relacionamento"],
    options: [["Indicação e contatos pessoais", 30], ["Redes sociais e conteúdo", 55], ["Anúncios e campanhas", 70], ["Vários canais medidos e previsíveis", 100]]
  },
  {
    name: "crm", title: "Como vocês organizam leads e oportunidades?", categories: ["Vendas", "Relacionamento"],
    options: [["Não temos um processo definido", 10], ["Planilhas, agenda ou WhatsApp", 40], ["Temos CRM, mas usamos parcialmente", 65], ["CRM atualizado com rotina comercial", 100]]
  },
  {
    name: "conteudo", title: "Como funciona a produção de conteúdo?", categories: ["Marketing", "Relacionamento"],
    options: [["Publicamos raramente", 10], ["Publicamos quando sobra tempo", 35], ["Temos frequência, mas pouca estratégia", 65], ["Temos estratégia, calendário e análise", 100]]
  },
  {
    name: "anuncios", title: "Qual é a realidade dos anúncios pagos?", categories: ["Marketing"],
    options: [["Nunca anunciamos", 10], ["Já testamos sem continuidade", 35], ["Anunciamos com alguma frequência", 70], ["Temos campanhas contínuas e otimizadas", 100]]
  },
  {
    name: "automacoes", title: "Quanto da operação comercial e de marketing é automatizada?", categories: ["Automação"],
    options: [["Tudo é manual", 10], ["Usamos respostas e ferramentas básicas", 35], ["Algumas etapas já são integradas", 70], ["Temos fluxos integrados e automáticos", 100]]
  },
  {
    name: "metricas", title: "Como as decisões são acompanhadas por métricas?", categories: ["Dados"],
    options: [["Decidimos mais pela percepção", 10], ["Olhamos métricas isoladas", 35], ["Acompanhamos indicadores periodicamente", 70], ["Temos metas, dashboard e decisões por dados", 100]]
  },
  {
    name: "principal_desafio", title: "Qual é o principal desafio neste momento?", categories: [],
    options: [["Atrair mais clientes", 0], ["Converter oportunidades em vendas", 0], ["Organizar e ganhar eficiência", 0], ["Medir resultados e crescer com previsibilidade", 0]]
  },
  {
    name: "objetivo_principal", title: "Qual é o principal objetivo para os próximos meses?", categories: [],
    options: [["Fortalecer a marca", 0], ["Gerar mais leads e vendas", 0], ["Automatizar processos", 0], ["Escalar com controle e inteligência", 0]]
  }
];

const maturityOptions = [
  ["Ainda não fazemos", 10],
  ["Fazemos de forma manual ou pontual", 40],
  ["Temos um processo, mas pode melhorar", 70],
  ["Funciona bem e é acompanhado", 100]
];

const specificByGroup = {
  turismo: [
    ["reservas_diretas", "Vocês têm estratégia para aumentar reservas diretas?", "Vendas"],
    ["ocupacao_sazonalidade", "Ocupação e sazonalidade orientam as campanhas?", "Dados"],
    ["pos_estadia", "Existe contato automático antes e depois da estadia?", "Relacionamento"],
    ["integracao_reservas", "Canais de reserva, atendimento e operação são integrados?", "Automação"]
  ],
  restaurante: [
    ["recorrencia_clientes", "Existe uma estratégia para aumentar a recorrência de clientes?", "Relacionamento"],
    ["delivery_salao", "Vocês medem separadamente delivery, salão e retirada?", "Dados"],
    ["campanhas_locais", "Campanhas locais geram reservas ou pedidos com frequência?", "Marketing"],
    ["atendimento_pedidos", "Reservas, pedidos e atendimento têm algum fluxo automático?", "Automação"]
  ],
  saude: [
    ["agenda_ocupacao", "A ocupação da agenda e as faltas são acompanhadas?", "Dados"],
    ["lembretes_retorno", "Lembretes, retornos e acompanhamento são automatizados?", "Automação"],
    ["jornada_paciente", "Existe uma jornada estruturada do primeiro contato ao pós-atendimento?", "Relacionamento"],
    ["captacao_etica", "A captação digital é contínua e adequada às regras do setor?", "Marketing"]
  ],
  ecommerce: [
    ["abandono_carrinho", "Existe recuperação de carrinho e recompra automatizada?", "Automação"],
    ["funil_ecommerce", "Conversão, ticket e recompra são acompanhados por etapa?", "Dados"],
    ["midia_rentavel", "As campanhas são otimizadas por receita e rentabilidade?", "Marketing"],
    ["base_clientes", "A base de clientes recebe ações segmentadas de relacionamento?", "Relacionamento"]
  ],
  investimentos: [
    ["qualificacao_investidor", "Os contatos são qualificados por perfil e momento de compra?", "Vendas"],
    ["nutricao_leads", "Existe uma jornada de conteúdo e nutrição para os leads?", "Relacionamento"],
    ["autoridade_digital", "A presença digital constrói autoridade de forma consistente?", "Marketing"],
    ["origem_conversao", "Vocês medem origem, avanço e conversão das oportunidades?", "Dados"]
  ],
  projetos: [
    ["portfolio_cases", "Portfólio e cases ajudam ativamente na geração de oportunidades?", "Marketing"],
    ["pipeline_propostas", "Existe controle do pipeline entre contato, proposta e contrato?", "Vendas"],
    ["followup_propostas", "Follow-ups de propostas e projetos são automatizados?", "Automação"],
    ["rentabilidade_projetos", "Prazo, origem e rentabilidade dos projetos são acompanhados?", "Dados"]
  ],
  servicos: [
    ["oferta_clara", "A oferta e os diferenciais são claros nos canais digitais?", "Marketing"],
    ["processo_comercial", "Existe um processo comercial replicável, da entrada ao fechamento?", "Vendas"],
    ["followup_clientes", "Follow-ups e contatos com clientes são organizados ou automáticos?", "Automação"],
    ["satisfacao_indicacao", "Satisfação, recompra e indicações são estimuladas?", "Relacionamento"]
  ]
};

const categoryContent = {
  Marketing: {
    strength: "Sua presença de marca e aquisição já têm uma base consistente.",
    bottleneck: "A comunicação e a geração de demanda ainda dependem de ações pontuais.",
    title: "Estruturar uma máquina de demanda",
    opportunity: "Alinhar posicionamento, conteúdo e mídia em uma estratégia contínua de aquisição.",
    service: "Estratégia de Marketing, Conteúdo e Performance"
  },
  Vendas: {
    strength: "O processo comercial demonstra organização e capacidade de conversão.",
    bottleneck: "O processo comercial perde oportunidades por falta de método e acompanhamento.",
    title: "Organizar o processo comercial",
    opportunity: "Definir etapas, critérios e uma rotina de follow-up para transformar contatos em vendas.",
    service: "Estruturação Comercial e CRM"
  },
  Automação: {
    strength: "A operação já utiliza tecnologia para reduzir esforço e ganhar velocidade.",
    bottleneck: "Tarefas manuais consomem tempo e dificultam uma operação escalável.",
    title: "Automatizar a jornada do cliente",
    opportunity: "Conectar atendimento, follow-up e rotinas repetitivas em fluxos mais inteligentes.",
    service: "Automações, Integrações e Inteligência Artificial"
  },
  Dados: {
    strength: "Os indicadores já apoiam decisões com mais segurança.",
    bottleneck: "A falta de indicadores integrados reduz a clareza sobre o que gera resultado.",
    title: "Transformar dados em direção",
    opportunity: "Criar um painel enxuto com metas e indicadores de aquisição, conversão e receita.",
    service: "Dados, Dashboards e Inteligência de Negócio"
  },
  Relacionamento: {
    strength: "A jornada de relacionamento favorece confiança, recorrência e indicação.",
    bottleneck: "A relação com leads e clientes ainda não tem uma jornada contínua.",
    title: "Aumentar recorrência e valor da base",
    opportunity: "Criar uma jornada de contato antes, durante e depois da compra para gerar novas oportunidades.",
    service: "CRM, Relacionamento e Jornada do Cliente"
  }
};

const form = document.getElementById("briefingForm");
const steps = [...document.querySelectorAll(".form-step")];
const progressWrap = document.getElementById("progressWrap");
const analysisScreen = document.getElementById("analysisScreen");
const resultScreen = document.getElementById("resultScreen");
const message = document.getElementById("message");
let currentStep = 0;
let selectedSegment = null;
let lastResult = null;
let submissionPixel = null;

function getUtmParams() {
  const url = new URL(window.location.href);
  return {
    utm_source: url.searchParams.get("utm_source") || "",
    utm_medium: url.searchParams.get("utm_medium") || "",
    utm_campaign: url.searchParams.get("utm_campaign") || ""
  };
}

function renderSegments() {
  document.getElementById("segmentGrid").innerHTML = segments.map(segment => `
    <label class="segment-option">
      <input type="radio" name="segmento" value="${segment.label}" data-id="${segment.id}" data-group="${segment.group}" required>
      <span><b>${segment.icon}</b>${segment.label}</span>
    </label>
  `).join("");
}

function renderQuestion(question, number) {
  return `
    <fieldset class="question-card" data-question="${question.name}">
      <legend><b>${number}</b>${question.title}</legend>
      <div class="choice-grid">
        ${question.options.map(([label, score]) => `
          <label class="choice"><input type="radio" name="${question.name}" value="${label}" data-score="${score}" data-categories="${question.categories.join(",")}" required><span>${label}</span></label>
        `).join("")}
      </div>
    </fieldset>
  `;
}

function renderUniversalQuestions() {
  document.getElementById("universalQuestions").innerHTML = universalQuestions.map((question, index) => renderQuestion(question, index + 1)).join("");
}

function renderSpecificQuestions() {
  const items = specificByGroup[selectedSegment.group] || specificByGroup.servicos;
  const questions = items.map(([name, title, category]) => ({ name, title, categories: [category], options: maturityOptions }));
  document.getElementById("specificQuestions").innerHTML = questions.map((question, index) => renderQuestion(question, index + 1)).join("");
  document.getElementById("specificIntro").textContent = `Perguntas rápidas sobre ${selectedSegment.label.toLowerCase()} para deixar sua análise mais precisa.`;
}

function updateProgress() {
  const percent = (currentStep + 1) * 25;
  document.getElementById("stepLabel").textContent = `Etapa ${currentStep + 1} de 4`;
  document.getElementById("progressPercent").textContent = `${percent}%`;
  document.getElementById("progressBar").style.width = `${percent}%`;
}

function showStep(index) {
  currentStep = index;
  steps.forEach((step, stepIndex) => step.classList.toggle("active", stepIndex === index));
  updateProgress();
  document.getElementById("indexCard").scrollIntoView({ behavior: "smooth", block: "start" });
}

function validateStep(stepIndex) {
  const step = steps[stepIndex];
  const error = step.querySelector(".field-error");
  step.querySelectorAll(".invalid").forEach(element => element.classList.remove("invalid"));
  error.textContent = "";

  if (stepIndex === 0) {
    const checked = form.querySelector('input[name="segmento"]:checked');
    if (!checked) {
      error.textContent = "Selecione o segmento do seu negócio para continuar.";
      return false;
    }
    const otherInput = form.elements.segmento_outro;
    if (checked.dataset.id === "outro" && !otherInput.value.trim()) {
      otherInput.classList.add("invalid");
      error.textContent = "Conte para a gente qual é o seu segmento.";
      otherInput.focus();
      return false;
    }
    selectedSegment = {
      id: checked.dataset.id,
      label: checked.dataset.id === "outro" ? otherInput.value.trim() : checked.value,
      group: checked.dataset.group
    };
    renderSpecificQuestions();
    return true;
  }

  if (stepIndex === 1) {
    const required = [...step.querySelectorAll("input[required]")];
    const invalid = required.filter(input => !input.value.trim() || !input.checkValidity());
    const phoneDigits = form.elements.telefone.value.replace(/\D/g, "");
    if (phoneDigits.length < 10) invalid.push(form.elements.telefone);
    if (invalid.length) {
      [...new Set(invalid)].forEach(input => input.classList.add("invalid"));
      error.textContent = "Revise os campos obrigatórios destacados.";
      invalid[0].focus();
      return false;
    }
    return true;
  }

  const unanswered = [...step.querySelectorAll(".question-card")].filter(card => !card.querySelector("input:checked"));
  if (unanswered.length) {
    unanswered.forEach(card => card.classList.add("invalid"));
    error.textContent = "Responda todas as perguntas para gerar uma análise completa.";
    unanswered[0].scrollIntoView({ behavior: "smooth", block: "center" });
    return false;
  }
  if (stepIndex === 3 && !form.elements.aceite_contato.checked) {
    step.querySelector(".privacy-check").classList.add("invalid");
    error.textContent = "Confirme o aceite para receber o diagnóstico.";
    return false;
  }
  return true;
}

function calculateScores() {
  const values = Object.fromEntries(categories.map(category => [category, []]));
  form.querySelectorAll('.question-card input[type="radio"]:checked').forEach(input => {
    const score = Number(input.dataset.score);
    input.dataset.categories.split(",").filter(Boolean).forEach(category => values[category].push(score));
  });
  const scores = {};
  categories.forEach(category => {
    const list = values[category];
    scores[category] = list.length ? Math.round(list.reduce((sum, value) => sum + value, 0) / list.length) : 0;
  });
  const overall = Math.round(categories.reduce((sum, category) => sum + scores[category], 0) / categories.length);
  return { scores, overall };
}

function getReading(score) {
  if (score < 35) return "Seu negócio está em fase de estruturação digital. Há espaço para ganhos rápidos com prioridades bem definidas.";
  if (score < 55) return "Seu negócio já começou a avançar, mas processos isolados ainda limitam a consistência dos resultados.";
  if (score < 75) return "Seu negócio tem uma base promissora. Integrar estratégia, operação e dados é o próximo salto de maturidade.";
  return "Seu negócio demonstra boa maturidade. O próximo passo é refinar a operação para escalar com mais eficiência e previsibilidade.";
}

function buildResult() {
  const { scores, overall } = calculateScores();
  const ranking = categories.map(category => [category, scores[category]]).sort((a, b) => b[1] - a[1]);
  const strong = ranking.slice(0, 2).map(([category]) => category);
  const weak = [...ranking].reverse().slice(0, 2).map(([category]) => category);
  const opportunities = [...ranking].reverse().slice(0, 3).map(([category]) => ({ category, ...categoryContent[category] }));
  const main = opportunities[0];
  const firstName = form.elements.responsavel.value.trim().split(" ")[0];
  const summary = `${firstName}, o diagnóstico indica que ${categoryContent[strong[0]].strength.toLowerCase()} O principal potencial de evolução está em ${main.category.toLowerCase()}: ${main.opportunity.toLowerCase()} Ao conectar essa frente às demais áreas, a ${form.elements.empresa.value.trim()} pode ganhar consistência, eficiência e previsibilidade.`;
  return { scores, overall, strong, weak, opportunities, summary, main };
}

function renderResult(result) {
  const firstName = form.elements.responsavel.value.trim().split(" ")[0];
  document.getElementById("resultGreeting").textContent = `${firstName}, esta é a leitura de maturidade da ${form.elements.empresa.value.trim()}.`;
  document.getElementById("overallScore").textContent = result.overall;
  document.getElementById("scoreGauge").style.setProperty("--score", `${result.overall}%`);
  document.getElementById("scoreReading").textContent = getReading(result.overall);
  document.getElementById("categoryScores").innerHTML = categories.map(category => `
    <div class="score-row"><span>${category}</span><div class="mini-track"><i style="--value:${result.scores[category]}%"></i></div><strong>${result.scores[category]}</strong></div>
  `).join("");
  document.getElementById("strengthsList").innerHTML = result.strong.map(category => `<li>${categoryContent[category].strength}</li>`).join("");
  document.getElementById("bottlenecksList").innerHTML = result.weak.map(category => `<li>${categoryContent[category].bottleneck}</li>`).join("");
  document.getElementById("opportunitiesList").innerHTML = result.opportunities.map((item, index) => `
    <article class="opportunity"><span>0${index + 1}</span><div><h4>${item.title}</h4><p>${item.opportunity}</p></div></article>
  `).join("");
  document.getElementById("consultiveSummary").textContent = result.summary;
  document.getElementById("recommendedService").textContent = result.main.service;

  const text = `Olá, Júlia! Fiz o MUGÔ Business Index. Meu negócio é a ${form.elements.empresa.value.trim()}, do segmento ${selectedSegment.label}, e meu score foi ${result.overall}/100. Quero conversar sobre ${result.main.category.toLowerCase()}.`;
  document.getElementById("whatsappCta").href = `https://wa.me/${MUGO_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

function collectAnswers() {
  const answers = {};
  form.querySelectorAll('.question-card input[type="radio"]:checked').forEach(input => {
    answers[input.name] = input.value;
  });
  return answers;
}

function submitToSheets(result) {
  const params = new URLSearchParams();
  const utms = getUtmParams();
  const data = new FormData();

  data.append("aba_destino", "iintelegence");
  data.append("lead_id", `INTEL-${Date.now()}`);
  data.append("data_envio", new Date().toISOString());
  data.append("empresa", form.elements.empresa.value.trim());
  data.append("responsavel", form.elements.responsavel.value.trim());
  data.append("telefone", form.elements.telefone.value.trim());
  data.append("email", form.elements.email.value.trim());
  data.append("segmento", selectedSegment.label);
  data.append("instagram", form.elements.instagram.value.trim());
  data.append("site", form.elements.site.value.trim());
  data.append("linkedin", form.elements.linkedin.value.trim());
  data.append("google_business", form.elements.google_meu_negocio.value.trim());
  data.append("score_geral", result.overall);
  data.append("score_marketing", result.scores.Marketing);
  data.append("score_vendas", result.scores.Vendas);
  data.append("score_automacao", result.scores.Automação);
  data.append("score_dados", result.scores.Dados);
  data.append("score_relacionamento", result.scores.Relacionamento);
  data.append("principal_oportunidade", `${result.main.title}: ${result.main.opportunity}`);
  data.append("servico_mugo_recomendado", result.main.service);
  data.append("resumo_gerado", result.summary);
  data.append("respostas_completas", JSON.stringify(collectAnswers()));
  data.append("origem_lead", window.location.href);
  data.append("status", "Novo");
  data.append("responsavel_mugo", "");
  data.append("temperatura", "");
  data.append("proximo_passo", "");
  data.append("data_reuniao", "");
  data.append("observacoes", "");
  data.append("utm_source", utms.utm_source);
  data.append("utm_medium", utms.utm_medium);
  data.append("utm_campaign", utms.utm_campaign);

  for (const [key, value] of data.entries()) params.append(key, value);

  submissionPixel = new Image();
  submissionPixel.referrerPolicy = "no-referrer-when-downgrade";
  submissionPixel.src = `${WEBHOOK_URL}?${params.toString()}`;
  message.textContent = "Diagnóstico registrado. A equipe Mugô recebeu suas informações.";
}

async function runAnalysis(result) {
  form.classList.add("hidden");
  progressWrap.classList.add("hidden");
  analysisScreen.classList.remove("hidden");
  const items = [...document.querySelectorAll("#analysisList > div")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const delay = reducedMotion ? 40 : 560;
  for (const item of items) {
    item.classList.add("active");
    await new Promise(resolve => setTimeout(resolve, delay));
    item.classList.remove("active");
    item.classList.add("done");
  }
  renderResult(result);
  submitToSheets(result);
  analysisScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  document.getElementById("indexCard").scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
}

document.addEventListener("change", event => {
  if (event.target.name === "segmento") {
    const isOther = event.target.dataset.id === "outro";
    document.getElementById("otherSegmentField").classList.toggle("hidden", !isOther);
    form.elements.segmento_outro.required = isOther;
    document.getElementById("segmentError").textContent = "";
  }
  const card = event.target.closest(".question-card");
  if (card) card.classList.remove("invalid");
  if (event.target.name === "aceite_contato") event.target.closest(".privacy-check").classList.remove("invalid");
});

document.querySelectorAll(".next-btn").forEach(button => button.addEventListener("click", () => {
  if (validateStep(currentStep)) showStep(currentStep + 1);
}));
document.querySelectorAll(".back-btn").forEach(button => button.addEventListener("click", () => showStep(currentStep - 1)));

form.addEventListener("submit", event => {
  event.preventDefault();
  if (!validateStep(3)) return;
  const submitButton = form.querySelector(".submit-btn");
  submitButton.disabled = true;
  submitButton.textContent = "Gerando análise...";
  lastResult = buildResult();
  runAnalysis(lastResult);
});

form.elements.telefone.addEventListener("input", event => {
  const digits = event.target.value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 10) event.target.value = digits.replace(/(\d{2})(\d{0,4})(\d{0,4})/, (_, area, first, last) => `(${area}) ${first}${last ? `-${last}` : ""}`);
  else event.target.value = digits.replace(/(\d{2})(\d{0,5})(\d{0,4})/, (_, area, first, last) => `(${area}) ${first}${last ? `-${last}` : ""}`);
});

document.getElementById("restartBtn").addEventListener("click", () => {
  form.reset();
  selectedSegment = null;
  lastResult = null;
  form.querySelector(".submit-btn").disabled = false;
  form.querySelector(".submit-btn").innerHTML = 'Gerar meu diagnóstico <span>→</span>';
  document.getElementById("otherSegmentField").classList.add("hidden");
  resultScreen.classList.add("hidden");
  form.classList.remove("hidden");
  progressWrap.classList.remove("hidden");
  document.querySelectorAll("#analysisList > div").forEach(item => item.className = "");
  showStep(0);
});

renderSegments();
renderUniversalQuestions();
updateProgress();
