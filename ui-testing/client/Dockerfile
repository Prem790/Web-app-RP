# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY package.json package-lock.json ./
COPY tailwind.config.js postcss.config.js ./
COPY public ./public
COPY src ./src

# Install dependencies
RUN npm install

# Expose port
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
