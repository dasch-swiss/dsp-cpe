# Use an official node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json file to install dependencies
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the Angular app code
COPY . .

# Build the Angular app
RUN npm run build

# Use an official nginx image as a parent image
FROM nginx:1.19

# Copy the built Angular app files to the nginx default public directory
COPY --from=0 /app/dist/ /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/
# Expose port 80 to allow external connections
EXPOSE 80