FROM node:14 as build-stage

WORKDIR /app
COPY . .
RUN npm i

ARG REACT_APP_BACK_URL
ARG REACT_APP_WS_URL

ENV REACT_APP_BACK_URL=${REACT_APP_BACK_URL}
ENV REACT_APP_WS_URL=${REACT_APP_WS_URL}

RUN echo 'Back url: ${REACT_APP_BACK_URL}'
RUN echo 'Ws url: ${REACT_APP_WS_URL}'

RUN npm run build

FROM nginx

COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]