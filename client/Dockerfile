FROM quay.io/bitnami/node

RUN adduser node root

WORKDIR /app
COPY package.json package-lock.json ./

RUN chmod -R 775 /app
RUN chown -R node:root /app

RUN npm install
COPY . .
EXPOSE 4200

USER root
CMD [ "npm","start"]
#RUN npm start
