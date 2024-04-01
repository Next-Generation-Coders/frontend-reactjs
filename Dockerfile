FROM node:18
WORKDIR ./frontpi
COPY package*.json ./frontpi
COPY src ./frontpi
COPY craco.config.js ./frontpi
COPY babel-plugin-macros.config.js ./frontpi
COPY public ./frontpi
COPY service ./frontpi
COPY jsconfig.json ./frontpi
COPY .env ./frontpi
RUN npm install --force
EXPOSE 3001
CMD ["npm","run","start"]
