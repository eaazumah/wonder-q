FROM node:14 as base

COPY yarn.lock ./
COPY package.json ./

COPY src ./src
COPY tsconfig.json .
COPY openapi.json ./
COPY tsconfig.build.json ./


# ------------ Development -----------#
FROM base AS dev
RUN yarn install
COPY nodemon.json ./
CMD ["yarn", "dev"]

# ----------------- Build ---------------------#
FROM base AS build
RUN yarn install
RUN yarn build

# ----------------- Production ---------------------#
FROM gcr.io/distroless/nodejs:14

COPY --from=build /node_modules ./node_modules
COPY --from=build /dist /dist

EXPOSE 3000

CMD ["dist/src/app.js"]
