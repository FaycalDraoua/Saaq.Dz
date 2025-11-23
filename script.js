
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

    let okNombreReclamation = true;
    let okMontantReclamation = true;

    const data = donneesFormulaire();
    if (data.avecReclamation) {
        okNombreReclamation = validateNombreReclamation();
        okMontantReclamation = ( etape === nbReclamations ); // verifier que l'utilisateur a bien saisi tous les montants
    }

    return okGenre && okDateNaissance && okValeurAchat && okDateFabrication && okKilometrage && okCameraRecule && okReclamation && okNombreReclamation && okMontantReclamation;
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
    const data = donneesFormulaire();
    const dateDeNaissance = data.dateNaissance;
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
    const montantReclamationTotalValue = total;
    const kilometrageValue = parseFloat(data.kilometrage);
    const cameraReculeOui = Boolean(data.avecCamera);
    const cameraReculeNon = Boolean(data.sansCamera);

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
    if (valeurAchatValue > 100000 ) {
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
    if ((cameraReculeOui || cameraReculeNon) && !cameraReculeOui) {
        return true;
    }
    return false;
}

/*
 * Vérifie si le profil est non assurable.
 * Si oui : affiche le message et réinitialise le formulaire.
 */
function verifierCasNonAssuresEtResetSiBesoin() {
    if (casNonAssures()) {

        // Afficher le message de cas non assurés
        afficherEtMasquerMessages("aucun-produit-message");
                
        // Réinitialiser le formulaire et les erreurs
        reinitialiserFormulaire();
        resetSaisieMontants(true);
    }
}

/*
 * validation du genre
 * @return {boolean} true si le genre est valide, false sinon
 */
function validateGenre() {
  const data = donneesFormulaire();
  const ok = data.genre !== "";
  if (!ok) {
    document.getElementById("genre-error").textContent = "Veuillez sélectionner un genre.";
  } else {
    document.getElementById("genre-error").textContent = "";
  }
    return ok;
    return ok;
}
genre.addEventListener("blur", function() {
   if (validateGenre()) {
        verifierCasNonAssuresEtResetSiBesoin();
   }
});

/* 
 * validation de la date de naissance 
 * @return {boolean} true si la date de naissance est valide, false sinon
 */
/* 
 * validation de la date de naissance 
 * @return {boolean} true si la date de naissance est valide, false sinon
 */
function validateDateNaissance() {
    const data = donneesFormulaire();
    const ok = data.dateNaissance !== "";
    if (!ok) {  
        document.getElementById("date-naissance-error").textContent = "Veuillez entrer une date de naissance.";
    } else {
        document.getElementById("date-naissance-error").textContent = "";  
    }
    return ok;
    return ok;
}
dateNaissance.addEventListener("blur", function() {
   if (validateDateNaissance()) {
        verifierCasNonAssuresEtResetSiBesoin();
   }
});

/* 
 * validation de la valeur d'achat
 * @return {boolean} true si la valeur d'achat est valide, false sinon
 */
/* 
 * validation de la valeur d'achat
 * @return {boolean} true si la valeur d'achat est valide, false sinon
 */
function validateValeurAchat() {
    const data = donneesFormulaire();
    const valeur = parseFloat(data.valeurAchat);
    if (Number.isNaN(valeur) ) {
        document.getElementById("valeur-achat-error").textContent = "Veuillez entrer une valeur d'achat valide.";
        valeurAchat.value = "";
    } else if (valeur <= 0 || valeur == 'e') {
        document.getElementById("valeur-achat-error").textContent = "La valeur d'achat doit être un nombre positif.";
        valeurAchat.value = "";
    } else {
        document.getElementById("valeur-achat-error").textContent = "";
    }
    return !Number.isNaN(valeur) && valeur > 0;
    return !Number.isNaN(valeur) && valeur > 0;
}
valeurAchat.addEventListener("blur", function() {
   if (validateValeurAchat()) {
        verifierCasNonAssuresEtResetSiBesoin();
   }
});

