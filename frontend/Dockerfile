# Use Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . .

# Build React app
RUN npm run build

# Serve React app
EXPOSE 5173
CMD ["npm", "start"]