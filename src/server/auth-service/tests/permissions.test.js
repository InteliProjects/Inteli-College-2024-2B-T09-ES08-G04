const http = require('http');
const createAuthMiddleware = require('./authMiddleware');
const createAuthorizationMiddleware = require('./authorizationMiddleware');

// Mock da função que obtém a chave pública
const mockGetPublicKey = jest.fn(() => Promise.resolve('mocked-public-key'));

// Mock da função que valida o token
const mockVerifyToken = jest.fn((token, publicKey) => {
  if (token === 'valid-token') {
    return { userId: 123, email: 'user@example.com', role: 'admin' };
  } else {
    throw new Error('Invalid token');
  }
});

describe('Authorization Middleware', () => {
  let server;

  beforeAll(() => {
    const authMiddleware = createAuthMiddleware({
      getPublicKey: mockGetPublicKey,
      verifyToken: mockVerifyToken,
    });

    const authorizationMiddleware = createAuthorizationMiddleware('admin'); // Exigindo que o usuário seja 'admin'

    server = http.createServer((req, res) => {
      authMiddleware(req, res, () => {
        authorizationMiddleware(req, res, () => {
          res.statusCode = 200;
          res.end('Document accessed');
        });
      });
    });

    server.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  });

  afterAll(() => {
    server.close();
  });

  it('deve permitir acesso a documentos para usuários admin', (done) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/document',
      method: 'GET',
      headers: {
        Authorization: 'Bearer valid-token',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        expect(res.statusCode).toBe(200);
        expect(data).toBe('Document accessed');
        done();
      });
    });

    req.end();
  });

  it('não deve permitir acesso a documentos para usuários sem permissão', (done) => {
    mockVerifyToken.mockReturnValueOnce({
      userId: 123,
      email: 'user@example.com',
      role: 'viewer', // Usuário não tem a role 'admin'
    });

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/document',
      method: 'GET',
      headers: {
        Authorization: 'Bearer valid-token',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        expect(res.statusCode).toBe(403); // Forbidden
        expect(data).toContain('Forbidden');
        done();
      });
    });

    req.end();
  });

  it('deve rejeitar requisição sem token', (done) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/document',
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        expect(res.statusCode).toBe(401);
        expect(data).toContain('No token provided');
        expect(mockGetPublicKey).not.toHaveBeenCalled(); // Verificar que o mockGetPublicKey não foi chamado
        expect(mockVerifyToken).not.toHaveBeenCalled(); // Verificar que o mockVerifyToken não foi chamado
        done();
      });
    });

    req.end();
  });

  it('não deve permitir acesso a documentos para usuários não autenticados', (done) => {
    mockVerifyToken.mockReturnValueOnce(null); // Simulando que o token é inválido ou inexistente

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/document',
      method: 'GET',
      headers: {
        Authorization: 'Bearer invalid-token',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        expect(res.statusCode).toBe(401); // Unauthorized
        expect(data).toContain('No token provided');
        done();
      });
    });

    req.end();
  });
});
