FROM node:22 AS front-build
WORKDIR /app
COPY frontend .
RUN npm ci && npm run build


FROM golang:tip-alpine3.22 AS backend
WORKDIR /app
COPY ./backend .
RUN go mod tidy
RUN go build starter/main.go -o server .


FROM ubuntu:latest
WORKDIR /app
COPY --from=front-build /app/dist .
COPY --from=backend /app/server .

EXPOSE 8080
ENTRYPOINT [ "./server", "start" ]
