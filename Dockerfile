# # Use an official node runtime as a parent image
# FROM node:14

# # Set the working directory in the container
# WORKDIR /app

# # Copy the package.json file to install dependencies
# COPY package.json .

# # Install dependencies
# RUN npm install

# # Copy the rest of the Angular app code
# COPY . .

# # Build the Angular app
# RUN npm run build

# # Use an official nginx image as a parent image
# FROM nginx:1.19

# # Copy the built Angular app files to the nginx default public directory
# COPY --from=0 /app/dist/ /usr/share/nginx/html/
# COPY default.conf /etc/nginx/conf.d/
# # Expose port 80 to allow external connections
# EXPOSE 80

### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:16-stretch as builder

LABEL maintainer="ivan.subotic@unibas.ch"

# The qq is for silent output in the console
# You are welcome to modify this part as it
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev

# Sets the path where the app is going to be installed
ENV NODE_ROOT /usr/app/

# Creates the directory and all the parents (if they don’t exist)
RUN mkdir -p $NODE_ROOT

# Sets the /usr/app as the active directory
WORKDIR $NODE_ROOT

# Copies all the content
COPY . .

# Install all the packages
RUN npm install -g @angular/cli
RUN npm install

## Build the angular app in production mode and store the artifacts in dist folder
## should be: $(npm bin)/ng build --prod --env=prod --build-optimizer
RUN npm run build-prod

### STAGE 2: Setup ###

FROM daschswiss/nginx-server:v1.1.1

LABEL maintainer="400790+subotic@users.noreply.github.com"

RUN rm -rf /public/*

COPY --from=builder /usr/app/dist/dsp-cpe /public
