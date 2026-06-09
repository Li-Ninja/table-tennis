FROM node:22.17.1-slim
WORKDIR /app

COPY . .
RUN yarn install
RUN yarn build

EXPOSE 8080
CMD ["yarn", "start", "--port", "8080"]
