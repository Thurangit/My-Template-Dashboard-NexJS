
import { URL_API } from "@/utils/environment";
let token: string | null = null; // Initialiser le token à null

if (typeof window !== 'undefined') {
  // Vérifier si le code est exécuté côté client
  token = sessionStorage.getItem('token');
}
if (token && token.startsWith('"') && token.endsWith('"')) {
  token = token.slice(1, -1);
}

export const headers = {
  'accept': '*/*',
  // "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  'Content-Type': 'application/json',
  Authorization: token ? `Bearer ${token}` : '' // Utiliser le token uniquement s'il est défini
};
// headers.js
export const generateHeaders = () => {
  let token = sessionStorage.getItem('token');
  if (token && token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1);
  }

  return {
    'accept': '*/*',
    // "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : ''
  };
};

export const env = {
  TIERS_IRIS: "NZ004627",
  COMPTE_OHADA: "401100",//si le champ BON PROVISOIRE est à non
  COMPTE_OHADA_ENG: "421100" //si le champ BON PROVISOIRE est à oui
}
const settings = {
  baseUrl: "https://localhost:7228",
API_URL: "https://starter-aglcm.btl.bollore.com:7900",
  SERVICE_URL: `${URL_API}/operationalorganisation/Services`,
  SECTION_URL: `${URL_API}/operationalorganisation/Sections`,
  DEPARTMENT_URL:`${URL_API}/operationalorganisation/departement`,
  SECTIONDEPARTMENT_URL:`${URL_API}/operationalorganisation/sectiondepartement`,
  PAYMENT_URL: `${URL_API}/payment/ExpensesNatures`,
  CAISSE_URL: `${URL_API}/payment/Cashiers`,
  BANQUE_URL: `${URL_API}/payment/Banks`,
  TYPE_JUSTIFICATIF_URL: `${URL_API}/payment/ProofDocumentsTypes`,
  DOCUMENT_NATURE_URL: `${URL_API}/payment/ProofDocumentsNatures`,
  IMPORT_DELIVERY_NOTE_FILES_URL: `${URL_API}/importations/deliverynotefiles`,
  IMPORT_SPOT_FILES_URL: `${URL_API}/importations/spotfiles`,
  IMPORT_CONTAINER_URL: `${URL_API}/importations/containers`,
  IMPORT_CREDIT_NOTE_URL: `${URL_API}/importations/creditnotes`,
  IMPORT_PURCHASE_INVOICE: `${URL_API}/importations/purchaseinvoices`,
  IMPORT_SALES_INVOICE: `${URL_API}/importations/salesinvoices`,
  IMPORT_GROSS_MARGING_RUBRIC: `${URL_API}/importations/grossmarginrubrics`,
  IMPORT_RUBRIC_SPOT: `${URL_API}/importations/spotrubric`,
  GRILLE_TARIFAIRE_URL: `${URL_API}/pricinggrid`,
  PARAMETRAGE_URL: `${URL_API}/pricinggrid/pricingUnit`,
  RUBRIQUE_REJETE_URL: `${URL_API}/pricinggrid/pricinggridfile`,
  ETAT_URL: `${URL_API}/workflow/state`,
  TRANSITION_URL: `${URL_API}/workflow/transition`,
  WORKFLOW_URL: `${URL_API}/workflow`,
  USER_URL: `${URL_API}/user`,
  ACCESS_URL: `${URL_API}/accessandprivileges`,
  USER_ROLE_URL: `${URL_API}/accessandprivileges/usersroles`,
  ROLE_URL: `${URL_API}/accessandprivileges/roles`,
  ROLE_PRIVILEGE_URL: `${URL_API}/accessandprivileges/rolePrivilege`,
  DELEGATION_URL: `${URL_API}/accessandprivileges/delegation`,
  FICHES_URL: `${URL_API}/accessandprivileges/delegation`,
  COMPANY_URL: `${URL_API}/operationalorganisation/Companies/Search`,
  PIECE_URL: `${URL_API}/DisbursementTokenManagement`,
  JUSTIFICATIF_URL: `${URL_API}/DisbursementTokenManagement/proofdocument`,
  MENU_URL:  `${URL_API}/Routing/menu`,
  SUBMENU_URL:  `${URL_API}/Routing/submenu`,

  ///////
  NOTIFICATIONS_URL: `${URL_API}/Link`

  


};
export default settings;

