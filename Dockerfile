FROM node:20.9.0-slim
WORKDIR /app

EXPOSE 9000
CMD ["npm", "start"]
