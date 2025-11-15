console.log("Formulaire chargé");

/* Récupération des éléments du formulaire */
 const form = document.getElementById("formulaire");
 const genre = document.getElementById("genre");
 const dateNaissance = document.getElementById("date-naissance");
 const valeurAchat = document.getElementById("valeur-achat");
 const dateFabrication = document.getElementById("date-fabrication");
 const kilometrage = document.getElementById("kilometrage");
 const avecCamera = document.getElementById("camera-recul-oui");
 const sansCamera = document.getElementById("camera-recul-non");
 const avecReclamation = document.getElementById("reclamation-oui");
 const sansReclamation = document.getElementById("reclamation-non");
 const nombreReclamation = document.getElementById("nombre-reclamation");
 const montantReclamation = document.getElementById("montant-reclamation");



/* 
 * Récupère les données du formulaire et les retourne sous forme d'objet 
 * @return {object} données du formulaire
 */
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

/* réinitialise les messages d'erreur */
function resetErrors() {
    document.getElementById("genre-error").textContent = "";
    document.getElementById("date-naissance-error").textContent = "";
    document.getElementById("valeur-achat-error").textContent = "";
    document.getElementById("date-fabrication-error").textContent = "";
    document.getElementById("kilometrage-error").textContent = "";
    document.getElementById("nombre-reclamation-error").textContent = "";
    document.getElementById("montant-reclamation-error").textContent = "";
    document.getElementById("camera-recul-error").textContent = "";
    document.getElementById("reclamation-error").textContent = "";
}

/* 
 * validation complète du formulaire
 * @return {boolean} true si le formulaire est valide, false sinon
 */
function validerFormulaire() {
    resetErrors();
    return formulaireEstValide();
}

/* 
 * validation complète du formulaire
 * @return {boolean} true si le formulaire est valide, false sinon
 */
function formulaireEstValide() {
    const okGenre = validateGenre();
    const okDateNaissance = validateDateNaissance();
    const okValeurAchat = validateValeurAchat();
    const okDateFabrication = validateDateFabrication();
    const okKilometrage = validateKilometrage();
    const okCameraRecule = validateCameraRecule();
    const okReclamation = validateReclamation();
    return okGenre && okDateNaissance && okValeurAchat && okDateFabrication && okKilometrage && okCameraRecule && okReclamation;
}

/* réinitialise le formulaire */
function reinitialiserFormulaire() {
    form.reset();
    resetErrors();
}

/*
 * calcul de l'âge à partir de la date de naissance
 * @return {number} age
 */
function calculAge() {
    const dateDeNaissance = donneesFormulaire().dateNaissance;
    const annee = parseInt(dateDeNaissance.substring(0, 4));
    const age = new Date().getFullYear() - annee;
    return age;
}

/* 
 * calcul de l'âge du véhicule à partir de la date de fabrication 
 * @return {number} ageVehicule
 */
function ageVehicule() {
    const data = donneesFormulaire();
    const dateFabrication = parseInt(data.dateFabrication);
    const ageVehicule = new Date().getFullYear() - dateFabrication;
    return ageVehicule;
}

/*
 * vérification des cas non assurés
 * @return {boolean} true si le formulaire correspond à un cas non assuré, false sinon
 */
function casNonAssures() {
    const data = donneesFormulaire();
    const age = calculAge();
    const ageVehiculeValue = ageVehicule();
    const valeurAchatValue = parseFloat(data.valeurAchat);
    const nombreReclamationValue = parseInt(data.nombreReclamation);
    const montantReclamationTotalValue = parseFloat(total);
    const kilometrageValue = parseFloat(data.kilometrage);
    const cameraRecule = Boolean(data.avecCamera);

    if (data.genre === "homme" && age < 18) {
        return true;
    }
    if (data.genre === "femme" && age < 16 ) {
        return true;
    }
    if (data.genre === "non-binaire" && age < 18 ) {
        return true;
    }
    if (age >= 100 ) {
        return true;
    }
    if (ageVehiculeValue > 25 ) {
        return true;
    }
    if (valeurAchatValue > 1000000 ) {
        return true;
    }
    if (nombreReclamationValue > 4 ) {
        return true;
    }
    if (montantReclamationTotalValue > 35000 ) {
        return true;
    }
    if (kilometrageValue > 50000 ) {
        return true;
    }
    if (!cameraRecule) {
        return true;
    }
    return false;
}

/*
 * validation du genre
 * @return {boolean} true si le genre est valide, false sinon
 */
function validateGenre() {
  const ok = donneesFormulaire().genre !== "";
  if (!ok) {
    document.getElementById("genre-error").textContent = "Veuillez sélectionner un genre.";
  } else {
    document.getElementById("genre-error").textContent = "";
  }
    return ok;
}
genre.addEventListener("blur", validateGenre);

/* 
 * validation de la date de naissance 
 * @return {boolean} true si la date de naissance est valide, false sinon
 */
function validateDateNaissance() {
 const ok = donneesFormulaire().dateNaissance !== "";
    if (!ok) {  
        document.getElementById("date-naissance-error").textContent = "Veuillez entrer une date de naissance.";
    } else {
        document.getElementById("date-naissance-error").textContent = "";  
    }
    return ok;
}
dateNaissance.addEventListener("blur", validateDateNaissance);

/* 
 * validation de la valeur d'achat
 * @return {boolean} true si la valeur d'achat est valide, false sinon
 */
function validateValeurAchat() {
    const valeur = parseFloat(donneesFormulaire().valeurAchat);
    if (Number.isNaN(valeur)) {
        document.getElementById("valeur-achat-error").textContent = "Veuillez entrer une valeur d'achat valide.";
    } else if (valeur <= 0) {
        document.getElementById("valeur-achat-error").textContent = "La valeur d'achat doit être un nombre positif.";
        valeurAchat.value = "";
    } else {
        document.getElementById("valeur-achat-error").textContent = "";
    }
    return !Number.isNaN(valeur) && valeur > 0;
}
valeurAchat.addEventListener("blur", validateValeurAchat);

