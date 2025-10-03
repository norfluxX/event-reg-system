FROM node:18-alpine

ARG PORT
ENV PORT=$PORT

ARG MONGO_URI
ENV MONGO_URI=mongodb://mongodb:27017/registrations

ARG DB_NAME
ENV DB_NAME=$DB_NAME

ARG GMAIL_USER
ARG GMAIL_PASS

ENV GMAIL_USER=$GMAIL_USER
ENV GMAIL_PASS=$GMAIL_PASS

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
