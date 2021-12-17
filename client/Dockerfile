FROM node

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install
COPY . .
EXPOSE 4200
CMD [ "npm","start", "--", "--host", "0.0.0.0" ]
#RUN npm start