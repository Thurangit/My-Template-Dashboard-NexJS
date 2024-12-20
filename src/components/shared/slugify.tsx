export default function slugify(text: string) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
      .replace(/[^a-z0-9-]/g, '')
      .trim();
  }

  // Fonction pour trouver une clé par sa valeur
const findKeyByValue = (object: Record<string, string>, value: string): string | undefined => {
    return Object.keys(object).find((key) => object[key] === value);
  };
  
  // Fonction pour traduire un slug
  export const translateSlug = (slug: string, fromLocale: string, toLocale: string, translations: Record<string, any>): string => {
    const fromTranslations = translations[fromLocale];
    const toTranslations = translations[toLocale];
  
    const key = findKeyByValue(fromTranslations, slug);
    if (key && toTranslations[key]) {
      return toTranslations[key].toLowerCase().replace(/\s+/g, '-'); // Slugify
    }
    return slug; // Retourne le slug d'origine si aucune traduction trouvée
  };

  export const generateSlug = (labelOrSlug: string, locale: string, translations: Record<string, any>): string => {
    const currentTranslations = translations[locale];
  
    // 1. Trouver la clé correspondant au label ou slug actuel
    const key = Object.keys(currentTranslations).find((key) => {
      const translatedLabel = currentTranslations[key];
      const slugifiedLabel = translatedLabel.toLowerCase().replace(/\s+/g, '-'); // Slugify
      return translatedLabel === labelOrSlug || slugifiedLabel === labelOrSlug;
    });
  
    // 2. Si une clé est trouvée, générer le slug pour la langue demandée
    if (key) {
      const translatedLabel = currentTranslations[key];
      return translatedLabel.toLowerCase().replace(/\s+/g, '-'); // Slugify
    }
  
    // 3. Fallback : slugifier directement le texte fourni
    return labelOrSlug.toLowerCase().replace(/\s+/g, '-');
  };