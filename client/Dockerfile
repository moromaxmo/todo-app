FROM quay.io/bitnami/node
#init a dir to copy project to
RUN chgrp -R 0 /run && chmod -R g=u /run
WORKDIR /app
RUN chgrp -R 0 /app && chmod -R g=u /app
COPY package.json package-lock.json ./
#installing requirements
RUN npm install
COPY . .
#specifying port num inide container
EXPOSE 4200
#launch client side
CMD [ "npm", "start", "--", "--host", "0.0.0.0", "--disable-host-check"]