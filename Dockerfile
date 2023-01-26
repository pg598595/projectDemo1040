FROM node:14
WORKDIR /usr/app/
COPY package*.json ./
RUN npm i
COPY . .

# Build the application
RUN npm run build

# Start the application
CMD ["npm", "start"]