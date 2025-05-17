FROM node:18-alpine

ARG PORT
ENV PORT=$PORT

ARG MONGO_URI
ENV MONGO_URI=$MONGO_URI

ARG DB_NAME
ENV DB_NAME=$DB_NAME

ARG GMAIL_USERNAME
ARG GMAIL_PASSWORD

ENV GMAIL_USERNAME=$GMAIL_USERNAME
ENV GMAIL_PASSWORD=$GMAIL_PASSWORD

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "app.js"] 
