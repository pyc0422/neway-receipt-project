FROM node:current-slim
WORKDIR /neway-receipt-project
COPY package.json /neway-receipt-project
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server/index.js"]