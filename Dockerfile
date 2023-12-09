FROM node:20.9.0-slim
WORKDIR /app

COPY . .
RUN yarn install
RUN yarn build

EXPOSE 3000
CMD ["npm", "start"]
