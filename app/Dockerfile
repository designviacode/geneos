FROM node:8-alpine

COPY . /web
WORKDIR /web

RUN yarn
RUN yarn build

EXPOSE 80

ENV PORT="80"

CMD ["yarn", "start"]
