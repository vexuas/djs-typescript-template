import fs from 'fs';

exports.databaseConfig = {
  database: '',
  host: '',
  user: '',
  port: 25060,
  password: '',
  ssl: {
    rejectUnauthorized: false,
    cert: fs.readFileSync('./config/ca-certificate.cer').toString(),
  },
};
