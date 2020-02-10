# Build Stage
FROM node:alpine as build

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ARG api_base_url
ENV REACT_APP_API_BASE_URL $api_base_url

ARG google_oauth2_key
ENV REACT_APP_GOOGLE_OAUTH2_KEY $google_oauth2_key

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json
RUN npm install

COPY . /usr/src/app
RUN npm run build


# Prod Stage
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD /bin/sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
