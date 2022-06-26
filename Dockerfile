FROM nginx

WORKDIR /usr/share/react

RUN curl -fsSL https://deb.nodesource.com/setup_17.x | bash -
RUN apt-get install -y nodejs

COPY package*.json ./

COPY . .

RUN npm install -g npm@8.13.1
RUN npm install
RUN npm install --save react-scripts
RUN npm run build

RUN rm -r /usr/share/nginx/html

RUN cp -a build/. /usr/share/nginx/html