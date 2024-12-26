const { checkAccess } = require('../services/accessPermissionService'); 

describe('Access Permission Tests', () => {
    let adminUser;
    let regularUser;
    let resource;

    beforeAll(() => {
        // Usuários de exemplo
        adminUser = { id: 1, name: 'Admin User', role: 'admin' };
        regularUser = { id: 2, name: 'Regular User', role: 'user' };

        // Recurso com permissões específicas
        resource = { id: 1, name: 'Sensitive Data', requiredRole: 'admin' };
    });

    test('admin should have access to any resource', () => {
        const hasAccess = checkAccess(adminUser, resource);
        expect(hasAccess).toBe(true); // O admin sempre tem acesso
    });

    test('regular user should not have access to restricted resource', () => {
        const hasAccess = checkAccess(regularUser, resource);
        expect(hasAccess).toBe(false); // Usuário regular não tem acesso ao recurso restrito
    });

    test('regular user should have access to public resource', () => {
        // Recurso sem restrição de acesso
        const publicResource = { id: 2, name: 'Public Data' };

        const hasAccess = checkAccess(regularUser, publicResource);
        expect(hasAccess).toBe(true); // Usuário regular tem acesso a recursos públicos
    });
});
