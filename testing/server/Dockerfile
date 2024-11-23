# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY package.json package-lock.json ./
COPY src ./src
COPY uploads ./uploads

# Install dependencies
RUN npm install

# Expose port
EXPOSE 5000

# Run the server
CMD ["node", "server.js"]