/*
 * validation de la date de fabrication
 * @return {boolean} true si la date de fabrication est valide, false sinon
 */
/*
 * validation de la date de fabrication
 * @return {boolean} true si la date de fabrication est valide, false sinon
 */
function validateDateFabrication() {
    const data = donneesFormulaire();   
    const annee = parseInt(data.dateFabrication);
    if (Number.isNaN(annee) || annee < 1900 || annee > new Date().getFullYear()) {
        document.getElementById("date-fabrication-error").textContent = "Veuillez entrer une date de fabrication valide.";
        dateFabrication.value = "";
    } else {
        document.getElementById("date-fabrication-error").textContent = "";
    }
    return !Number.isNaN(annee) && annee >= 1900 && annee <= new Date().getFullYear();
    return !Number.isNaN(annee) && annee >= 1900 && annee <= new Date().getFullYear();
}
dateFabrication.addEventListener("blur", function() {
   if (validateDateFabrication()) {
        verifierCasNonAssuresEtResetSiBesoin();
   }
});

/* 
 * validation du kilométrage
 * @return {boolean} true si le kilométrage est valide, false sinon
 */
/* 
 * validation du kilométrage
 * @return {boolean} true si le kilométrage est valide, false sinon
 */
function validateKilometrage() {
    const data = donneesFormulaire();
    const kilometrageValue = parseFloat(data.kilometrage);
    if (Number.isNaN(kilometrageValue)) {
        document.getElementById("kilometrage-error").textContent = "Veuillez entrer un kilométrage valide.";
        kilometrage.value = "";
    } else if (kilometrageValue < 0) {
        document.getElementById("kilometrage-error").textContent = "Le kilométrage ne peut pas être négatif.";
        kilometrage.value = "";
    } else {
        document.getElementById("kilometrage-error").textContent = "";
    }   
    return !Number.isNaN(kilometrageValue) && kilometrageValue >= 0;
    return !Number.isNaN(kilometrageValue) && kilometrageValue >= 0;
}
kilometrage.addEventListener("blur", function() {
   if (validateKilometrage()) {
        verifierCasNonAssuresEtResetSiBesoin();
   }
});

/* 
 * validation de la caméra de recul
 * @return {boolean} true si la caméra de recul est valide, false sinon
 */
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

avecCamera.addEventListener("change", function() {
   if (validateCameraRecule()) {
        verifierCasNonAssuresEtResetSiBesoin(); //
   }
});
sansCamera.addEventListener("change", function() {
   if (validateCameraRecule()) {
        verifierCasNonAssuresEtResetSiBesoin();
   }
});

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
    const data = donneesFormulaire();
    const container = document.getElementById("nombre-reclamation-container");
    if (data.avecReclamation) {
        container.removeAttribute("hidden");
    } else {
        container.setAttribute("hidden", "true");
        nombreReclamation.value = "";
        resetSaisieMontants(true); // Réinitialiser la saisie des montants si on n'a pas de réclamations
    }
}
avecReclamation.addEventListener("change", visibilityNombreReclamation);
sansReclamation.addEventListener("change", visibilityNombreReclamation);

/* 
 * validation du nombre de réclamations 
 * @return {boolean} true si le nombre de réclamations est valide, false sinon
 */
/* 
 * validation du nombre de réclamations 
 * @return {boolean} true si le nombre de réclamations est valide, false sinon
 */
