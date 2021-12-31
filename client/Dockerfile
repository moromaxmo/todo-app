FROM node

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install
COPY . .
EXPOSE 4200
CMD [ "npm","start"]
#RUN npm start
