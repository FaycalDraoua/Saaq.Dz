console.log("Formulaire chargé");

/* Récupération des éléments du formulaire */
 form = document.getElementById("formulaire");
 genre = document.getElementById("genre");
 dateNaissance = document.getElementById("date-naissance");
 valeurAchat = document.getElementById("valeur-achat");
 dateFabrication = document.getElementById("date-fabrication");
 kilometrage = document.getElementById("kilometrage");
 avecCamera = document.getElementById("camera-recul-oui");
 sansCamera = document.getElementById("camera-recul-non");
 avecReclamation = document.getElementById("reclamation-oui");
 sansReclamation = document.getElementById("reclamation-non");
 nombreReclamation = document.getElementById("nombre-reclamation");
 montantReclamation = document.getElementById("montant-reclamation");



/* Récupère les données du formulaire et les retourne sous forme d'objet */
function donneesFormulaire() {
    let data = {
        genre: genre.value,
        dateNaissance: dateNaissance.value,
        valeurAchat: valeurAchat.value,
        dateFabrication: dateFabrication.value,
        kilometrage: kilometrage.value,
        avecCamera: avecCamera.checked,
        sansCamera: sansCamera.checked,
        avecReclamation: avecReclamation.checked,
        sansReclamation: sansReclamation.checked,
        nombreReclamation: nombreReclamation.value,
        montantReclamation: montantReclamation.value
    };
    return data;
}

/* validation du genre */
function validateGenre() {
  const ok = donneesFormulaire().genre !== "";
  if (!ok) {
    document.getElementById("genre-error").textContent = "Veuillez sélectionner un genre.";
  } else {
    document.getElementById("genre-error").textContent = "";
  }
}
genre.addEventListener("blur", validateGenre);

/* validation de la date de naissance */
function validateDateNaissance() {
 const ok = donneesFormulaire().dateNaissance !== "";
    if (!ok) {  
        document.getElementById("date-naissance-error").textContent = "Veuillez entrer une date de naissance.";
    } else {
        document.getElementById("date-naissance-error").textContent = "";  
    }
}
dateNaissance.addEventListener("blur", validateDateNaissance);

/* validation de la valeur d'achat */
function validateValeurAchat() {
    const valeur = parseFloat(valeurAchat.value);
    if (Number.isNaN(valeur)) {
        document.getElementById("valeur-achat-error").textContent = "Veuillez entrer une valeur d'achat valide.";
    } else if (valeur <= 0) {
        document.getElementById("valeur-achat-error").textContent = "La valeur d'achat doit être un nombre positif.";
        valeurAchat.value = "";
    } else {
        document.getElementById("valeur-achat-error").textContent = "";
    }
}
valeurAchat.addEventListener("blur", validateValeurAchat);

/* validation de la date de fabrication */
function validateDateFabrication() {
    const annee = parseInt(dateFabrication.value);
    if (Number.isNaN(annee) || annee < 1900 || annee > new Date().getFullYear()) {
        document.getElementById("date-fabrication-error").textContent = "Veuillez entrer une date de fabrication valide.";
        dateFabrication.value = "";
    } else {
        document.getElementById("date-fabrication-error").textContent = "";
    }
}
dateFabrication.addEventListener("blur", validateDateFabrication);

/* validation du kilométrage */
function validateKilometrage() {
    const kilometrageValue = parseFloat(kilometrage.value);
    if (Number.isNaN(kilometrageValue)) {
        document.getElementById("kilometrage-error").textContent = "Veuillez entrer un kilométrage valide.";
    } else if (kilometrageValue < 0) {
        document.getElementById("kilometrage-error").textContent = "Le kilométrage ne peut pas être négatif.";
        kilometrage.value = "";
    } else {
        document.getElementById("kilometrage-error").textContent = "";
    }   
}
kilometrage.addEventListener("blur", validateKilometrage);

/* gestion de la visibilité du champ nombre de réclamations */
function visibilityNombreReclamation() {
    const container = document.getElementById("nombre-reclamation-container");
    if (donneesFormulaire().avecReclamation) {
        container.removeAttribute("hidden");
    } else {
        container.setAttribute("hidden", "true");
        nombreReclamation.value = "";
    }
}
avecReclamation.addEventListener("change", visibilityNombreReclamation);
sansReclamation.addEventListener("change", visibilityNombreReclamation);

