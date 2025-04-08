FROM node:22 as build
WORKDIR /app
COPY package*.json ./
RUN npm install

ARG BACKEND_HOST
ARG BACKEND_PORT

COPY . .


RUN npm run build


FROM nginx:alpine


COPY --from=build /app/dist/hts /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["sh", "/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

