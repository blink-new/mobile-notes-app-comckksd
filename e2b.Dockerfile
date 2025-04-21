# Use Node.js LTS version as base image
FROM node:20-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    lsof \
    zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /home/user

# Install Expo CLI globally
RUN npm install -g expo-cli

# Copy package files
COPY package*.json ./

# Install project dependencies
RUN npm install --legacy-peer-deps

# Copy app files
COPY . .

# # Initialize Git repository
# RUN git init && \
#     git config --global --add safe.directory /usr/src/app && \
#     git config --global user.name "ShadowWalker2014" && \
#     git config --global user.email "kai.jiabo.feng@gmail.com" && \
#     curl -sL https://www.toptal.com/developers/gitignore/api/node,expo > .gitignore && \
#     git add -A && \
#     git commit -m "Initial commit"

# # Expose Expo ports
# EXPOSE 3000
# EXPOSE 19000
# EXPOSE 19001
# EXPOSE 19002

# # Start Expo development server
# CMD ["npm", "start"]