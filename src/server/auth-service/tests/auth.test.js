const http = require('http');
const createAuthMiddleware = require('./authMiddleware');

// Mock da função que obtém a chave pública
const mockGetPublicKey = jest.fn(() => Promise.resolve('mocked-public-key'));

// Mock da função que valida o token
const mockVerifyToken = jest.fn((token, publicKey) => {
  if (token === 'valid-token') {
    return { userId: 123, email: 'user@example.com' };
  } else {
    throw new Error('Invalid token');
  }
});

describe('Auth Middleware', () => {
  let server;

  beforeAll(() => {
    const authMiddleware = createAuthMiddleware({
      getPublicKey: mockGetPublicKey,
      verifyToken: mockVerifyToken,
    });

    server = http.createServer((req, res) => {
      authMiddleware(req, res, () => {
        res.statusCode = 200;
        res.end('Authenticated');
      });
    });

    server.listen(3000);
  });

  afterAll(() => {
    server.close();
  });

  it('deve autenticar com token válido', (done) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/',
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
        expect(data).toBe('Authenticated');
        expect(mockGetPublicKey).toHaveBeenCalled();
        expect(mockVerifyToken).toHaveBeenCalledWith('valid-token', 'mocked-public-key');
        done();
      });
    });

    req.end();
  });

  it('deve rejeitar requisição sem token', (done) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        expect(res.statusCode).toBe(401);
        expect(data).toContain('No token provided');
        expect(mockGetPublicKey).not.toHaveBeenCalled();
        expect(mockVerifyToken).not.toHaveBeenCalled();
        done();
      });
    });

    req.end();
  });

  it('deve rejeitar token inválido', (done) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET',
      headers: {
        Authorization: 'Bearer invalid-token',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => { // Corrigido aqui
        expect(res.statusCode).toBe(401);
        expect(data).toContain('Invalid token');
        expect(mockGetPublicKey).toHaveBeenCalled();
        expect(mockVerifyToken).toHaveBeenCalledWith('invalid-token', 'mocked-public-key');
        done();
      });
    });

    req.end();
  });
});
