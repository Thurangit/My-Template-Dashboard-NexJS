import { Box } from "@mui/material";
import API from "@/redux/API";
import settings from "@/redux/config";
import { URL_API } from "@/utils/environment";

export const Actif = [
  {
    value: '',
    label: 'Tous',
  },
  {
    value: 'true',
    label: 'Actif',
  },
  {
    value: 'false',
    label: 'Inactif',
  },
]

export const OptionsBoolean = [
  {
    value: 'true',
    label: 'Oui',
  },
  {
    value: 'false',
    label: 'Non',
  },
]
export const OptionsBooleanLabel = [
  {
    value: 'true',
    label: 'Actif',
  },
  {
    value: 'false',
    label: 'Inactif',
  },
]
export const ObjectType = [
  {
    value: 'Piece de caisse',
    label: 'Piece de caisse',
  },
]
export const OptionsBoolean1 = [
  {
    value: "",
    label: 'Aucun choix',
  },
  {
    value: 'true',
    label: 'Oui',
  },
  {
    value: 'false',
    label: 'Non',
  },
]
export const OptionsB = [
  {
    value: 'true',
    label: 'Oui',
  },
  {
    value: 'false',
    label: 'Non',
  },
]

export const OperationServiceValue = [
  {
    value: 'CSP DOUANE',
    label: 'CSP DOUANE',
  },
  {
    value: 'SUSPENSIFS',
    label: 'SUSPENSIFS',
  },
  {
    value: 'CAUTIONS',
    label: 'CAUTIONS',
  },
]

export const optionStatus = [
  {value:'DRAFT'}, 
  {value:'EN COURS'}, 
  {value:'TERMINE'}, 
  {value:'ANNULE'}, 
  {value:'REJETE'}, 
  {value:'ANNU_ASPOT'}, 
  {value:'RTR_CAISSE'}
]
export const optionState = [
 {value:'CLOSE'}, 
 {value:'FIN'}, 
 {value:'CITI'}, 
 {value:'CAISS'}
]

export const styleModalTitle = {
  mb: 2,
  p: 2,
  backgroundColor: '#1b365f',
  color: '#ffffff'
};

export const styleDiv = {
  color: '#FF1943',
  fontSize: 13,
  marginLeft: 7,
  fontWeight: "bold",
  paddingTop: 5
};


export function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}


export const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export const exportBlob = (blob:any, filename:string) => {
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  });
};

export const getDefaultCompany = async () => {
  try {
    const response = await API.get(`${URL_API}/operationalorganisation/Companies/1`);
    return response.data; // Retourne la société avec l'ID 1
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getDefaultRole = async () => {
  try {
    const response = await API.get(`${settings.ROLE_URL}/2`);
    console.log("Role par défaut :", response.data);
    return response.data; // Retourne la société avec l'ID 1

  } catch (error) {
    console.log(error);
    return null;
  }
};

export const validateCniNumber = (cniNumber:any) => {
  const currentYear = new Date().getFullYear().toString();
  const isValidLength = cniNumber.length === 9 || cniNumber.length === 17;
  const year = parseInt(cniNumber.substring(0, 4));
  const isValidYear = year >= 2017 && year <= parseInt(currentYear);
  return isValidLength && isValidYear;
};


export const disabledBtnStyle = {
  background: ' rgb(237, 239, 243)',//'#edeff3'
  borderRadius: 1,
}


// Fonction pour dédupliquer les options
export const getUniqueOptions = (options:any, key:any) => {
  const seen = new Set();
  return options.filter((option:any) => {
    const duplicate = seen.has(option[key]);
    seen.add(option[key]);
    return !duplicate;
  });
};

// Fonction pour dédupliquer les options
// export const getUniqueOptionsTextField = (options) => {
//   const seen = new Set();
//   return options.filter(option => {
//     const duplicate = seen.has(option.rubricCode);
//     seen.add(option.rubricCode);
//     return !duplicate;
//   });
// };
