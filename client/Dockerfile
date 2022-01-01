FROM quay.io/bitnami/node

RUN adduser root

WORKDIR /app
COPY package.json package-lock.json ./

RUN chmod -R 775 /app
RUN chown -R root /app

RUN npm install
COPY . .
EXPOSE 4200

USER root
CMD [ "npm","start"]
#RUN npm start
