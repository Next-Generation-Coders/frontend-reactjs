FROM node:18
WORKDIR ./frontpi
COPY package*.json .
COPY src ./src
COPY craco.config.js .
COPY babel-plugin-macros.config.js .
COPY public ./public
COPY service ./service
COPY jsconfig.json .
COPY .env .
RUN npm npm config set fetch-retry-maxtimeout 120000
RUN npm install --force
EXPOSE 3001
CMD ["npm","run","start"]