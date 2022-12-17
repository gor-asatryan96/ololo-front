FROM node:14 as build-stage

WORKDIR /app
COPY . .
RUN npm i

RUN npm run build

FROM nginx

COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

