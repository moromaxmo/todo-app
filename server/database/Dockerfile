FROM mongo
#persist data to another dir outside the container
VOLUME ["/data/db"]
#init a dir to work on
WORKDIR /data
#specifying port num inide container
EXPOSE 27017
#launch db server
CMD ["mongod"]
