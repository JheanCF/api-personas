FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN echo "install this" 
EXPOSE 3000


COPY . .

CMD ["npm","start"]