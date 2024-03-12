FROM node:16.14.2
WORKDIR ./frontpi
COPY package*.json ./frontpi
COPY . .
RUN npm install --legacy-peer-deps
EXPOSE 3001
CMD ["npm","run","start"]
