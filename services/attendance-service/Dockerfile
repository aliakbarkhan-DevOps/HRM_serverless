FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3003
ENV PORT=3003
ENV LOCAL=true
CMD ["node", "index.js"]
