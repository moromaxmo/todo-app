FROM node
#init a dir to copy project to
WORKDIR /app
COPY package.json package-lock.json ./
#installing requirements
RUN npm install
COPY . .
#specifying port num inide container
EXPOSE 3000
#launch client side
CMD [ "npm","start"]

#NOTE: you need to specify an env variable, with -e option, named DB_IP, and bind it with the db container ip