/*
 * validation de la date de fabrication
 * @return {boolean} true si la date de fabrication est valide, false sinon
 */
function validateDateFabrication() {
    const annee = parseInt(dateFabrication.value);
    if (Number.isNaN(annee) || annee < 1900 || annee > new Date().getFullYear()) {
        document.getElementById("date-fabrication-error").textContent = "Veuillez entrer une date de fabrication valide.";
        dateFabrication.value = "";
    } else {
        document.getElementById("date-fabrication-error").textContent = "";
    }
    return !Number.isNaN(annee) && annee >= 1900 && annee <= new Date().getFullYear();
}
dateFabrication.addEventListener("blur", validateDateFabrication);

/* 
 * validation du kilométrage
 * @return {boolean} true si le kilométrage est valide, false sinon
 */
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
    return !Number.isNaN(kilometrageValue) && kilometrageValue >= 0;
}
kilometrage.addEventListener("blur", validateKilometrage);

function validateCameraRecule() {
  const data = donneesFormulaire();
  const ok = data.avecCamera || data.sansCamera; 
  if (!ok) {
    document.getElementById("camera-recul-error").textContent = "Veuillez sélectionner une option pour la caméra de recul.";
  } else {
    document.getElementById("camera-recul-error").textContent = "";
  }
  return ok;
}

avecCamera.addEventListener("change", validateCameraRecule);
sansCamera.addEventListener("change", validateCameraRecule);

/* 
 * validation des réclamations
 * @return {boolean} true si les réclamations sont valides, false sinon
 */
function validateReclamation() {
    const data = donneesFormulaire();
    const ok = data.avecReclamation || data.sansReclamation;
    if (!ok) {
        document.getElementById("reclamation-error").textContent = "Veuillez sélectionner une option pour les réclamations.";
    } else {
        document.getElementById("reclamation-error").textContent = "";
    }
    return ok;
}
avecReclamation.addEventListener("change", validateReclamation);
sansReclamation.addEventListener("change", validateReclamation);

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

/* 
 * validation du nombre de réclamations 
 * @return {boolean} true si le nombre de réclamations est valide, false sinon
 */
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

/*
 * validation du montant de réclamation
 * @return {boolean} true si le montant de réclamation est valide, false sinon
 */
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

/* ----- Gestion de la saisie des montants des réclamations ----- */

// Éléments HTML
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

  if (hide) {
    contMontant.setAttribute("hidden", "true");
  }
}

/*  Mettre à jour le libellé selon l’étape courante  */
function majLabelMontant() {
  if (etape < nbReclamations) {
    labelMontant.textContent =
      "Pour la réclamation #" + (etape + 1) + ", quel montant avez-vous réclamé ?";
  } else {
    // Fin de saisie
    labelMontant.textContent =
      "Montant total réclamé : " + total.toFixed(2) + " $";
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

/* 
 * règle de calcul du montant de base
 * @return {number} montant de base calculé   
 */
function calculMontantDeBase() {
     const valeurAchat = parseFloat(donneesFormulaire().valeurAchat);
     const genre = donneesFormulaire().genre;
     const age = calculAge();

     if ( !(age >= 75)) {
        if ((genre === "homme" || genre === "non-binaire") && age < 25) {
            return valeurAchat * 0.05;       
        }else {
            return valeurAchat * 0.015;
        }
     }else {
        return valeurAchat * 0.04;
     }
}

/*
 * calcul du montant de l'assurance annuelle
 * @return {number} montant de l'assurance annuelle
 */
function calculMontantAssuranceAnnuelle() {
    let montantBase = calculMontantDeBase();
    let nombreReclamations = parseInt(donneesFormulaire().nombreReclamation);
    let kilometrage = parseFloat(donneesFormulaire().kilometrage);
    let totalMontantsReclamations = parseFloat(total);
    let assuranceAnnuelle = montantBase + (350 * nombreReclamations) + (0.02 * kilometrage);

    if (totalMontantsReclamations > 25000) {
        assuranceAnnuelle += 700;
    }
    return assuranceAnnuelle;
}



/* ----- Branchements d'événements ----- */

// Quand l'utilisateur QUITTE le champ nombre :
nombreReclamation.addEventListener("blur", function() {
  const ok = validateNombreReclamation(); 
  if (ok) {
    const n = parseInt(nombreReclamation.value);
    demarrerSaisieMontants(n);
  } else {
    resetSaisieMontants(true);
  }
});

// Quand l'utilisateur QUITTE le champ montant ou appuie sur Entrée :
montantReclamation.addEventListener("blur", traiterMontantCourant);
montantReclamation.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    traiterMontantCourant();
  }
});

/* gestion de la soumission du formulaire */
form.addEventListener("submit", function (event) {
    event.preventDefault(); 

    if (!validerFormulaire()) {
        alert("Le formulaire contient des erreurs. Veuillez les corriger avant de soumettre.");
        return;
    }
    if (casNonAssures()) {
        alert("Désolé, vous ne pouvez pas être assuré en raison de critères non assurables.");
    }else { 
        alert("Félicitations! Votre formulaire a été soumis avec succès." +
              "\nMontant de l'assurance annuelle : " + calculMontantAssuranceAnnuelle().toFixed(2) + " $");
    }
    reinitialiserFormulaire();

    console.log(calculAge());
    console.log(ageVehicule());

    let data = donneesFormulaire();
    console.log("Formulaire chargé 2.0");
    console.log(data);

});
