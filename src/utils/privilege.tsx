import { useAuthe } from './protectedRoute';

type PrivilegeActionButtonProps = {
    lecture?: boolean; // Indique si "lecture" est un privilège activé
    ecriture?: boolean; // Indique si "écriture" est un privilège activé
    modification?: boolean; // Indique si "modification" est un privilège activé
    suppression?: boolean; // Indique si "suppression" est un privilège activé
    children?: any; // Contenu enfant à afficher dans le bouton
  };
  
// Définissez le composant PrivilegeComponent
export const PrivilegeActionButton = ({ lecture, ecriture,modification, suppression, children }: PrivilegeActionButtonProps) => {
    // Obtenez tous les privilèges (assumant que vous avez une fonction nommée getAllPrivileges)
    const { getAllPrivileges } = useAuthe();

    // Vérifiez si l'étiquette est incluse dans la liste des privilèges
    const shouldDisplay = !getAllPrivileges.some((privilege: any) => privilege.label === lecture ||
        privilege.label === ecriture || privilege.label === modification ||  privilege.label === suppression 
     );

    console.log('affichage',getAllPrivileges)
    // Retournez le résultat
    return shouldDisplay ? children : null;
}







