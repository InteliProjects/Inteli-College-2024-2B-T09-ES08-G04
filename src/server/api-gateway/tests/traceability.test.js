const request = require('supertest');
const app = require('../index');

// Teste de logs de requisição
test('Verificar logs de requisição são gerados corretamente', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await request(app).get('/api/docs');

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/\[Custom Log\] IP: .*?, Method: GET, Path: \/api\/docs/));
    consoleSpy.mockRestore();
});

// Teste de logs de resposta
test('Verificar logs de resposta são gerados corretamente', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await request(app).get('/health');

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/\[Response Log\] IP: .*?, Method: GET, Path: \/health, Status: 200, Time: \d+ms/));
    consoleSpy.mockRestore();
});

// Teste de proxy para /api/docs com mock
test('Verificar se proxy redireciona corretamente para /api/docs', async () => {
    const response = await request(app).get('/api/docs');
    expect(response.status).toBe(200);
});


// Teste de rastreamento de IP
test('Registrar IP e caminho no log', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await request(app).get('/api/devices');

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/\[Custom Log\] IP: .*?, Method: GET, Path: \/api\/devices/));
    consoleSpy.mockRestore();
});

// Teste de tempo de resposta
test('Verificar tempo de resposta está dentro do limite', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await request(app).get('/health');

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/\[Response Log\] .*? Time: \d+ms/));

    const logCall = consoleSpy.mock.calls.find(call => call[0].includes('Time'));
    const timeTaken = parseInt(logCall[0].match(/Time: (\d+)ms/)[1], 10);
    expect(timeTaken).toBeLessThan(500);
    consoleSpy.mockRestore();
});
