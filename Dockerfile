# Use the official lightweight Node.js 14 image.
FROM node:14-alpine

# Set the working directory.
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files.
COPY package*.json ./

# Install dependencies.
RUN npm install --only=production

# Copy the rest of the app's code.
COPY . .

# Build the app.
RUN npm run build

# Expose the port that your Nuxt.js app is listening on.
EXPOSE 3000

# Set the command to start the app.
CMD [ "npm", "start" ]
