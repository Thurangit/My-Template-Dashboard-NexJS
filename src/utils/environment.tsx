var Environment = "Local"; // Change cette valeur selon l'environnement

// Valeurs par défaut (communes à plusieurs environnements)
let URL_API: string, URI_REDIRECTION: string, CLIENT_ID: string, AUTHORITHY : string, SCOPE: any[];

// Configurations spécifiques selon l'environnement
switch (Environment) {
    case "Local":
        URL_API = "https://localhost:7172";
        URI_REDIRECTION = 'https://localhost:3000';
        CLIENT_ID = 'dfce370d-4bfb-444e-ad41-7e50e0b9f12e';
        AUTHORITHY = 'https://login.microsoftonline.com/088e9b00-ffd0-458e-bfa1-acf4c596d3cb';
        //SCOPE = ['api://dfce370d-4bfb-444e-ad41-7e50e0b9f12e/.default'];
        SCOPE = ["openid", "profile", "email"]
        break;

    case "Dev":
        URL_API = "https://10.91.1.100:444";
        URI_REDIRECTION = 'https://10.91.1.100:443';
        CLIENT_ID = 'dfce370d-4bfb-444e-ad41-7e50e0b9f12e';
        AUTHORITHY = 'https://login.microsoftonline.com/088e9b00-ffd0-458e-bfa1-acf4c596d3cb';
        //SCOPE = ['api://dfce370d-4bfb-444e-ad41-7e50e0b9f12e/.default'];
        SCOPE = ["openid", "profile", "email"]
        break;

    case "Test":
        URL_API = "https://10.91.1.144:7091";
        URI_REDIRECTION = 'https://10.91.1.144:453';
        CLIENT_ID = 'dfce370d-4bfb-444e-ad41-7e50e0b9f12e';
        AUTHORITHY = 'https://login.microsoftonline.com/088e9b00-ffd0-458e-bfa1-acf4c596d3cb';
        //SCOPE = ['api://dfce370d-4bfb-444e-ad41-7e50e0b9f12e/.default'];
        SCOPE = ["openid", "profile", "email"]
        break;

    case "UAT":
        URL_API = "https://timoni-test.agl.identity.msc.com:7500"
        URI_REDIRECTION = 'https://timoni-test.agl.identity.msc.com/';
        CLIENT_ID = 'dfce370d-4bfb-444e-ad41-7e50e0b9f12e';
        AUTHORITHY = 'https://login.microsoftonline.com/088e9b00-ffd0-458e-bfa1-acf4c596d3cb';
        //SCOPE = ['api://dfce370d-4bfb-444e-ad41-7e50e0b9f12e/.default'];
        SCOPE = ["openid", "profile", "email"]
        break;

    case "PREPROD":
        URL_API = "https://timoni-pre.agl.identity.msc.com:7500";
        URI_REDIRECTION = 'https://timoni-pre.agl.identity.msc.com';
        CLIENT_ID = '8f513d66-40bd-400e-b9d9-a8648df41b6e';
        AUTHORITHY = 'https://login.microsoftonline.com/088e9b00-ffd0-458e-bfa1-acf4c596d3cb';
        // SCOPE = ['api://8f513d66-40bd-400e-b9d9-a8648df41b6e/.default'];
        SCOPE = ["openid", "profile", "email"]
        break;

    case "PROD":
        URL_API = "https://timoni.agl.identity.msc.com:7500";
        URI_REDIRECTION = 'https://timoni.agl.identity.msc.com';
        CLIENT_ID = 'ed461bae-2781-4882-ac7e-8aca033c70d5';
        AUTHORITHY = 'https://login.microsoftonline.com/088e9b00-ffd0-458e-bfa1-acf4c596d3cb';
        // SCOPE = ['api://ed461bae-2781-4882-ac7e-8aca033c70d5/.default'];
        SCOPE = ["openid", "profile", "email"]
        break;
    case "PC-Michelle":
        URL_API = "https://localhost:7172";
        URI_REDIRECTION = 'https://localhost:3000';
        CLIENT_ID = 'e0ce57b4-59f8-4e40-ae04-49dc45660b47';
        AUTHORITHY = 'https://login.microsoftonline.com/6b89b25f-28fa-4a4c-a830-63ed3394e8b0';
        SCOPE = ['api://e0ce57b4-59f8-4e40-ae04-49dc45660b47/Forecast.Read'];
        //SCOPE = ['api://5abc43b3-4b4b-42fa-84da-f4f1ff693b37/access_as_user'];
        // SCOPE = ["openid", "profile", "email"]
        break;
    
    default:
        console.error("Environnement inconnu");
}

// Exporter les variables pour les utiliser ailleurs dans l'application
export { URL_API, URI_REDIRECTION, CLIENT_ID, AUTHORITHY, SCOPE };
