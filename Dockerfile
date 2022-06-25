FROM node:16-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm install
COPY --from=builder /home/node/app/build ./build
COPY --chown=node:node .env .
# COPY --chown=node:node  /config ./config
# COPY --chown=node:node  /public ./public
EXPOSE 8000
CMD [ "node", "build/server.js" ]
