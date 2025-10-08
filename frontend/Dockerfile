FROM node:22-alpine AS base
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Serve the built app
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist"]