export const hasRole = (role: any, label: string) => role.some((role: any) => role.label === label);

export const generateRole = (getAllRole: any) => {
  return {
    gestionnaire: hasRole(getAllRole, "GESTIONNAIRE_DECAISSEMENT"),
    oper: hasRole(getAllRole, "OPERATEUR"),
    dils: hasRole(getAllRole, "DILS"),
    superu: hasRole(getAllRole, "Administrateur"),
    cdo: hasRole(getAllRole, "CDO"),
    com: hasRole(getAllRole, "COM"),
    treso: hasRole(getAllRole, "TRESO"),
    suivibonprovisoire: hasRole(getAllRole, "SUIVI_BON_PROVISOIRE"),

  };
};