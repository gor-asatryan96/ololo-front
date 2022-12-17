FROM node:14 as build-stage

WORKDIR /app
COPY . .
RUN npm i

ARG REACT_BACK_URL
ARG REACT_WS_URL

ENV REACT_BACK_URL=${REACT_BACK_URL}
ENV REACT_WS_URL=${REACT_WS_URL}

RUN npm run build

FROM nginx

COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]