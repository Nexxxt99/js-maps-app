FROM node:14.20.1-alpine as install

WORKDIR /app

COPY package*.json .

RUN npm i

FROM install as build

COPY src ./src

COPY static ./static

COPY tsconfig.json webpack.config.ts .

RUN npm run build

FROM nginx:1.23.3-alpine

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]