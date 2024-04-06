# Stage 1: Build React frontend
FROM node:18 as build-stage

WORKDIR /app/client

COPY client/package*.json ./

RUN npm install

COPY client/ .

# Build the React app
RUN npm run build

# Stage 2: Set up the server environment
FROM node:18

WORKDIR /app

# Copy server package.json and install server dependencies
COPY server/package*.json ./server/
RUN cd server && npm install

# Copy the built React app from the previous stage
COPY --from=build-stage /app/client/build ./server/client/build

# Copy the rest of the server code
COPY server/ ./server/

# Set environment variable
ENV NODE_ENV=production

EXPOSE 3000

# Use CMD to run your server, you might need to adjust the path and command
CMD ["node", "server/server.js"]
