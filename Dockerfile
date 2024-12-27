#FROM node:18
#WORKDIR /usr/src/app
#COPY package*.json ./
#RUN npm install
#COPY . .
#RUN npm run build
#CMD [ "node", "dist/main.js" ]
# ------------------------------------
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g @nestjs/cli
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]
