npm set //verdaccio:4873/:_authToken "g7JwbbhC0dnE3vkbzZnGwIJcoTHmHA1x5UNdAC8y7hk="
npm install --registry http://verdaccio:4873 && \
 npm run build && \
 cd /usr/share/nginx/html && \
 rm -rf ./* && \
 cp -rf /usr/src/app/build/. . && \
 nginx -g 'daemon off;'