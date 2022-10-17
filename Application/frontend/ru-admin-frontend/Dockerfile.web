# syntax=docker/dockerfile:1

# stage 1

FROM node:alpine AS my-app-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# stage 2

FROM nginx:alpine
COPY --from=my-app-build /app/dist/ru-admin /usr/share/nginx/html
EXPOSE 80
