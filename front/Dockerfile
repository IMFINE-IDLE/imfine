# Use a base image with Node.js and npm installed
FROM node:18.12.1 as build

# Set the working directory
WORKDIR /app

# Copy the project files
COPY . .

# Install project dependencies
RUN npm install

# Build the project
RUN npm run build

# Use a base image with Nginx
FROM nginx

# Copy the build artifacts from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Set the Nginx default configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default Nginx port
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]