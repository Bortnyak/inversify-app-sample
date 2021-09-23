FROM node

ADD ./start.sh /
RUN chmod +x /start.sh

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN ls -la /

CMD ["/start.sh"]