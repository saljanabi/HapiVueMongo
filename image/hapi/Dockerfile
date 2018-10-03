FROM node:latest

EXPOSE 80

ARG PROJECT_DIR=.
ENV HOME=/root

ENV NODE_ENV $NODE_ENV
ENV NODE_PATH=src/

ADD $PROJECT_DIR/hapi/package.json $PROJECT_DIR/hapi/

WORKDIR $PROJECT_DIR/hapi
RUN npm install --unsafe-perm --loglevel=warn --no-progress

COPY $PROJECT_DIR ./hapi
ENTRYPOINT ["npm", "start"]
