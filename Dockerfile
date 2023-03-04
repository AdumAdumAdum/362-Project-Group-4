# Use a Node 19 base image
FROM node:19-alpine 
# Set the working directory to /app inside the container
WORKDIR /app
# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH


# ==== BUILD =====
# Install dependencies
COPY package.json .
RUN npm install
# Copy app files
COPY . .

# ==== RUN =======
# Start the app
CMD ["npm", "start"]
