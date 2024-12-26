const request = require('supertest');
const express = require('express');
const { router, isPublicIP, getLocationFromIP } = require('../routes/index');
const axios = require('axios');
jest.mock('axios');

jest.spyOn(console, 'log').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});

jest.mock('express-openid-connect', () => ({
  requiresAuth: () => (req, res, next) => next(),
}));

describe('Router Tests', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(router);
  });

  describe('Função isPublicIP', () => {
    test('Deve retornar falso para IPs privados', () => {
      const privateIPs = ['10.0.0.1', '192.168.1.1', '172.16.0.1', '127.0.0.1', '::1'];
      privateIPs.forEach((ip) => {
        expect(isPublicIP(ip)).toBe(false);
      });
    });

    test('Deve retornar verdadeiro para IPs públicos', () => {
      const publicIPs = ['8.8.8.8', '1.1.1.1', '185.199.108.153'];
      publicIPs.forEach((ip) => {
        expect(isPublicIP(ip)).toBe(true);
      });
    });
  });

  describe('Função getLocationFromIP', () => {
    test('Deve retornar dados padrão para IPs privados', async () => {
      const privateIP = '192.168.1.1';
      const location = await getLocationFromIP(privateIP);
      expect(location).toEqual({
        ip: privateIP,
        city: 'Rede Privada',
        region: 'Desconhecido',
        country_name: 'Desconhecido',
      });
    });

    test('Deve retornar localização para IP público', async () => {
      const publicIP = '8.8.8.8';
      const mockResponse = {
        data: {
          ip: publicIP,
          city: 'Mountain View',
          region: 'California',
          country_name: 'United States',
        },
      };

      axios.get.mockResolvedValue(mockResponse);

      const location = await getLocationFromIP(publicIP);
      expect(location).toEqual(mockResponse.data);
    });

    test('Deve lidar com erros ao obter localização', async () => {
      const publicIP = '8.8.8.8';
      axios.get.mockRejectedValue(new Error('Erro na API'));

      const location = await getLocationFromIP(publicIP);
      expect(location).toEqual({
        ip: publicIP,
        city: 'Desconhecido',
        region: 'Desconhecido',
        country_name: 'Desconhecido',
      });
    });
  });

  describe('GET /auth0/users', () => {
    beforeAll(() => {
      process.env.URL = 'mocked-auth0-domain';
      process.env.TOKEN = 'mocked-auth0-token';
    });

    test('Deve listar usuários com localização', async () => {
      const mockUsers = [
        { user_id: '1', last_ip: '8.8.8.8' },
        { user_id: '2', last_ip: '192.168.1.1' },
      ];
      const mockLocationPublic = {
        ip: '8.8.8.8',
        city: 'Mountain View',
        region: 'California',
        country_name: 'United States',
      };

      axios.get
        .mockResolvedValueOnce({ data: mockUsers })
        .mockResolvedValueOnce({ data: mockLocationPublic });

      const response = await request(app).get('/auth0/users');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { ...mockUsers[0], location: mockLocationPublic },
        { ...mockUsers[1], location: { ip: '192.168.1.1', city: 'Rede Privada', region: 'Desconhecido', country_name: 'Desconhecido' } },
      ]);
    });

    test('Deve retornar erro se a chamada para listar usuários falhar', async () => {
      axios.get.mockRejectedValue(new Error('Erro na API de usuários'));

      const response = await request(app).get('/auth0/users');
      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: 'Erro ao listar usuários',
        details: 'Erro desconhecido',
      });
    });
  });

});
