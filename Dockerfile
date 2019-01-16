FROM ubuntu:16.04 AS builder
# Install the prerequestes for the app
ENV APP_NAME=AppInventory \
    APP_GIT_URL=https://github.com/atam84/app-inventory.git \
    APP_VERSION=0.2 \
    APP_HOME_DIR=/app/meteor/app-inventory \
    APP_METEOR_DIR=/app/meteor/app-inventory/AppInventory \
    APP_PORT=80 \
    APP_BRANCH=master \
    MONGODB_URI=mongodb-server \
    MONGODB_PORT=27014 \
    MONGODB_USER=mongoadmin \
    MONGODB_PASSWORD=Atam84Passw0rd

RUN apt-get update \
    && apt-get install -y curl \
    && curl -sL https://deb.nodesource.com/setup_10.x | bash - \
    && apt-get update \
    && apt-get install -y nodejs bash git build-essential \
    && curl https://install.meteor.com/ | /bin/bash \
    && mkdir -p /app/meteor \
    && useradd -d /app/meteor -m meteor \
    && chown -R meteor.meteor /app \
    && apt-get clean \
    && apt-get autoclean \
    && rm -Rf /tmp/*

# Define working directory, meteor user and env vars
WORKDIR /app/meteor
USER meteor

# Get the application from github :) and build it
RUN git clone $APP_GIT_URL \
    && cd $APP_HOME_DIR \
    && echo "-------------------------------------------" \
    && echo "$APP_BRANCH branch selected for build" \
    && echo "-------------------------------------------" \
    #&& git checkout $APP_BRANCH \
    #&& git branch \
    && cd $APP_METEOR_DIR \
    && npm install \
    && meteor npm install \
    && meteor build ../ --directory

CMD ["bash"]

FROM alpine:latest
ENV ROOT_URL=http://localhost \
    PORT=3000 \
    BIND_IP=0.0.0.0 \
    MONGO_URL=mongodb://mongoadmin:Atam84Passw0rd@mongo-db:27014
    
RUN apk update \
    && apk --no-cache upgrade \
    && apk --no-cache add npm nodejs python make cmake g++
    #&& npm install -g forever
WORKDIR /app
COPY --from=builder /app/meteor/app-inventory/bundle .
RUN (cd programs/server && npm install)
CMD ["node", "main.js"]
