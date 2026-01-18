# build the react app
from node:22 as build
workdir /app
copy package*.json ./
run npm ci
copy . .
run npm run build

# bundle the react app and nginx config
from nginx:alpine
copy nginx.conf /etc/nginx/nginx.conf
copy --from=build /app/dist /usr/share/nginx/html
expose 80
cmd ["nginx", "-g", "daemon off;"]
