###################

FROM node:18.2.0 AS build_stage

LABEL maintainer="Twig <twig@yourcompany.com>"
LABEL name=affluences-todo
LABEL intermediate=true

WORKDIR /src/app

COPY package*.json ./

# user can do docker build --build-arg installCommand="npm install"
ARG installCommand="npm ci"
RUN $installCommand

COPY . .

RUN npm run build

##################

FROM node:18.2.0-alpine3.14 as running_image

LABEL name=affluences-todo

WORKDIR /src/app

# with only 1 COPY, it didnt create subdirs node_modules and dist and dumped everything in /src/app
COPY --from=build_stage /src/app/node_modules/ ./node_modules
COPY --from=build_stage /src/app/dist/ ./dist

# dotenv is supposed to be a dev dependency.
# this dockerfile is for production
# do not rely on dotenv to provide the values : it's up to the user to do so when making the image.
ARG listeningPort=3000
ENV PORT=$listeningPort
EXPOSE $PORT

ARG enableMetrics=false
ENV ENABLE_METRICS=$enableMetrics

ARG promToken="default_value"
ENV PROM_TOKEN=$promToken

# I could have just not cared and adapted the CMD to use node -r dotenv/config
CMD ["node", "./dist/index.js"]