function validateNombreReclamation() {
    const data = donneesFormulaire();
    const nombre = parseInt(data.nombreReclamation);
    let ok = true;
    if (Number.isNaN(nombre)) {
        document.getElementById("nombre-reclamation-error").textContent = "Veuillez entrer un nombre de réclamations valide.";
        nombreReclamation.value = "";
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

/*
 * validation du montant de réclamation
 * @return {boolean} true si le montant de réclamation est valide, false sinon
 */
function validateMontantReclamation() {
    const data = donneesFormulaire();
    const montant = parseFloat(data.montantReclamation);
    let ok = true;
    if (Number.isNaN(montant)) {
        document.getElementById("montant-reclamation-error").textContent = "Veuillez entrer un montant de réclamation valide.";
        montantReclamation.value = "";
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
  if (hide) {
    contMontant.setAttribute("hidden", "true");
  }
}

/*  Mettre à jour le label selon l’étape courante  */
function majLabelMontant() {
  if (etape < nbReclamations) {
    labelMontant.textContent =
      "Pour la réclamation #" + (etape + 1) + ", quel montant avez-vous réclamé ?";
  } else {
    // Fin de saisie
    labelMontant.textContent =
      "Montant total réclamé : " + total.toFixed(2) + " $";
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

  verifierCasNonAssuresEtResetSiBesoin(); // Vérifier si la somme des montants total > 35000

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
     const data = donneesFormulaire();
     const valeurAchatNum = parseFloat(valeurAchat.value);
     const genre = data.genre;
     const age = calculAge();

     if (age < 75) {
        if ((genre === "homme" || genre === "non-binaire") && age < 25) {
            return valeurAchatNum * 0.05;       
        }else {
            return valeurAchatNum * 0.015;
        }
     }else {
        return valeurAchatNum * 0.04;
     }
}

/*
 * calcul du montant de l'assurance annuelle
 * @return {number} montant de l'assurance annuelle
 */
function calculMontantAssuranceAnnuelle() {
    const data = donneesFormulaire();
    let montantBase = calculMontantDeBase();
    let nombreReclamations = parseInt(data.nombreReclamation) || 0; // par sécurité si l'utilisateur n'a pas saisi de nombre de réclamations
    let kilometrage = parseFloat(data.kilometrage);
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
nombreReclamation.addEventListener("blur", function() {
  const ok = validateNombreReclamation(); 
  if (ok) {
    const n = parseInt(nombreReclamation.value);
    demarrerSaisieMontants(n);
    verifierCasNonAssuresEtResetSiBesoin(); // Vérifier si le nombre de réclamations > 4
  } else {
    resetSaisieMontants(true);
  }
});

// Quand l'utilisateur QUITTE le champ montant ou appuie sur Entrée :
// Quand l'utilisateur QUITTE le champ montant ou appuie sur Entrée :
montantReclamation.addEventListener("blur", traiterMontantCourant);
montantReclamation.addEventListener("keydown", function(e) {
montantReclamation.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    traiterMontantCourant();
  }
});

/* Afficher un message temporaire et le masquer après une durée
 * @param {string} id - l'ID de l'élément HTML à afficher/masquer
 * @param {number} duree - durée en millisecondes avant de masquer l'élément (par défaut 5000ms)
 */
function afficherEtMasquerMessages(id, duree = 5000) {
    const element = document.getElementById(id);
    if (!element) return; // Vérification de l'existence de l'élément

    element.removeAttribute("hidden"); // Afficher l'élément
    setTimeout(() => {
        element.setAttribute("hidden", "true"); // Masquer l'élément après la durée spécifiée (5s)
    }, duree);

}

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

    if (!validerFormulaire()) {
       afficherEtMasquerMessages("error-message-formulaire");
       return;
    }
    if (casNonAssures()) {
        afficherEtMasquerMessages("aucun-produit-message");
     }else { 
        const annuelle = calculMontantAssuranceAnnuelle();
        const mensuelle = annuelle / 12;

        const msg = document.getElementById("reussite-message-formulaire");
        msg.textContent =
          "Formulaire soumis avec succès !\n" +
          "Montant de l'assurance annuelle : " + annuelle.toFixed(2) + " $ \n" +
          "Prime mensuelle : " + mensuelle.toFixed(2) + " $";
        afficherEtMasquerMessages("reussite-message-formulaire", 10000); // Afficher le message de réussite pendant 10 secondes
    }
    
    reinitialiserFormulaire();
});
