# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /src

# Copy the current directory contents into the container at /app
COPY . /src

# Install any needed packages specified in package.json
RUN yarn install

# Rebuild node-sass for the container's environment
RUN yarn add node-sass && yarn rebuild node-sass

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variables
ENV CI=true
ENV DANGEROUSLY_DISABLE_HOST_CHECK=true

# Run npm start when the container launches
CMD ["yarn", "start"]