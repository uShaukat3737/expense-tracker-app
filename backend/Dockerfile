FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy the rest of the backend code
COPY . .

# Expose the port (Update 5000 if your app uses a different port)
EXPOSE 5000

# Start the application using node directly (backend package.json has no `start` script)
CMD ["node", "app.js"]
