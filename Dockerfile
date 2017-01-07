FROM node:7
MAINTAINER Giovanni Bassi <giggio@giggio.net>
EXPOSE 3000 7000 5858
VOLUME /app /app/node_modules /root/.npm /root/.cache/yarn
WORKDIR /app
CMD /bin/bash
# Using specific nightly for yarn 0.19.0 as a bug that prevented postinstall of dependent
# packages to run was breaking the code
RUN apt-get update && \
    apt-get install -y apt-transport-https && \
    apt-key adv --fetch-keys http://dl.yarnpkg.com/debian/pubkey.gpg && \
    echo "deb http://nightly.yarnpkg.com/debian/ nightly main" | tee /etc/apt/sources.list.d/yarn-nightly.list && \
    apt-get update && \
    apt-get install -y yarn=0.19.0-20170106.1725-1
#RUN apt-get update && \
#    apt-get install -y apt-transport-https && \
#    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
#    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
#    apt-get update && \
#    apt-get install -y yarn
RUN yarn global add gulp nodemon tslint typescript