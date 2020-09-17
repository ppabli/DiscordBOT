FROM node

WORKDIR /MiBOT

COPY ./commands ./commands
COPY ./lib ./lib
COPY ./objects ./objects

COPY ./.env ./
COPY ./MiBOT.js ./
COPY ./requires.js ./
COPY ./package.json ./

RUN npm install

CMD ["node", "./MiBOT.js"]