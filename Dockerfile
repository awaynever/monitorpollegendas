# Dockerfile para API Flask leve
FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY app.js ./
COPY .env.example ./

EXPOSE 5000

CMD ["npm", "start"]
