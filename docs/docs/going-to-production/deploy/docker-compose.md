---
id: docker-compose
title: Docker Compose
---

---

Docker is a set of platform-as-a-service products that use OS-level virtualization to deliver software in packages called containers.

:::note
For an optimized Docker experience, download [Docker Desktop](https://www.docker.com/products/docker-desktop).
:::

## Latest tags

The latest tags are updated every time a new release is created. Each release has a tag associated with it.

:::tip
Use the fix tag for production.
:::

## Using Remote Duckling & Language Server

This command will run Mlchain within a single container and use the remote Duckling and Language Server hosted by us. You can get the latest `stable` or `nightly` versions on [DockerHub](https://hub.docker.com/r/mlchain/server/tags).

```bash
docker run -d \
--name mlchain \
-p 3000:3000 \
-v mlchain_data:/mlchain/data \
mlchain/server:$TAG
```

For instance, you can run an installation as follows:

```bash
User@DESKTOP-T1ORLFU MINGW64 /c/Mlchain/DockerTests
$ docker run -d \
> --name myMlchain \
> -p 3000:3000 \
> mlchain/server:v12_18_2
Unable to find image 'mlchain/server:v12_18_2' locally
v12_18_2: Pulling from mlchain/server
32802c0cfa4d: Pulling fs layer
da1315cffa03: Pulling fs layer
fa83472a3562: Pulling fs layer
f85999a86bef: Pulling fs layer
26b3263a34bb: Pulling fs layer
7e33a4644769: Pulling fs layer
f85999a86bef: Waiting
26b3263a34bb: Waiting
7e33a4644769: Waiting
da1315cffa03: Download complete
fa83472a3562: Verifying Checksum
fa83472a3562: Download complete
f85999a86bef: Download complete
32802c0cfa4d: Download complete
32802c0cfa4d: Pull complete
da1315cffa03: Pull complete
fa83472a3562: Pull complete
f85999a86bef: Pull complete
26b3263a34bb: Verifying Checksum
26b3263a34bb: Download complete
26b3263a34bb: Pull complete
7e33a4644769: Verifying Checksum
7e33a4644769: Download complete
7e33a4644769: Pull complete
Digest: sha256:798b0fe332c5bb1b707eb62b30c8ed0a4e0609b3c712ee7201c5a7da7be50b7f
Status: Downloaded newer image for mlchain/server:v12_18_2
bf038c6f84aaeec11773b93a9748bc6732d573a1c115523f1a3d28d20dc06cbe
```

You will be able to access your instance of Mlchain on the specified mapped port `-p 3000:3000` by visiting http://localhost:3000/, and your container name will be myMlchain as set at `--name myMlchain`. Your Docker Desktop will reflect the new container as below:

![Mlchain Container on Docker](/assets/docker-new-instance.png)

Hosting Duckling and the Language Server is optional. Your Mlchain installation will use our hosted services by default.

Choose to either run one of two containers (running two containers is recommended).

### Single Container With All Services

:::danger
**Never** run multiple processes inside a single container in production.
:::

This method will run Duckling, the Language Server, and Mlchain Server within the same container. It will set some environment variables so that services talk to each other.

```bash
docker run -d \
--name bp \
-p 3000:3000 -p 3100:3100 \
-v mlchain_data:/mlchain/data \
-e BP_MODULE_NLU_DUCKLINGURL=http://localhost:8000 \
-e BP_MODULE_NLU_LANGUAGESOURCES='[{ "endpoint": "http://localhost:3100" }]' \
mlchain/server:$TAG \
bash -c "./duckling & ./bp lang --langDir /mlchain/data/embeddings & ./bp"
```

**Offline Server**: Follow the Offline Server [instructions](#offline-servers) if you're running a server without Internet access.

### Running Multiple Containers

1. Run the Language Server.

```bash
docker run -d \
--name lang \
-p 3100:3100 \
-v mlchain_data:/mlchain/data \
mlchain/server:$TAG \
bash -c "./bp lang --langDir /mlchain/data/embeddings"
```

2. Run Mlchain Server and Duckling within the same container. Duckling's usage is very light here, so we can justify using it in the same container as Mlchain Server.

```bash
docker run -d \
--name bp \
-p 3000:3000 \
-v mlchain_data:/mlchain/data \
-e BP_MODULE_NLU_LANGUAGESOURCES='[{ "endpoint": "http://localhost:3100" }]' \
mlchain/server:$TAG \
bash -c "./duckling & ./bp"
```

**Offline Server**: Follow the Offline Server [instructions](#offline-servers) if you're running a server without Internet access.

### Use docker-compose

Mlchain can be used with other service. For example, a postgresql could be use instead of the default database.

```
version: '3'

services:
  mlchain:
    image: mlchain/server
    command: /mlchain/bp
    expose:
      - 3000
    environment:
      - DATABASE_URL=postgres://postgres:secretpw@postgres:5435/mlchain_db
      - REDIS_URL=redis://redis:6379?password=redisPassword
      - BP_MODULE_NLU_DUCKLINGURL=http://mlchain_duckling:8000
      - BP_MODULE_NLU_LANGUAGESOURCES=[{"endpoint":"http://mlchain_lang:3100"}]
      - CLUSTER_ENABLED=true
      - BP_PRODUCTION=true
      - BPFS_STORAGE=database
    depends_on:
      - mlchain_lang
      - postgres
      - redis
    volumes:
      - mlchaindata:/mlchain/data
    ports:
      - "3000:3000"

  mlchain_lang:
    image: mlchain-lang
    command: bash -c "./duckling -p 8000 & ./bp lang --langDir /mlchain/lang --port 3100"
    expose:
      - 3100
      - 8000
    volumes:
      - mlchaindata:/mlchain/lang

  postgres:
    image: postgres:11.2-alpine
    expose:
      - 5435
    environment:
      PGPORT: 5435
      POSTGRES_DB: mlchain_db
      POSTGRES_PASSWORD: secretpw
      POSTGRES_USER: postgres
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:5.0.5-alpine
    expose:
      - 6379
    command: redis-server --requirepass redisPassword
    volumes:
      - redisdata:/data

volumes:
  pgdata:
  redisdata:
  mlchaindata:

```

### Restarting Mlchain

You can restart the server from Mlchain UI. To achieve this, edit the `mlchain.config.json` file from within the Code Editor module (located in the left sidebar). Mlchain listens for changes to this config file.

![Restarting Mlchain on Docker](/assets/docker-restart.png)

After you have edited the `mlchain.config.json` file, save it. You will now see an orange cog at the bottom right corner of the screen:

![Orange Restart Icon](/assets/restart-cog.png)
