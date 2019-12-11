# Build Stage
FROM node:alpine as build

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ARG api_base_url
ENV REACT_APP_API_BASE_URL $api_base_url
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json
RUN npm install

COPY . /usr/src/app
RUN npm run build


# Prod Stage
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
