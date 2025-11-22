
const ROLES = Object.freeze({
    RECEPTIONISTE: 'receptionniste',
    IT: 'technicien',
    SECURITE: 'securite',
    MANAGER: 'manager',
    NETTOYAGE: 'nettoyage',
    AUTRES: 'Autres',
})

const defaultZones = [
        {
            name: "Salle de conférence",
            allowedRoles: [ROLES.MANAGER,ROLES.RECEPTIONISTE, ROLES.IT, ROLES.SECURITE, ROLES.NETTOYAGE, ROLES.AUTRES],
            capacity: 10,
            required: false,
            icon: 'fa-people-group',
            members: []
        },
        {
            name: "Salle des serveurs",
            allowedRoles: [ROLES.MANAGER,ROLES.IT, ROLES.NETTOYAGE],
            capacity: 4,
            required: true,
            icon: 'fa-server',
             members: []
        },
        {
            name: "Salle de sécurité",
            allowedRoles: [ROLES.MANAGER,ROLES.SECURITE, ROLES.NETTOYAGE],
            capacity: 5,
            required: true,
            icon: 'fa-user-shield',
             members: []
        },
        {
            name: "Salle de réception",
            allowedRoles: [ROLES.MANAGER,ROLES.RECEPTIONISTE, ROLES.NETTOYAGE],
            capacity: 3,
            required: true,
            icon: 'fa-bell-concierge',
            members: []
        },
        {
            name: "Salle du personnel",
            allowedRoles: [ROLES.MANAGER,ROLES.RECEPTIONISTE, ROLES.IT, ROLES.SECURITE, ROLES.NETTOYAGE, ROLES.AUTRES],
            capacity: 10,
            required: false,
            icon: 'fa-person',
             members: []
        },
        {
            // Nettoyage n'est PAS autorisé
            name: "Salle d’archives",
            allowedRoles: [ROLES.MANAGER,ROLES.RECEPTIONISTE, ROLES.IT, ROLES.SECURITE],
            capacity: 6,
            required: true,
            icon: 'fa-box-archive',
             members: []
        },
    ];

export default defaultZones;