require('dotenv').config();
const axios = require('axios');

const BASE = process.env.API_URL || 'http://localhost:3000';

async function run() {
  const timestamp = Date.now();
  const envEmail = process.env.EMAIL;
  const envPassword = process.env.PASSWORD;

  let email;
  let password;
  let userPayload = null;

  if (envEmail && envPassword) {
    email = envEmail;
    password = envPassword;
    console.log('Using credentials from environment (only login)');
  } else {
    email = `test+${timestamp}@example.com`;
    password = 'Password123!';
    userPayload = {
      name: 'TestUser',
      email,
      password: password
    };
  }

  try {
    if (userPayload) {
      console.log('Intentando registrar usuario:', email);
        const regRes = await axios.post(`${BASE}/api/usuarios/register`, userPayload, { timeout: 5000 });
      console.log('Registro exitoso, status:', regRes.status);
    } else {
      console.log('Omitiendo registro (se hará solo login)');
    }
  } catch (regErr) {
    if (regErr.response) {
      console.warn('Registro devolvió status', regErr.response.status, '-', regErr.response.data);
      if (regErr.response.status !== 201 && regErr.response.status !== 409) {
        console.error('Error inesperado en registro, abortando');
        process.exit(1);
      }
      // Si es 409 o ya existe, continuamos para intentar login
    } else {
      console.error('Error al conectar para registrar:', regErr.message);
      process.exit(1);
    }
  }

  try {
    console.log('Intentando login con:', email);
    const loginRes = await axios.post(`${BASE}/api/usuarios/login`, { email, password }, { timeout: 5000 });
    console.log('Login exitoso, status:', loginRes.status);
    if (loginRes.data && loginRes.data.token) {
      console.log('Token recibido:', loginRes.data.token);
      process.exit(0);
    } else {
      console.error('Login no devolvió token:', loginRes.data);
      process.exit(2);
    }
  } catch (loginErr) {
    if (loginErr.response) {
      console.error('Login falló, status', loginErr.response.status, '-', loginErr.response.data);
    } else {
      console.error('Error al conectar para login:', loginErr.message);
    }
    process.exit(1);
  }
}

run();
