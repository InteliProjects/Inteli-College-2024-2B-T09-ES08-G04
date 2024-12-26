const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const promClient = require('prom-client');
require('dotenv').config();

const app = express();

// Middleware CORS com suporte para ambiente de teste
app.use(cors({
  origin: process.env.NODE_ENV === 'test' ? 'http://allowed-origin.com' : '*',
  methods: ['GET', 'POST', 'DELETE'],
}));

// Middleware para gerar e anexar um x-trace-id
app.use((req, res, next) => {
  const traceId = req.headers['x-trace-id'] || uuidv4();
  req.headers['x-trace-id'] = traceId;
  res.setHeader('x-trace-id', traceId);
  console.log(`[Trace] x-trace-id: ${traceId}`);
  next();
});

// Middleware de log personalizado para requisições
app.use((req, res, next) => {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const traceId = req.headers['x-trace-id'];
  console.log(`[Custom Log] IP: ${clientIp}, Method: ${req.method}, Path: ${req.originalUrl}, x-trace-id: ${traceId}`);
  next();
});

// Configurar métricas baseadas em logs
const register = new promClient.Registry();

// Métrica de contagem de requisições HTTP
const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total de requisições HTTP',
  labelNames: ['method', 'status'], // Etiquetas: método e status
});
register.registerMetric(httpRequestCounter);

// Métrica de duração das requisições HTTP
const httpRequestDurationHistogram = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duração das requisições HTTP em segundos',
  labelNames: ['method', 'status'], // Etiquetas: método e status
});
register.registerMetric(httpRequestDurationHistogram);

// Middleware de log e métricas para respostas
app.use((req, res, next) => {
  const startTime = process.hrtime(); // Tempo inicial de alta precisão
  res.on('finish', () => {
    const elapsedTime = process.hrtime(startTime);
    const elapsedSeconds = elapsedTime[0] + elapsedTime[1] / 1e9; // Tempo em segundos

    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const traceId = req.headers['x-trace-id'];
    const status = res.statusCode;
    const method = req.method;

    console.log(`[Response Log] IP: ${clientIp}, Method: ${method}, Path: ${req.originalUrl}, Status: ${status}, Time: ${elapsedSeconds.toFixed(3)}s, x-trace-id: ${traceId}`);

    // Atualizar métricas
    httpRequestCounter.inc({ method, status }); // Incrementar contador por método e status
    httpRequestDurationHistogram.observe({ method, status }, elapsedSeconds); // Registrar tempo de resposta
  });
  next();
});

// Expor métricas na rota /metrics
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    console.error('Erro ao gerar métricas:', err);
    res.status(500).end();
  }
});

// Mock para ambiente de teste
if (process.env.NODE_ENV === 'test') {
  app.use('/api/docs', (req, res) => {
    res.status(200).send('Mock response for /api/docs');
  });
} else {
  app.use(
    '/api/docs',
    createProxyMiddleware({
      target: 'http://project-service:3002',
      changeOrigin: true,
      pathRewrite: { '^/api/docs': '' },
      logLevel: 'debug',
      onProxyReq: (proxyReq, req) => {
        const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        proxyReq.setHeader('x-trace-id', req.headers['x-trace-id']);
        console.log(`[Proxy] IP: ${clientIp}, Proxying request to: ${proxyReq.getHeader('host')}${proxyReq.path}, x-trace-id: ${req.headers['x-trace-id']}`);
      },
      onProxyRes: (proxyRes, req) => {
        console.log(`[Proxy Response] Status: ${proxyRes.statusCode}, Path: ${req.originalUrl}, x-trace-id: ${req.headers['x-trace-id']}`);
      },
    })
  );
}

// Proxy para /api/devices
app.use(
  '/api/devices',
  createProxyMiddleware({
    target: 'http://auth-service:3500',
    changeOrigin: true,
    pathRewrite: { '^/api/devices': '' },
    logLevel: 'debug',
    onProxyReq: (proxyReq, req) => {
      const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      proxyReq.setHeader('x-trace-id', req.headers['x-trace-id']);
      console.log(`[Proxy] IP: ${clientIp}, Proxying request to: ${proxyReq.getHeader('host')}${proxyReq.path}, x-trace-id: ${req.headers['x-trace-id']}`);
    },
    onProxyRes: (proxyRes, req) => {
      console.log(`[Proxy Response] Status: ${proxyRes.statusCode}, Path: ${req.originalUrl}, x-trace-id: ${req.headers['x-trace-id']}`);
    },
  })
);

// Rota de Saúde
app.get('/health', (req, res) => {
  res.status(200).send('API Gateway is up and running!');
});

module.exports = app;

// Iniciar o servidor se o script for executado diretamente
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
  });
}
