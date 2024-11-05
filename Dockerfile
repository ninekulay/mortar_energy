# FROM node:lts-alpine as build-stage
FROM node:18-alpine as build-stage

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install --force

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# Production

# build app for production with minification
RUN npm run build

# Final stage
FROM nginx:latest

# Check if default.conf exists before attempting to remove it
RUN [ -e /etc/nginx/conf.d/default.conf ] && rm /etc/nginx/conf.d/default.conf || true

# Copy your custom Nginx configuration to the Nginx configuration directory as default.conf
COPY docker-nginx.conf /etc/nginx/conf.d/default.conf

# # Append the contents of docker-nginx.conf to nginx.conf
# RUN cat /etc/nginx/conf.d/default.conf >> /etc/nginx/nginx.conf

COPY --from=build-stage /app/dist /var/www/html/vue/dist

EXPOSE 80
# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]