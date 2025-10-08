FROM node:22

WORKDIR /usr/src/app

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm install

# Install TypeScript type definitions
RUN npm install --save-dev @types/express @types/node

# Copy the rest of your source code
COPY . .

EXPOSE 3001

# Run the app using ts-node
CMD ["npx", "ts-node", "src/index.ts"]