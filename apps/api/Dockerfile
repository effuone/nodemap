FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

RUN yarn run build

EXPOSE 5000

# Start the server using the production build
CMD ["yarn", "run", "start:prod"]