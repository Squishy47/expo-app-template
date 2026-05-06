FROM oven/bun:1.0
WORKDIR /app
COPY package.json package.json
COPY bun.lock bun.lock
RUN bun install
COPY . .
EXPOSE 3001
ENTRYPOINT ["bun", "start"]