/* validation du nombre de réclamations */
function validateNombreReclamation() {
    const nombre = parseFloat(nombreReclamation.value);
    let ok = true;
    if (Number.isNaN(nombre)) {
        document.getElementById("nombre-reclamation-error").textContent = "Veuillez entrer un nombre de réclamations valide.";
        ok = false;
    } else if (nombre < 0) {
        document.getElementById("nombre-reclamation-error").textContent = "Le nombre de réclamations ne peut pas être négatif.";
        nombreReclamation.value = "";
        ok = false;
    } else {
        document.getElementById("nombre-reclamation-error").textContent = "";
    }
    return ok;
}
nombreReclamation.addEventListener("blur", validateNombreReclamation);

/* gestion de la visibilité du champ montant de réclamation */
function visibilityMontantReclamation() {
    const container = document.getElementById("montant-reclamation-container");
    if (donneesFormulaire().nombreReclamation > 0) {
        container.removeAttribute("hidden");
    } else {
        container.setAttribute("hidden", "true");
        montantReclamation.value = "";
    }
}
avecReclamation.addEventListener("change", visibilityMontantReclamation);
sansReclamation.addEventListener("change", visibilityMontantReclamation);

/* validation du montant de réclamation */
function validateMontantReclamation() {
    const montant = parseFloat(montantReclamation.value);
    let ok = true;
    if (Number.isNaN(montant)) {
        document.getElementById("montant-reclamation-error").textContent = "Veuillez entrer un montant de réclamation valide.";
        ok = false;
    } else if (montant < 0) {
        document.getElementById("montant-reclamation-error").textContent = "Le montant de réclamation ne peut pas être négatif.";
        montantReclamation.value = "";
        ok = false;
    } else {
        document.getElementById("montant-reclamation-error").textContent = "";
    }
    return ok;
}
montantReclamation.addEventListener("blur", validateMontantReclamation);

const labelMontant       = document.getElementById("montant-reclamation-label");
const errMontant         = document.getElementById("montant-reclamation-error");
const contMontant        = document.getElementById("montant-reclamation-container");

// État de la séquence
let nbReclamations = 0;   // nombre total à saisir
let etape = 0;            // réclamation courante (0..nbReclamations-1)
let total = 0;            // cumul des montants
let montants = [];        // liste des montants saisis

/*  Démarrer la saisie des montants après validation du NOMBRE  */
/* Appelée quand l'utilisateur a saisi un "nombre de réclamations" valide */
function demarrerSaisieMontants(n) {
  nbReclamations = n;
  etape = 0;
  total = 0;
  montants = [];

  contMontant.removeAttribute("hidden");
  errMontant.textContent = "";

  montantReclamation.disabled = false;
  montantReclamation.value = "";

  majLabelMontant();              // Pour la réclamation numéro 1
  montantReclamation.focus();
}

/*  Réinitialiser la zone montants  */
function resetSaisieMontants(hide = false) {
  nbReclamations = 0;
  etape = 0;
  total = 0;
  montants = [];

  errMontant.textContent = "";
  labelMontant.textContent = "";
  montantReclamation.value = "";
  montantReclamation.disabled = true;

  if (hide) contMontant.setAttribute("hidden", "true");
}

/*  Mettre à jour le libellé selon l’étape courante  */
function majLabelMontant() {
  if (etape < nbReclamations) {
    labelMontant.textContent =
      "Pour la réclamation #" + (etape + 1) + ", quel montant avez-vous réclamé ?";
  } else {
    // Fin de saisie
    labelMontant.textContent =
      "Saisie terminée. Montant total réclamé : " + total.toFixed(2) + " $";
  }
}

/*  Traiter le montant courant  */
function traiterMontantCourant() {
  // Si on a déjà tout saisi, on ne fait rien
  if (etape >= nbReclamations || nbReclamations === 0) return;

  const ok = validateMontantReclamation();
  if (!ok) return; // Montant invalide, on reste sur la même étape

  const m = parseFloat(montantReclamation.value);
  total += m;
  montants.push(m);
  etape++;

  if (etape < nbReclamations) {
    montantReclamation.value = "";
    majLabelMontant();
    montantReclamation.focus();
  } else {
    montantReclamation.value = "";
    montantReclamation.disabled = true;
    majLabelMontant();

  }
}

/* ----- Branchements d'événements ----- */

// Quand l'utilisateur QUITTE le champ nombre :

nombreReclamation.addEventListener("blur", () => {
  const ok = validateNombreReclamation(); 
  if (ok) {
    const n = parseInt(nombreReclamation.value);
    demarrerSaisieMontants(n);
  } else {
    resetSaisieMontants(true);
  }
});

montantReclamation.addEventListener("blur", traiterMontantCourant);
montantReclamation.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    traiterMontantCourant();
  }
});


form.addEventListener("submit", function (event) {
    event.preventDefault(); 

    let data = donneesFormulaire();
    console.log("Formulaire chargé 2.0");
    console.log(data);
});
