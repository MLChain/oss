# Mlchain Docker image

## Running Your mlchain container

```bash
docker run -d --name=mlchain -p 3000:3000 mlchain/server
```

### Extra information

There are some predefined defaults. However, you can specify ones via environmental variables:

This example modified the expose port in mlchain and add a connection to a postgres database.

```bash
docker run --detach \
           --name=mlchain \
           --publish 3000:8080 \
           --volume mlchain_data:/mlchain/data \
           --env  PORT=8080 \ # Don't forget to adjust "--publish" then
           --env  BP_HOST=0.0.0.0 \ # all zeroes means listen to all interfaces
           --env  NODE_ENV=production \
           --env  PG_HOST=192.168.0.11 \
           --env  PG_PORT=5432 \
           --env  PG_USER=bp_user \
           --env  PG_PASSWORD=<********> \
           --env  PG_SSL=false \
           mlchain/server:latest
```

---

Now you can track the logs:

```bash
docker logs --follow mlchain
```

---

If you wish to connect to the running container:

```bash
docker exec --interactive --tty mlchain bash
```

---

### How to use the mlchain container

Further documentation can be found on the mlchain [website](https://mlchain.com/docs/infrastructure/docker)

### Changelog

Full documentation resource is available on the [official website](https://mlchain.com/docs/).
[Changelog resides here](https://github.com/mlchain/oss/blob/master/CHANGELOG.md).
