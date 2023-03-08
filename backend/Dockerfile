FROM node:14.20.1-alpine

WORKDIR /app

COPY package*.json .

RUN npm i

COPY src postgres-datasource.ts tsconfig*.json .

RUN npm run build

EXPOSE 3000

#ENTRYPOINT ["npm", "run", "start"]

